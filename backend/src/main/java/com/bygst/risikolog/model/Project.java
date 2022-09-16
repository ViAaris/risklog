package com.bygst.risikolog.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static javax.persistence.CascadeType.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "Project")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title", unique = true)
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "budget")
    private long budget;

    @Column(name="finishing_date")
    @Temporal(TemporalType.DATE)
    private Date finishingDate;

    @Column(name="starting_date")
    @Temporal(TemporalType.DATE)
    private Date startingDate;

    @ElementCollection(fetch = FetchType.LAZY)
    @Column(name = "contractors")
    private List<String> contractors;

    @ElementCollection(fetch = FetchType.LAZY)
    @Column(name = "advisers")
    private List<String> advisers;

    @ManyToMany(cascade = {PERSIST, REMOVE})
    @ToString.Exclude
    @JoinTable(name="team",
            joinColumns = @JoinColumn(name="project_id"),
            inverseJoinColumns = @JoinColumn(name="users_id"))
    private List<User> team;

    @OneToMany(fetch = FetchType.LAZY, cascade = ALL, orphanRemoval = true)
    private List<Risk> risks;


    public Project(String title, String address, long budget) {
        this.title = title;
        this.address = address;
        this.budget = budget;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Project)) return false;
        Project project = (Project) o;
        return id == project.id && budget == project.budget && Objects.equals(title, project.title) && Objects.equals(address, project.address) && Objects.equals(finishingDate, project.finishingDate) && Objects.equals(startingDate, project.startingDate) && Objects.equals(contractors, project.contractors) && Objects.equals(advisers, project.advisers) && Objects.equals(team, project.team) && Objects.equals(risks, project.risks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, address, budget, finishingDate, startingDate, contractors, advisers, team, risks);
    }
}
