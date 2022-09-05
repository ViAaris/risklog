package com.bygst.risikolog.util;

import com.bygst.risikolog.service.UsersService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueValidator implements ConstraintValidator<Unique, String> {

    private final UsersService usersService;

    public UniqueValidator(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    public void initialize(Unique constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String enteredValue, ConstraintValidatorContext constraintValidatorContext) {
        return usersService.loadUserByUsername(enteredValue).isEmpty();
    }
}
