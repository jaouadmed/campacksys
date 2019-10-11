package ma.camerapack.campacksys.web.rest;

import ma.camerapack.campacksys.domain.Duration;
import ma.camerapack.campacksys.repository.DurationRepository;
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
 * REST controller for managing {@link ma.camerapack.campacksys.domain.Duration}.
 */
@RestController
@RequestMapping("/api")
public class DurationResource {

    private final Logger log = LoggerFactory.getLogger(DurationResource.class);

    private static final String ENTITY_NAME = "duration";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DurationRepository durationRepository;

    public DurationResource(DurationRepository durationRepository) {
        this.durationRepository = durationRepository;
    }

    /**
     * {@code POST  /durations} : Create a new duration.
     *
     * @param duration the duration to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new duration, or with status {@code 400 (Bad Request)} if the duration has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/durations")
    public ResponseEntity<Duration> createDuration(@Valid @RequestBody Duration duration) throws URISyntaxException {
        log.debug("REST request to save Duration : {}", duration);
        if (duration.getId() != null) {
            throw new BadRequestAlertException("A new duration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Duration result = durationRepository.save(duration);
        return ResponseEntity.created(new URI("/api/durations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /durations} : Updates an existing duration.
     *
     * @param duration the duration to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated duration,
     * or with status {@code 400 (Bad Request)} if the duration is not valid,
     * or with status {@code 500 (Internal Server Error)} if the duration couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/durations")
    public ResponseEntity<Duration> updateDuration(@Valid @RequestBody Duration duration) throws URISyntaxException {
        log.debug("REST request to update Duration : {}", duration);
        if (duration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Duration result = durationRepository.save(duration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, duration.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /durations} : get all the durations.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of durations in body.
     */
    @GetMapping("/durations")
    public ResponseEntity<List<Duration>> getAllDurations(Pageable pageable) {
        log.debug("REST request to get a page of Durations");
        Page<Duration> page = durationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /durations/:id} : get the "id" duration.
     *
     * @param id the id of the duration to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the duration, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/durations/{id}")
    public ResponseEntity<Duration> getDuration(@PathVariable Long id) {
        log.debug("REST request to get Duration : {}", id);
        Optional<Duration> duration = durationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(duration);
    }

    /**
     * {@code DELETE  /durations/:id} : delete the "id" duration.
     *
     * @param id the id of the duration to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/durations/{id}")
    public ResponseEntity<Void> deleteDuration(@PathVariable Long id) {
        log.debug("REST request to delete Duration : {}", id);
        durationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
