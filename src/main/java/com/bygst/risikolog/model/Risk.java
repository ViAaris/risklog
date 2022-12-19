package com.bygst.risikolog.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

import static javax.persistence.CascadeType.ALL;

@NoArgsConstructor
@Data
@Entity
@Table(name = "risk")
public class Risk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String title;
    private String description;
    private String reason;
    private String category;
    private String consequences;
    @Temporal(TemporalType.DATE)
    private Date changingDate;
    private Integer probability;
    private Integer minCost;
    private Integer midCost;
    private Integer maxCost;
    private Integer value;
    private String owner;
    private String actions;
    private Boolean isActive;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = ALL)
//    @JoinTable(name="project_risks",
//            joinColumns = @JoinColumn(name="risks_id"),
//            inverseJoinColumns = @JoinColumn(name="project_id"))
//    private Project project;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Risk risk = (Risk) o;
        return id == risk.id && Objects.equals(title, risk.title) && Objects.equals(description, risk.description) && Objects.equals(reason, risk.reason) && Objects.equals(category, risk.category) && Objects.equals(consequences, risk.consequences) && Objects.equals(changingDate, risk.changingDate) && Objects.equals(probability, risk.probability) && Objects.equals(minCost, risk.minCost) && Objects.equals(midCost, risk.midCost) && Objects.equals(maxCost, risk.maxCost) && Objects.equals(value, risk.value) && Objects.equals(owner, risk.owner) && Objects.equals(actions, risk.actions) && Objects.equals(isActive, risk.isActive);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, reason, category, consequences, changingDate, probability, minCost, midCost, maxCost, value, owner, actions, isActive);
    }
}
