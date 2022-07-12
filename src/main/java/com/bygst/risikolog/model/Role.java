package com.bygst.risikolog.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@Data
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name="role")
    private String role;

    @Transient
    @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL)
    private Set<User> users;

    public Role(String role) {
        this.role = role;
    }
}
