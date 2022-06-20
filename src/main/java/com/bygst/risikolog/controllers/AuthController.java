package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.AuthenticationDTO;
import com.bygst.risikolog.dto.UserDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.service.RegistrationService;
import com.bygst.risikolog.util.UserValidator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final RegistrationService registrationService;
    private final UserValidator userValidator;
    private final ModelMapper modelMapper;
    private final UserDTO userDTO;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationDTO authenticationDTO;


    @Autowired
    public AuthController(RegistrationService registrationService, UserValidator userValidator, ModelMapper modelMapper, UserDTO userDTO, AuthenticationManager authenticationManager, AuthenticationDTO authenticationDTO) {
        this.registrationService = registrationService;
        this.userValidator = userValidator;
        this.modelMapper = modelMapper;
        this.userDTO = userDTO;
        this.authenticationManager = authenticationManager;
        this.authenticationDTO = authenticationDTO;
    }

    @PostMapping("/reg")
    public ResponseEntity performRegistration(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult){
        User user = convertToUser(userDTO);
       userValidator.validate(user, bindingResult);
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new InvalidDataException("you entered wrong data"));
        }

        registrationService.register(user);//зарегали

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody AuthenticationDTO authenticationDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationDTO.getUsername(), authenticationDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    public User convertToUser(UserDTO userDTO){
        return this.modelMapper.map(userDTO, User.class);
    }
}
