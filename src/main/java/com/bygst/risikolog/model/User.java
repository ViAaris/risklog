package com.bygst.risikolog.model;


import com.bygst.risikolog.util.Unique;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.CascadeType.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
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
    @ToString.Exclude
    private List<Role> roles;

    @ManyToMany(mappedBy = "team", cascade = PERSIST)
    @ToString.Exclude
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(firstName, user.firstName) && Objects.equals(surname, user.surname) && Objects.equals(department, user.department) && Objects.equals(roles, user.roles) && Objects.equals(projects, user.projects);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, firstName, surname, department, roles, projects);
    }
}
