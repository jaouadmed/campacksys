package ma.camerapack.campacksys.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import ma.camerapack.campacksys.domain.enumeration.DiscountNature;

/**
 * A Discount.
 */
@Entity
@Table(name = "discount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Discount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nature", nullable = false)
    private DiscountNature nature;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DiscountNature getNature() {
        return nature;
    }

    public Discount nature(DiscountNature nature) {
        this.nature = nature;
        return this;
    }

    public void setNature(DiscountNature nature) {
        this.nature = nature;
    }

    public Double getAmount() {
        return amount;
    }

    public Discount amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Discount)) {
            return false;
        }
        return id != null && id.equals(((Discount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Discount{" +
            "id=" + getId() +
            ", nature='" + getNature() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
