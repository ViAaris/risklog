package com.bygst.risikolog.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
@Table(name = "Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
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

    @ElementCollection
    @Column(name = "contractors")
    private List<String> contractors;

    @ElementCollection
    @Column(name = "advisers")
    private List<String> advisers;

    @ManyToMany
    @JoinTable(name="team",
            joinColumns = @JoinColumn(name="users_id"),
            inverseJoinColumns = @JoinColumn(name="project_id"))
    private List<User> team;

    @OneToMany
    private List<Risk> risks;

}
