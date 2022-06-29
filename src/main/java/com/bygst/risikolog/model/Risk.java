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
    @Column(name = "risk_id")
    private int id;

    private String title;
    private String description;
    private String reason;
    private String category;
    private String consequences;
    @Temporal(TemporalType.DATE)
    private Date changingDate;
    private int probability;
    private int minCost;
    private int midCost;
    private int maxCost;
    private int value;
    private String owner;
    private String actions;
    private boolean isActive;


}
