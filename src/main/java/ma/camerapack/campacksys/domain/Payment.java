package ma.camerapack.campacksys.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import ma.camerapack.campacksys.domain.enumeration.PaymentType;

import ma.camerapack.campacksys.domain.enumeration.PaymentState;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private PaymentType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private PaymentState state;

    @NotNull
    @Column(name = "total", nullable = false)
    private Double total;

    @NotNull
    @Column(name = "rest", nullable = false)
    private Double rest;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaymentType getType() {
        return type;
    }

    public Payment type(PaymentType type) {
        this.type = type;
        return this;
    }

    public void setType(PaymentType type) {
        this.type = type;
    }

    public PaymentState getState() {
        return state;
    }

    public Payment state(PaymentState state) {
        this.state = state;
        return this;
    }

    public void setState(PaymentState state) {
        this.state = state;
    }

    public Double getTotal() {
        return total;
    }

    public Payment total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getRest() {
        return rest;
    }

    public Payment rest(Double rest) {
        this.rest = rest;
        return this;
    }

    public void setRest(Double rest) {
        this.rest = rest;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Payment)) {
            return false;
        }
        return id != null && id.equals(((Payment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Payment{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", state='" + getState() + "'" +
            ", total=" + getTotal() +
            ", rest=" + getRest() +
            "}";
    }
}
