package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.domain.OrderStock;
import ma.camerapack.campacksys.repository.OrderStockRepository;
import ma.camerapack.campacksys.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ma.camerapack.campacksys.domain.OrderStock}.
 */
@RestController
@RequestMapping("/api")
public class OrderStockResource {

    private final Logger log = LoggerFactory.getLogger(OrderStockResource.class);

    private static final String ENTITY_NAME = "orderStock";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderStockRepository orderStockRepository;

    public OrderStockResource(OrderStockRepository orderStockRepository) {
        this.orderStockRepository = orderStockRepository;
    }

    /**
     * {@code POST  /order-stocks} : Create a new orderStock.
     *
     * @param orderStock the orderStock to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderStock, or with status {@code 400 (Bad Request)} if the orderStock has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-stocks")
    public ResponseEntity<OrderStock> createOrderStock(@Valid @RequestBody OrderStock orderStock) throws URISyntaxException {
        log.debug("REST request to save OrderStock : {}", orderStock);
        if (orderStock.getId() != null) {
            throw new BadRequestAlertException("A new orderStock cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderStock result = orderStockRepository.save(orderStock);
        return ResponseEntity.created(new URI("/api/order-stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-stocks} : Updates an existing orderStock.
     *
     * @param orderStock the orderStock to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderStock,
     * or with status {@code 400 (Bad Request)} if the orderStock is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderStock couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-stocks")
    public ResponseEntity<OrderStock> updateOrderStock(@Valid @RequestBody OrderStock orderStock) throws URISyntaxException {
        log.debug("REST request to update OrderStock : {}", orderStock);
        if (orderStock.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderStock result = orderStockRepository.save(orderStock);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderStock.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-stocks} : get all the orderStocks.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderStocks in body.
     */
    @GetMapping("/order-stocks")
    public ResponseEntity<List<OrderStock>> getAllOrderStocks(Pageable pageable) {
        log.debug("REST request to get a page of OrderStocks");
        Page<OrderStock> page = orderStockRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /order-stocks/:id} : get the "id" orderStock.
     *
     * @param id the id of the orderStock to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderStock, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-stocks/{id}")
    public ResponseEntity<OrderStock> getOrderStock(@PathVariable Long id) {
        log.debug("REST request to get OrderStock : {}", id);
        Optional<OrderStock> orderStock = orderStockRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderStock);
    }

    /**
     * {@code DELETE  /order-stocks/:id} : delete the "id" orderStock.
     *
     * @param id the id of the orderStock to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-stocks/{id}")
    public ResponseEntity<Void> deleteOrderStock(@PathVariable Long id) {
        log.debug("REST request to delete OrderStock : {}", id);
        orderStockRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
