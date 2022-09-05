package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.AuthenticationDTO;
import com.bygst.risikolog.dto.Details;
import com.bygst.risikolog.dto.UserDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RiskRepository;
import com.bygst.risikolog.service.RegistrationService;
import com.bygst.risikolog.service.UsersDetailsService;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.DatabindContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final RegistrationService registrationService;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final ProjectRepository projectRepository;
    private final RiskRepository riskRepository;
    private final UsersDetailsService usersDetailsService;


    @Autowired
    public AuthController(RegistrationService registrationService,
                          ModelMapper modelMapper, AuthenticationManager authenticationManager, ProjectRepository projectRepository, RiskRepository riskRepository, UsersDetailsService usersDetailsService) {
        this.registrationService = registrationService;
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
        this.projectRepository = projectRepository;
        this.riskRepository = riskRepository;
        this.usersDetailsService = usersDetailsService;
    }

    @PostMapping("/reg")
    @JsonView({Details.class})
    public ResponseEntity<User> performRegistration(@Valid @RequestBody UserDTO userDTO) throws InvalidDataException,
            MethodArgumentNotValidException {

        User user = convertToUser(userDTO);

        User registeredUser = registrationService.register(user);//зарегали
        return new ResponseEntity<>(registeredUser, HttpStatus.OK);

    }


    @PostMapping("/login")
    @JsonView({Details.class})
    public ResponseEntity<String> authenticateUser(@RequestBody AuthenticationDTO authenticationDTO) throws BadCredentialsException {

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationDTO.getUsername(), authenticationDTO.getPassword()));


            SecurityContextHolder.getContext().setAuthentication(authentication);


            return new ResponseEntity<>("user is logged in", HttpStatus.OK);

    }

    public User convertToUser(UserDTO userDTO) {
        return this.modelMapper.map(userDTO, User.class);
    }
}
