package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.CampacksysApp;
import ma.camerapack.campacksys.domain.Duration;
import ma.camerapack.campacksys.repository.DurationRepository;
import ma.camerapack.campacksys.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static ma.camerapack.campacksys.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DurationResource} REST controller.
 */
@SpringBootTest(classes = CampacksysApp.class)
public class DurationResourceIT {

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE_FROM = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE_TO = LocalDate.ofEpochDay(-1L);

    @Autowired
    private DurationRepository durationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDurationMockMvc;

    private Duration duration;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DurationResource durationResource = new DurationResource(durationRepository);
        this.restDurationMockMvc = MockMvcBuilders.standaloneSetup(durationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Duration createEntity(EntityManager em) {
        Duration duration = new Duration()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO);
        return duration;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Duration createUpdatedEntity(EntityManager em) {
        Duration duration = new Duration()
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO);
        return duration;
    }

    @BeforeEach
    public void initTest() {
        duration = createEntity(em);
    }

    @Test
    @Transactional
    public void createDuration() throws Exception {
        int databaseSizeBeforeCreate = durationRepository.findAll().size();

        // Create the Duration
        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isCreated());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeCreate + 1);
        Duration testDuration = durationList.get(durationList.size() - 1);
        assertThat(testDuration.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testDuration.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
    }

    @Test
    @Transactional
    public void createDurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = durationRepository.findAll().size();

        // Create the Duration with an existing ID
        duration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isBadRequest());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = durationRepository.findAll().size();
        // set the field null
        duration.setDateFrom(null);

        // Create the Duration, which fails.

        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isBadRequest());

        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateToIsRequired() throws Exception {
        int databaseSizeBeforeTest = durationRepository.findAll().size();
        // set the field null
        duration.setDateTo(null);

        // Create the Duration, which fails.

        restDurationMockMvc.perform(post("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isBadRequest());

        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDurations() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);

        // Get all the durationList
        restDurationMockMvc.perform(get("/api/durations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(duration.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())));
    }
    
    @Test
    @Transactional
    public void getDuration() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);

        // Get the duration
        restDurationMockMvc.perform(get("/api/durations/{id}", duration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(duration.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDuration() throws Exception {
        // Get the duration
        restDurationMockMvc.perform(get("/api/durations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDuration() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);

        int databaseSizeBeforeUpdate = durationRepository.findAll().size();

        // Update the duration
        Duration updatedDuration = durationRepository.findById(duration.getId()).get();
        // Disconnect from session so that the updates on updatedDuration are not directly saved in db
        em.detach(updatedDuration);
        updatedDuration
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO);

        restDurationMockMvc.perform(put("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDuration)))
            .andExpect(status().isOk());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeUpdate);
        Duration testDuration = durationList.get(durationList.size() - 1);
        assertThat(testDuration.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testDuration.getDateTo()).isEqualTo(UPDATED_DATE_TO);
    }

    @Test
    @Transactional
    public void updateNonExistingDuration() throws Exception {
        int databaseSizeBeforeUpdate = durationRepository.findAll().size();

        // Create the Duration

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDurationMockMvc.perform(put("/api/durations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(duration)))
            .andExpect(status().isBadRequest());

        // Validate the Duration in the database
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDuration() throws Exception {
        // Initialize the database
        durationRepository.saveAndFlush(duration);

        int databaseSizeBeforeDelete = durationRepository.findAll().size();

        // Delete the duration
        restDurationMockMvc.perform(delete("/api/durations/{id}", duration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Duration> durationList = durationRepository.findAll();
        assertThat(durationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Duration.class);
        Duration duration1 = new Duration();
        duration1.setId(1L);
        Duration duration2 = new Duration();
        duration2.setId(duration1.getId());
        assertThat(duration1).isEqualTo(duration2);
        duration2.setId(2L);
        assertThat(duration1).isNotEqualTo(duration2);
        duration1.setId(null);
        assertThat(duration1).isNotEqualTo(duration2);
    }
}
