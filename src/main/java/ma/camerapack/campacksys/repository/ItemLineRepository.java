package ma.camerapack.campacksys.repository;

import ma.camerapack.campacksys.domain.ItemLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemLineRepository extends JpaRepository<ItemLine, Long> {

}
