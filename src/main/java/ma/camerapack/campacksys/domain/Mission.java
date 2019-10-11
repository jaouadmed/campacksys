package ma.camerapack.campacksys.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import ma.camerapack.campacksys.domain.enumeration.MissionState;

/**
 * A Mission.
 */
@Entity
@Table(name = "mission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @NotNull
    @Column(name = "nbr_days", nullable = false)
    private Integer nbrDays;

    @Column(name = "start_date")
    private LocalDate startDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private MissionState state;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("missions")
    private Team team;

    @ManyToOne
    @JsonIgnoreProperties("missions")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Mission creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getNbrDays() {
        return nbrDays;
    }

    public Mission nbrDays(Integer nbrDays) {
        this.nbrDays = nbrDays;
        return this;
    }

    public void setNbrDays(Integer nbrDays) {
        this.nbrDays = nbrDays;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Mission startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public MissionState getState() {
        return state;
    }

    public Mission state(MissionState state) {
        this.state = state;
        return this;
    }

    public void setState(MissionState state) {
        this.state = state;
    }

    public Team getTeam() {
        return team;
    }

    public Mission team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Client getClient() {
        return client;
    }

    public Mission client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mission)) {
            return false;
        }
        return id != null && id.equals(((Mission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Mission{" +
            "id=" + getId() +
            ", creationDate='" + getCreationDate() + "'" +
            ", nbrDays=" + getNbrDays() +
            ", startDate='" + getStartDate() + "'" +
            ", state='" + getState() + "'" +
            "}";
    }
}
