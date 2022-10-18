package com.bygst.risikolog.model;


import com.bygst.risikolog.util.RequestStatus;
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
    private int projectId;
    @Column(name = "userId")
    private int userId;
    @Column(name = "username")
    private String username;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private RequestStatus status;
}
