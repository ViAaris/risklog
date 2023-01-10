package com.bygst.risikolog.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NonUniqueProjectException extends Exception{
    private String field;
    private String message;
}
