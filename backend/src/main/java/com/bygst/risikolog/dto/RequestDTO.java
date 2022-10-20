package com.bygst.risikolog.dto;

import com.bygst.risikolog.util.RequestStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class RequestDTO {


    private Long id;
    private Long projectId;
    private Long userId;
    private String username;
    private String status;
}
