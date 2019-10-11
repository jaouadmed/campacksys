package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.domain.Supplier;
import ma.camerapack.campacksys.repository.SupplierRepository;
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
 * REST controller for managing {@link ma.camerapack.campacksys.domain.Supplier}.
 */
@RestController
@RequestMapping("/api")
public class SupplierResource {

    private final Logger log = LoggerFactory.getLogger(SupplierResource.class);

    private static final String ENTITY_NAME = "supplier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupplierRepository supplierRepository;

    public SupplierResource(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    /**
     * {@code POST  /suppliers} : Create a new supplier.
     *
     * @param supplier the supplier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supplier, or with status {@code 400 (Bad Request)} if the supplier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suppliers")
    public ResponseEntity<Supplier> createSupplier(@Valid @RequestBody Supplier supplier) throws URISyntaxException {
        log.debug("REST request to save Supplier : {}", supplier);
        if (supplier.getId() != null) {
            throw new BadRequestAlertException("A new supplier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Supplier result = supplierRepository.save(supplier);
        return ResponseEntity.created(new URI("/api/suppliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suppliers} : Updates an existing supplier.
     *
     * @param supplier the supplier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supplier,
     * or with status {@code 400 (Bad Request)} if the supplier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supplier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suppliers")
    public ResponseEntity<Supplier> updateSupplier(@Valid @RequestBody Supplier supplier) throws URISyntaxException {
        log.debug("REST request to update Supplier : {}", supplier);
        if (supplier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Supplier result = supplierRepository.save(supplier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supplier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /suppliers} : get all the suppliers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suppliers in body.
     */
    @GetMapping("/suppliers")
    public ResponseEntity<List<Supplier>> getAllSuppliers(Pageable pageable) {
        log.debug("REST request to get a page of Suppliers");
        Page<Supplier> page = supplierRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /suppliers/:id} : get the "id" supplier.
     *
     * @param id the id of the supplier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supplier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplier(@PathVariable Long id) {
        log.debug("REST request to get Supplier : {}", id);
        Optional<Supplier> supplier = supplierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supplier);
    }

    /**
     * {@code DELETE  /suppliers/:id} : delete the "id" supplier.
     *
     * @param id the id of the supplier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Long id) {
        log.debug("REST request to delete Supplier : {}", id);
        supplierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
