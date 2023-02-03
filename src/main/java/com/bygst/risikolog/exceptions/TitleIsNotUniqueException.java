package com.bygst.risikolog.exceptions;

import lombok.Data;

@Data
public class TitleIsNotUniqueException extends Exception{

    private String field;
    private String title;
}
