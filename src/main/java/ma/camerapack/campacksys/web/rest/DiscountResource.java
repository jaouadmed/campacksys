package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.domain.Discount;
import ma.camerapack.campacksys.repository.DiscountRepository;
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
 * REST controller for managing {@link ma.camerapack.campacksys.domain.Discount}.
 */
@RestController
@RequestMapping("/api")
public class DiscountResource {

    private final Logger log = LoggerFactory.getLogger(DiscountResource.class);

    private static final String ENTITY_NAME = "discount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiscountRepository discountRepository;

    public DiscountResource(DiscountRepository discountRepository) {
        this.discountRepository = discountRepository;
    }

    /**
     * {@code POST  /discounts} : Create a new discount.
     *
     * @param discount the discount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new discount, or with status {@code 400 (Bad Request)} if the discount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/discounts")
    public ResponseEntity<Discount> createDiscount(@Valid @RequestBody Discount discount) throws URISyntaxException {
        log.debug("REST request to save Discount : {}", discount);
        if (discount.getId() != null) {
            throw new BadRequestAlertException("A new discount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Discount result = discountRepository.save(discount);
        return ResponseEntity.created(new URI("/api/discounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /discounts} : Updates an existing discount.
     *
     * @param discount the discount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated discount,
     * or with status {@code 400 (Bad Request)} if the discount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the discount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/discounts")
    public ResponseEntity<Discount> updateDiscount(@Valid @RequestBody Discount discount) throws URISyntaxException {
        log.debug("REST request to update Discount : {}", discount);
        if (discount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Discount result = discountRepository.save(discount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, discount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /discounts} : get all the discounts.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of discounts in body.
     */
    @GetMapping("/discounts")
    public ResponseEntity<List<Discount>> getAllDiscounts(Pageable pageable) {
        log.debug("REST request to get a page of Discounts");
        Page<Discount> page = discountRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /discounts/:id} : get the "id" discount.
     *
     * @param id the id of the discount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the discount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/discounts/{id}")
    public ResponseEntity<Discount> getDiscount(@PathVariable Long id) {
        log.debug("REST request to get Discount : {}", id);
        Optional<Discount> discount = discountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(discount);
    }

    /**
     * {@code DELETE  /discounts/:id} : delete the "id" discount.
     *
     * @param id the id of the discount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/discounts/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        log.debug("REST request to delete Discount : {}", id);
        discountRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
