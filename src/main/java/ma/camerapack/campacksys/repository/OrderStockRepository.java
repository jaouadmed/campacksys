package ma.camerapack.campacksys.repository;

import ma.camerapack.campacksys.domain.OrderStock;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrderStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderStockRepository extends JpaRepository<OrderStock, Long> {

}
