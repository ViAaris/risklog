package com.bygst.risikolog.util;

import com.bygst.risikolog.model.User;
import com.bygst.risikolog.service.UsersService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {


    private final UsersService usersService;

    public UserValidator(UsersService usersService) {

        this.usersService = usersService;
    }


    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;

        if(usersService.loadUserByUsername(user.getUsername()).isPresent())
            errors.rejectValue("username", "", "User with this name already exists");
    }
}
