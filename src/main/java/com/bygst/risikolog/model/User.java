package com.bygst.risikolog.model;


import com.bygst.risikolog.util.Unique;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

import static javax.persistence.CascadeType.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name="username", unique = true)
    private String username;
    @Column(name = "password")
    private String password;

    @Column(name="first_name")
    private String firstName;
    @Column(name = "surname")
    private String surname;
    @Column(name = "department")
    private String department;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Role> roles;

    @ManyToMany(cascade = {MERGE, PERSIST})
    @JoinTable(name="team",
            joinColumns = @JoinColumn(name="users_id"),
            inverseJoinColumns = @JoinColumn(name="project_id"))
    private List<Project> projects;

    public User(String username, String password, String firstName, String surname, String department, List<Project> projects) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.surname = surname;
        this.department = department;
        this.projects = projects;
    }


    public User(String username, String password, String firstName, String surname, String department) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.surname = surname;
        this.department = department;
    }

    public List<Project> getProjects() {
        return projects;
    }

}
