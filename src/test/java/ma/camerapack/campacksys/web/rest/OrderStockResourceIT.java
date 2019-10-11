package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.CampacksysApp;
import ma.camerapack.campacksys.domain.OrderStock;
import ma.camerapack.campacksys.repository.OrderStockRepository;
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

import ma.camerapack.campacksys.domain.enumeration.OrderStockState;
/**
 * Integration tests for the {@link OrderStockResource} REST controller.
 */
@SpringBootTest(classes = CampacksysApp.class)
public class OrderStockResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE = LocalDate.ofEpochDay(-1L);

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;
    private static final Long SMALLER_QUANTITY = 1L - 1L;

    private static final OrderStockState DEFAULT_STATE = OrderStockState.CREATED;
    private static final OrderStockState UPDATED_STATE = OrderStockState.AWAITING;

    @Autowired
    private OrderStockRepository orderStockRepository;

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

    private MockMvc restOrderStockMockMvc;

    private OrderStock orderStock;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderStockResource orderStockResource = new OrderStockResource(orderStockRepository);
        this.restOrderStockMockMvc = MockMvcBuilders.standaloneSetup(orderStockResource)
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
    public static OrderStock createEntity(EntityManager em) {
        OrderStock orderStock = new OrderStock()
            .date(DEFAULT_DATE)
            .quantity(DEFAULT_QUANTITY)
            .state(DEFAULT_STATE);
        return orderStock;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderStock createUpdatedEntity(EntityManager em) {
        OrderStock orderStock = new OrderStock()
            .date(UPDATED_DATE)
            .quantity(UPDATED_QUANTITY)
            .state(UPDATED_STATE);
        return orderStock;
    }

    @BeforeEach
    public void initTest() {
        orderStock = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderStock() throws Exception {
        int databaseSizeBeforeCreate = orderStockRepository.findAll().size();

        // Create the OrderStock
        restOrderStockMockMvc.perform(post("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderStock)))
            .andExpect(status().isCreated());

        // Validate the OrderStock in the database
        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeCreate + 1);
        OrderStock testOrderStock = orderStockList.get(orderStockList.size() - 1);
        assertThat(testOrderStock.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testOrderStock.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testOrderStock.getState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createOrderStockWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderStockRepository.findAll().size();

        // Create the OrderStock with an existing ID
        orderStock.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderStockMockMvc.perform(post("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderStock)))
            .andExpect(status().isBadRequest());

        // Validate the OrderStock in the database
        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderStockRepository.findAll().size();
        // set the field null
        orderStock.setDate(null);

        // Create the OrderStock, which fails.

        restOrderStockMockMvc.perform(post("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderStock)))
            .andExpect(status().isBadRequest());

        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderStockRepository.findAll().size();
        // set the field null
        orderStock.setQuantity(null);

        // Create the OrderStock, which fails.

        restOrderStockMockMvc.perform(post("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderStock)))
            .andExpect(status().isBadRequest());

        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderStockRepository.findAll().size();
        // set the field null
        orderStock.setState(null);

        // Create the OrderStock, which fails.

        restOrderStockMockMvc.perform(post("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderStock)))
            .andExpect(status().isBadRequest());

        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrderStocks() throws Exception {
        // Initialize the database
        orderStockRepository.saveAndFlush(orderStock);

        // Get all the orderStockList
        restOrderStockMockMvc.perform(get("/api/order-stocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderStock.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())));
    }
    
    @Test
    @Transactional
    public void getOrderStock() throws Exception {
        // Initialize the database
        orderStockRepository.saveAndFlush(orderStock);

        // Get the orderStock
        restOrderStockMockMvc.perform(get("/api/order-stocks/{id}", orderStock.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderStock.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderStock() throws Exception {
        // Get the orderStock
        restOrderStockMockMvc.perform(get("/api/order-stocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderStock() throws Exception {
        // Initialize the database
        orderStockRepository.saveAndFlush(orderStock);

        int databaseSizeBeforeUpdate = orderStockRepository.findAll().size();

        // Update the orderStock
        OrderStock updatedOrderStock = orderStockRepository.findById(orderStock.getId()).get();
        // Disconnect from session so that the updates on updatedOrderStock are not directly saved in db
        em.detach(updatedOrderStock);
        updatedOrderStock
            .date(UPDATED_DATE)
            .quantity(UPDATED_QUANTITY)
            .state(UPDATED_STATE);

        restOrderStockMockMvc.perform(put("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderStock)))
            .andExpect(status().isOk());

        // Validate the OrderStock in the database
        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeUpdate);
        OrderStock testOrderStock = orderStockList.get(orderStockList.size() - 1);
        assertThat(testOrderStock.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testOrderStock.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testOrderStock.getState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderStock() throws Exception {
        int databaseSizeBeforeUpdate = orderStockRepository.findAll().size();

        // Create the OrderStock

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderStockMockMvc.perform(put("/api/order-stocks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderStock)))
            .andExpect(status().isBadRequest());

        // Validate the OrderStock in the database
        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderStock() throws Exception {
        // Initialize the database
        orderStockRepository.saveAndFlush(orderStock);

        int databaseSizeBeforeDelete = orderStockRepository.findAll().size();

        // Delete the orderStock
        restOrderStockMockMvc.perform(delete("/api/order-stocks/{id}", orderStock.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrderStock> orderStockList = orderStockRepository.findAll();
        assertThat(orderStockList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderStock.class);
        OrderStock orderStock1 = new OrderStock();
        orderStock1.setId(1L);
        OrderStock orderStock2 = new OrderStock();
        orderStock2.setId(orderStock1.getId());
        assertThat(orderStock1).isEqualTo(orderStock2);
        orderStock2.setId(2L);
        assertThat(orderStock1).isNotEqualTo(orderStock2);
        orderStock1.setId(null);
        assertThat(orderStock1).isNotEqualTo(orderStock2);
    }
}
