package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.domain.ItemLine;
import ma.camerapack.campacksys.repository.ItemLineRepository;
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
 * REST controller for managing {@link ma.camerapack.campacksys.domain.ItemLine}.
 */
@RestController
@RequestMapping("/api")
public class ItemLineResource {

    private final Logger log = LoggerFactory.getLogger(ItemLineResource.class);

    private static final String ENTITY_NAME = "itemLine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemLineRepository itemLineRepository;

    public ItemLineResource(ItemLineRepository itemLineRepository) {
        this.itemLineRepository = itemLineRepository;
    }

    /**
     * {@code POST  /item-lines} : Create a new itemLine.
     *
     * @param itemLine the itemLine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemLine, or with status {@code 400 (Bad Request)} if the itemLine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-lines")
    public ResponseEntity<ItemLine> createItemLine(@Valid @RequestBody ItemLine itemLine) throws URISyntaxException {
        log.debug("REST request to save ItemLine : {}", itemLine);
        if (itemLine.getId() != null) {
            throw new BadRequestAlertException("A new itemLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemLine result = itemLineRepository.save(itemLine);
        return ResponseEntity.created(new URI("/api/item-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-lines} : Updates an existing itemLine.
     *
     * @param itemLine the itemLine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemLine,
     * or with status {@code 400 (Bad Request)} if the itemLine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemLine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-lines")
    public ResponseEntity<ItemLine> updateItemLine(@Valid @RequestBody ItemLine itemLine) throws URISyntaxException {
        log.debug("REST request to update ItemLine : {}", itemLine);
        if (itemLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemLine result = itemLineRepository.save(itemLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemLine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-lines} : get all the itemLines.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemLines in body.
     */
    @GetMapping("/item-lines")
    public ResponseEntity<List<ItemLine>> getAllItemLines(Pageable pageable) {
        log.debug("REST request to get a page of ItemLines");
        Page<ItemLine> page = itemLineRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-lines/:id} : get the "id" itemLine.
     *
     * @param id the id of the itemLine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemLine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-lines/{id}")
    public ResponseEntity<ItemLine> getItemLine(@PathVariable Long id) {
        log.debug("REST request to get ItemLine : {}", id);
        Optional<ItemLine> itemLine = itemLineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemLine);
    }

    /**
     * {@code DELETE  /item-lines/:id} : delete the "id" itemLine.
     *
     * @param id the id of the itemLine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-lines/{id}")
    public ResponseEntity<Void> deleteItemLine(@PathVariable Long id) {
        log.debug("REST request to delete ItemLine : {}", id);
        itemLineRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
