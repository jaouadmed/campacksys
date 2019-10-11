package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.CampacksysApp;
import ma.camerapack.campacksys.domain.ItemLine;
import ma.camerapack.campacksys.domain.Product;
import ma.camerapack.campacksys.repository.ItemLineRepository;
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
import java.util.List;

import static ma.camerapack.campacksys.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemLineResource} REST controller.
 */
@SpringBootTest(classes = CampacksysApp.class)
public class ItemLineResourceIT {

    private static final Long DEFAULT_QUANTITY = 0L;
    private static final Long UPDATED_QUANTITY = 1L;
    private static final Long SMALLER_QUANTITY = 0L - 1L;

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;
    private static final Double SMALLER_TOTAL = 1D - 1D;

    @Autowired
    private ItemLineRepository itemLineRepository;

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

    private MockMvc restItemLineMockMvc;

    private ItemLine itemLine;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemLineResource itemLineResource = new ItemLineResource(itemLineRepository);
        this.restItemLineMockMvc = MockMvcBuilders.standaloneSetup(itemLineResource)
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
    public static ItemLine createEntity(EntityManager em) {
        ItemLine itemLine = new ItemLine()
            .quantity(DEFAULT_QUANTITY)
            .total(DEFAULT_TOTAL);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        itemLine.setProduct(product);
        return itemLine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemLine createUpdatedEntity(EntityManager em) {
        ItemLine itemLine = new ItemLine()
            .quantity(UPDATED_QUANTITY)
            .total(UPDATED_TOTAL);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        itemLine.setProduct(product);
        return itemLine;
    }

    @BeforeEach
    public void initTest() {
        itemLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemLine() throws Exception {
        int databaseSizeBeforeCreate = itemLineRepository.findAll().size();

        // Create the ItemLine
        restItemLineMockMvc.perform(post("/api/item-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLine)))
            .andExpect(status().isCreated());

        // Validate the ItemLine in the database
        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeCreate + 1);
        ItemLine testItemLine = itemLineList.get(itemLineList.size() - 1);
        assertThat(testItemLine.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testItemLine.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createItemLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemLineRepository.findAll().size();

        // Create the ItemLine with an existing ID
        itemLine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemLineMockMvc.perform(post("/api/item-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLine)))
            .andExpect(status().isBadRequest());

        // Validate the ItemLine in the database
        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemLineRepository.findAll().size();
        // set the field null
        itemLine.setQuantity(null);

        // Create the ItemLine, which fails.

        restItemLineMockMvc.perform(post("/api/item-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLine)))
            .andExpect(status().isBadRequest());

        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemLineRepository.findAll().size();
        // set the field null
        itemLine.setTotal(null);

        // Create the ItemLine, which fails.

        restItemLineMockMvc.perform(post("/api/item-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLine)))
            .andExpect(status().isBadRequest());

        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemLines() throws Exception {
        // Initialize the database
        itemLineRepository.saveAndFlush(itemLine);

        // Get all the itemLineList
        restItemLineMockMvc.perform(get("/api/item-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getItemLine() throws Exception {
        // Initialize the database
        itemLineRepository.saveAndFlush(itemLine);

        // Get the itemLine
        restItemLineMockMvc.perform(get("/api/item-lines/{id}", itemLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemLine.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingItemLine() throws Exception {
        // Get the itemLine
        restItemLineMockMvc.perform(get("/api/item-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemLine() throws Exception {
        // Initialize the database
        itemLineRepository.saveAndFlush(itemLine);

        int databaseSizeBeforeUpdate = itemLineRepository.findAll().size();

        // Update the itemLine
        ItemLine updatedItemLine = itemLineRepository.findById(itemLine.getId()).get();
        // Disconnect from session so that the updates on updatedItemLine are not directly saved in db
        em.detach(updatedItemLine);
        updatedItemLine
            .quantity(UPDATED_QUANTITY)
            .total(UPDATED_TOTAL);

        restItemLineMockMvc.perform(put("/api/item-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemLine)))
            .andExpect(status().isOk());

        // Validate the ItemLine in the database
        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeUpdate);
        ItemLine testItemLine = itemLineList.get(itemLineList.size() - 1);
        assertThat(testItemLine.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testItemLine.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingItemLine() throws Exception {
        int databaseSizeBeforeUpdate = itemLineRepository.findAll().size();

        // Create the ItemLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemLineMockMvc.perform(put("/api/item-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLine)))
            .andExpect(status().isBadRequest());

        // Validate the ItemLine in the database
        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemLine() throws Exception {
        // Initialize the database
        itemLineRepository.saveAndFlush(itemLine);

        int databaseSizeBeforeDelete = itemLineRepository.findAll().size();

        // Delete the itemLine
        restItemLineMockMvc.perform(delete("/api/item-lines/{id}", itemLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemLine> itemLineList = itemLineRepository.findAll();
        assertThat(itemLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemLine.class);
        ItemLine itemLine1 = new ItemLine();
        itemLine1.setId(1L);
        ItemLine itemLine2 = new ItemLine();
        itemLine2.setId(itemLine1.getId());
        assertThat(itemLine1).isEqualTo(itemLine2);
        itemLine2.setId(2L);
        assertThat(itemLine1).isNotEqualTo(itemLine2);
        itemLine1.setId(null);
        assertThat(itemLine1).isNotEqualTo(itemLine2);
    }
}
