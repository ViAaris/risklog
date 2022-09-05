package com.bygst.risikolog.service;

import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Role;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.RoleRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * @author Neil Alishev
 */
@Service
@Transactional
public class RegistrationService {

    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;




    @Autowired
    public RegistrationService(UsersRepository usersRepository, RoleRepository roleRepository,
                               PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;

    }

    public User register(User user) throws InvalidDataException{
//        userValidator.validate(user, bindingResult);
//
//        if(bindingResult.getFieldError("username")!=null) {
//            throw new InvalidDataException(Objects.requireNonNull(bindingResult.getFieldError("username")).getDefaultMessage());
//        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        ArrayList<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByRole("ROLE_USER").get());
        user.setRoles(roles);
        return usersRepository.save(user);
    }


}
