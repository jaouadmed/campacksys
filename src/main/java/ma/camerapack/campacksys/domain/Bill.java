package ma.camerapack.campacksys.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import ma.camerapack.campacksys.domain.enumeration.BillState;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "due_amount", nullable = false)
    private Double dueAmount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private BillState state;

    @ManyToOne
    @JsonIgnoreProperties("bills")
    private Payment payment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Bill dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Double getDueAmount() {
        return dueAmount;
    }

    public Bill dueAmount(Double dueAmount) {
        this.dueAmount = dueAmount;
        return this;
    }

    public void setDueAmount(Double dueAmount) {
        this.dueAmount = dueAmount;
    }

    public BillState getState() {
        return state;
    }

    public Bill state(BillState state) {
        this.state = state;
        return this;
    }

    public void setState(BillState state) {
        this.state = state;
    }

    public Payment getPayment() {
        return payment;
    }

    public Bill payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bill)) {
            return false;
        }
        return id != null && id.equals(((Bill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", dueDate='" + getDueDate() + "'" +
            ", dueAmount=" + getDueAmount() +
            ", state='" + getState() + "'" +
            "}";
    }
}
