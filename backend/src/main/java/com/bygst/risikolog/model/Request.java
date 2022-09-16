package com.bygst.risikolog.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "projectId")
    int projectId;
    @Column(name = "userId")
    int userId;
    @Column(name = "username")
    String username;
    @Column(name = "approved")
    boolean isApproved;
}
