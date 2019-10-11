package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.CampacksysApp;
import ma.camerapack.campacksys.domain.Mission;
import ma.camerapack.campacksys.domain.Team;
import ma.camerapack.campacksys.repository.MissionRepository;
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

import ma.camerapack.campacksys.domain.enumeration.MissionState;
/**
 * Integration tests for the {@link MissionResource} REST controller.
 */
@SpringBootTest(classes = CampacksysApp.class)
public class MissionResourceIT {

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_CREATION_DATE = LocalDate.ofEpochDay(-1L);

    private static final Integer DEFAULT_NBR_DAYS = 1;
    private static final Integer UPDATED_NBR_DAYS = 2;
    private static final Integer SMALLER_NBR_DAYS = 1 - 1;

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_START_DATE = LocalDate.ofEpochDay(-1L);

    private static final MissionState DEFAULT_STATE = MissionState.CREATED;
    private static final MissionState UPDATED_STATE = MissionState.STARTED;

    @Autowired
    private MissionRepository missionRepository;

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

    private MockMvc restMissionMockMvc;

    private Mission mission;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MissionResource missionResource = new MissionResource(missionRepository);
        this.restMissionMockMvc = MockMvcBuilders.standaloneSetup(missionResource)
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
    public static Mission createEntity(EntityManager em) {
        Mission mission = new Mission()
            .creationDate(DEFAULT_CREATION_DATE)
            .nbrDays(DEFAULT_NBR_DAYS)
            .startDate(DEFAULT_START_DATE)
            .state(DEFAULT_STATE);
        // Add required entity
        Team team;
        if (TestUtil.findAll(em, Team.class).isEmpty()) {
            team = TeamResourceIT.createEntity(em);
            em.persist(team);
            em.flush();
        } else {
            team = TestUtil.findAll(em, Team.class).get(0);
        }
        mission.setTeam(team);
        return mission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mission createUpdatedEntity(EntityManager em) {
        Mission mission = new Mission()
            .creationDate(UPDATED_CREATION_DATE)
            .nbrDays(UPDATED_NBR_DAYS)
            .startDate(UPDATED_START_DATE)
            .state(UPDATED_STATE);
        // Add required entity
        Team team;
        if (TestUtil.findAll(em, Team.class).isEmpty()) {
            team = TeamResourceIT.createUpdatedEntity(em);
            em.persist(team);
            em.flush();
        } else {
            team = TestUtil.findAll(em, Team.class).get(0);
        }
        mission.setTeam(team);
        return mission;
    }

    @BeforeEach
    public void initTest() {
        mission = createEntity(em);
    }

    @Test
    @Transactional
    public void createMission() throws Exception {
        int databaseSizeBeforeCreate = missionRepository.findAll().size();

        // Create the Mission
        restMissionMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mission)))
            .andExpect(status().isCreated());

        // Validate the Mission in the database
        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeCreate + 1);
        Mission testMission = missionList.get(missionList.size() - 1);
        assertThat(testMission.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testMission.getNbrDays()).isEqualTo(DEFAULT_NBR_DAYS);
        assertThat(testMission.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testMission.getState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createMissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = missionRepository.findAll().size();

        // Create the Mission with an existing ID
        mission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMissionMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mission)))
            .andExpect(status().isBadRequest());

        // Validate the Mission in the database
        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCreationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = missionRepository.findAll().size();
        // set the field null
        mission.setCreationDate(null);

        // Create the Mission, which fails.

        restMissionMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mission)))
            .andExpect(status().isBadRequest());

        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbrDaysIsRequired() throws Exception {
        int databaseSizeBeforeTest = missionRepository.findAll().size();
        // set the field null
        mission.setNbrDays(null);

        // Create the Mission, which fails.

        restMissionMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mission)))
            .andExpect(status().isBadRequest());

        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = missionRepository.findAll().size();
        // set the field null
        mission.setState(null);

        // Create the Mission, which fails.

        restMissionMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mission)))
            .andExpect(status().isBadRequest());

        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMissions() throws Exception {
        // Initialize the database
        missionRepository.saveAndFlush(mission);

        // Get all the missionList
        restMissionMockMvc.perform(get("/api/missions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mission.getId().intValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].nbrDays").value(hasItem(DEFAULT_NBR_DAYS)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())));
    }
    
    @Test
    @Transactional
    public void getMission() throws Exception {
        // Initialize the database
        missionRepository.saveAndFlush(mission);

        // Get the mission
        restMissionMockMvc.perform(get("/api/missions/{id}", mission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mission.getId().intValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.nbrDays").value(DEFAULT_NBR_DAYS))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMission() throws Exception {
        // Get the mission
        restMissionMockMvc.perform(get("/api/missions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMission() throws Exception {
        // Initialize the database
        missionRepository.saveAndFlush(mission);

        int databaseSizeBeforeUpdate = missionRepository.findAll().size();

        // Update the mission
        Mission updatedMission = missionRepository.findById(mission.getId()).get();
        // Disconnect from session so that the updates on updatedMission are not directly saved in db
        em.detach(updatedMission);
        updatedMission
            .creationDate(UPDATED_CREATION_DATE)
            .nbrDays(UPDATED_NBR_DAYS)
            .startDate(UPDATED_START_DATE)
            .state(UPDATED_STATE);

        restMissionMockMvc.perform(put("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMission)))
            .andExpect(status().isOk());

        // Validate the Mission in the database
        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeUpdate);
        Mission testMission = missionList.get(missionList.size() - 1);
        assertThat(testMission.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testMission.getNbrDays()).isEqualTo(UPDATED_NBR_DAYS);
        assertThat(testMission.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testMission.getState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingMission() throws Exception {
        int databaseSizeBeforeUpdate = missionRepository.findAll().size();

        // Create the Mission

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMissionMockMvc.perform(put("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mission)))
            .andExpect(status().isBadRequest());

        // Validate the Mission in the database
        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMission() throws Exception {
        // Initialize the database
        missionRepository.saveAndFlush(mission);

        int databaseSizeBeforeDelete = missionRepository.findAll().size();

        // Delete the mission
        restMissionMockMvc.perform(delete("/api/missions/{id}", mission.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mission> missionList = missionRepository.findAll();
        assertThat(missionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mission.class);
        Mission mission1 = new Mission();
        mission1.setId(1L);
        Mission mission2 = new Mission();
        mission2.setId(mission1.getId());
        assertThat(mission1).isEqualTo(mission2);
        mission2.setId(2L);
        assertThat(mission1).isNotEqualTo(mission2);
        mission1.setId(null);
        assertThat(mission1).isNotEqualTo(mission2);
    }
}
