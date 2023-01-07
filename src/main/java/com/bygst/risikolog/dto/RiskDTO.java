package com.bygst.risikolog.dto;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class RiskDTO {

    private Long projectId;
    private Long id;
    private String title;
    private String description;
    private String reason;
    private String category;
    private String consequences;
    @Temporal(TemporalType.DATE)
    private Date changingDate;
    private Integer probability;
    private Long minCost;
    private Long midCost;
    private Long maxCost;
    private Long value;
    private String owner;
    private String actions;
    private Boolean isActive;
}
