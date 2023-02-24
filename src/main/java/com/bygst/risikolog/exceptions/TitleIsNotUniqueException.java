package com.bygst.risikolog.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TitleIsNotUniqueException extends Exception{

    private String field;
    private String message;
}
