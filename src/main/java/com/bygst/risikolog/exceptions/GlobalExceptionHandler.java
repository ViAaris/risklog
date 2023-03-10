package com.bygst.risikolog.exceptions;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<IncorrectData> handleException(InvalidDataException e){
        IncorrectData data = new IncorrectData();
        data.setError(e.getMessage());
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<IncorrectData> handleException(BadCredentialsException e){
        IncorrectData data = new IncorrectData();
        data.setError(e.getMessage());
        return new ResponseEntity<>(data, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class, TitleIsNotUniqueException.class})
    protected ResponseEntity<Object> handleMethodArgumentNotValid(Exception ex) {
        FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();

        List<CustomFieldError> fieldErrors = new ArrayList<>();
        if(ex instanceof MethodArgumentNotValidException){
            MethodArgumentNotValidException exception = (MethodArgumentNotValidException)ex;
            exception.getBindingResult().getAllErrors().forEach((error) -> {
                CustomFieldError fieldError = new CustomFieldError();
                fieldError.setField(((FieldError) error).getField());
                fieldError.setMessage(error.getDefaultMessage());
                fieldErrors.add(fieldError);
            });
        }

        if(ex instanceof TitleIsNotUniqueException){
            TitleIsNotUniqueException exception = (TitleIsNotUniqueException)ex;
            fieldErrors.add(new CustomFieldError(exception.getField(), exception.getMessage()));
        }
        fieldErrorResponse.setFieldErrors(fieldErrors);

        return new ResponseEntity<>(fieldErrorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {AccessDeniedException.class})
    public ResponseEntity<IncorrectData> handleException(AccessDeniedException accessDeniedException) {
        IncorrectData data = new IncorrectData();
        data.setError(accessDeniedException.getMessage());
        return new ResponseEntity<>(data, HttpStatus.FORBIDDEN);
    }


//    @ExceptionHandler( NonUniqueResultException.class)
//    public ResponseEntity<UserIncorrectData> handleException(NonUniqueResultException e){
//        UserIncorrectData data = new UserIncorrectData();
//        data.setError("entered value already exists");
//        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
//    }
}
