package ma.camerapack.campacksys.repository;

import ma.camerapack.campacksys.domain.Duration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Duration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DurationRepository extends JpaRepository<Duration, Long> {

}
