package ma.camerapack.campacksys.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Stock.
 */
@Entity
@Table(name = "stock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Stock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0L)
    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @NotNull
    @Min(value = 0L)
    @Column(name = "alert_limit", nullable = false)
    private Long alertLimit;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    @OneToOne
    @JoinColumn(unique = true)
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Stock quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Long getAlertLimit() {
        return alertLimit;
    }

    public Stock alertLimit(Long alertLimit) {
        this.alertLimit = alertLimit;
        return this;
    }

    public void setAlertLimit(Long alertLimit) {
        this.alertLimit = alertLimit;
    }

    public Product getProduct() {
        return product;
    }

    public Stock product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Unit getUnit() {
        return unit;
    }

    public Stock unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stock)) {
            return false;
        }
        return id != null && id.equals(((Stock) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", alertLimit=" + getAlertLimit() +
            "}";
    }
}
