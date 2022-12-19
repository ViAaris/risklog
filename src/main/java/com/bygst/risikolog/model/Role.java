package com.bygst.risikolog.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    public Role(String role) {
        this.role = role;
    }
}
