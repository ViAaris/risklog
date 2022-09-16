package com.bygst.risikolog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class RequestDTO {

    private int id;
    int projectId;
    int userId;
    String username;
    boolean isApproved;
}
