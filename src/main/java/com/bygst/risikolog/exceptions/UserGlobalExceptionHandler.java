package com.bygst.risikolog.exceptions;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class UserGlobalExceptionHandler  {

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<UserIncorrectData> handleException(InvalidDataException e){
        UserIncorrectData data = new UserIncorrectData();
        data.setError(e.getMessage());
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<UserIncorrectData> handleException(BadCredentialsException e){
        UserIncorrectData data = new UserIncorrectData();
        data.setError(e.getMessage());
        return new ResponseEntity<>(data, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();

        List<CustomFieldError> fieldErrors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            CustomFieldError fieldError = new CustomFieldError();
            fieldError.setField(((FieldError) error).getField());
            fieldError.setMessage(error.getDefaultMessage());
            fieldErrors.add(fieldError);
        });

        fieldErrorResponse.setFieldErrors(fieldErrors);
        return new ResponseEntity<>(fieldErrorResponse, HttpStatus.BAD_REQUEST);
    }


//    @ExceptionHandler( NonUniqueResultException.class)
//    public ResponseEntity<UserIncorrectData> handleException(NonUniqueResultException e){
//        UserIncorrectData data = new UserIncorrectData();
//        data.setError("entered value already exists");
//        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
//    }
}
