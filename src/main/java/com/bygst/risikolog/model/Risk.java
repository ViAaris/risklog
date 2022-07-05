package com.bygst.risikolog.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Data
@Entity
@Table(name = "risk")
public class Risk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

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


}
