package com.bygst.risikolog.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name="username")
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

    @ManyToMany
    @JoinTable(name="team",
            joinColumns = @JoinColumn(name="project_id"),
            inverseJoinColumns = @JoinColumn(name="users_id"))
    private List<Project> projects;


}
