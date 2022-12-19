package com.bygst.risikolog.util;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum RequestStatus {
    PENDING("pending"),
    APPROVED("approved"),
    DECLINED("declined");


    private String status;
    RequestStatus(String status) {
        this.status = status;
    }
}
