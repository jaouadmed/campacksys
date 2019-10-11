package ma.camerapack.campacksys.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import ma.camerapack.campacksys.domain.enumeration.OrderStockState;

/**
 * A OrderStock.
 */
@Entity
@Table(name = "order_stock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderStock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Min(value = 1L)
    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private OrderStockState state;

    @OneToOne
    @JoinColumn(unique = true)
    private Alert alert;

    @ManyToOne
    @JsonIgnoreProperties("orderStocks")
    private Supplier supplier;

    @ManyToOne
    @JsonIgnoreProperties("orderStocks")
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public OrderStock date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getQuantity() {
        return quantity;
    }

    public OrderStock quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public OrderStockState getState() {
        return state;
    }

    public OrderStock state(OrderStockState state) {
        this.state = state;
        return this;
    }

    public void setState(OrderStockState state) {
        this.state = state;
    }

    public Alert getAlert() {
        return alert;
    }

    public OrderStock alert(Alert alert) {
        this.alert = alert;
        return this;
    }

    public void setAlert(Alert alert) {
        this.alert = alert;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public OrderStock supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Employee getEmployee() {
        return employee;
    }

    public OrderStock employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderStock)) {
            return false;
        }
        return id != null && id.equals(((OrderStock) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrderStock{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", quantity=" + getQuantity() +
            ", state='" + getState() + "'" +
            "}";
    }
}
