package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.AuthenticationDTO;
import com.bygst.risikolog.dto.UserDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RiskRepository;
import com.bygst.risikolog.service.RegistrationService;
import com.bygst.risikolog.util.UserValidator;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final RegistrationService registrationService;
    private final UserValidator userValidator;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final ProjectRepository projectRepository;
    private final RiskRepository riskRepository;


    @Autowired
    public AuthController(RegistrationService registrationService, UserValidator userValidator,
                          ModelMapper modelMapper, AuthenticationManager authenticationManager, ProjectRepository projectRepository, RiskRepository riskRepository) {
        this.registrationService = registrationService;
        this.userValidator = userValidator;
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
        this.projectRepository = projectRepository;
        this.riskRepository = riskRepository;
    }

    @PostMapping("/reg")
    public ResponseEntity performRegistration(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult){
        User user = convertToUser(userDTO);
       userValidator.validate(user, bindingResult);
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new InvalidDataException("you entered wrong data"));
        }

        registrationService.register(user);//зарегали
        Project school = new Project();
        school.setTitle("school amager");
        school.setStartingDate(new Date());
        school.setBudget(500);

        List<Risk> riskList = new ArrayList<>();
        Risk risk1 = new Risk();
        risk1.setTitle("risk 1 title");
        risk1.setDescription("risk 1 description");
        risk1.setActive(true);
        Risk risk2 = new Risk();
        risk1.setTitle("risk 2 title");
        risk1.setDescription("risk 2 description");
        risk1.setActive(false);
        riskList.add(risk1);
        riskList.add(risk2);

        school.setRisks(riskList);
        projectRepository.save(school);


        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody AuthenticationDTO authenticationDTO){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationDTO.getUsername(), authenticationDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new ResponseEntity<>("User signed-in successfully", HttpStatus.OK);
        }catch (BadCredentialsException exception){
            return new ResponseEntity<>("Bad credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    public User convertToUser(UserDTO userDTO){
        return this.modelMapper.map(userDTO, User.class);
    }
}
