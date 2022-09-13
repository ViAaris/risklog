package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.AuthenticationDTO;
import com.bygst.risikolog.dto.Details;
import com.bygst.risikolog.dto.UserDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RoleRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import com.bygst.risikolog.service.AuthService;
import com.bygst.risikolog.service.ProjectService;
import com.bygst.risikolog.service.UsersService;
import com.fasterxml.jackson.annotation.JsonView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final ModelMapper modelMapper;



    @Autowired
    ProjectService projectService;

    @Autowired
    UsersService usersService;



    @Autowired
    public AuthController(
            AuthService authService, ModelMapper modelMapper) {
        this.authService = authService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/reg")
    @JsonView({Details.class})
    public ResponseEntity<UserDTO> performRegistration(@Valid @RequestBody UserDTO userDTO) throws InvalidDataException{

        User user = convertToUser(userDTO);

        UserDTO registeredUser = convertToUserDto(authService.register(user));//зарегали
        return new ResponseEntity<>(registeredUser, HttpStatus.OK);

    }


    @PostMapping("/login")
    @JsonView({Details.class})
    public ResponseEntity<AuthenticationDTO> authenticateUser(@RequestBody AuthenticationDTO authenticationDTO) throws BadCredentialsException {


        User user = usersService.getUser(20);
//        List<Project> projects = user.getProjects();
        Project project = projectService.getProject(3);
//        projects.add(project);
//        user.setProjects(projects);
        project.getTeam().add(user);
        //user.getProjects().add(project);
        //project.setTeam(users);
        //usersService.save(user);
        projectService.add(project);

        AuthenticationDTO dtoToReturn = authService.authenticate(authenticationDTO);
        return new ResponseEntity<>(dtoToReturn, HttpStatus.OK);

    }

    public User convertToUser(UserDTO userDTO) {
        return this.modelMapper.map(userDTO, User.class);
    }
    public UserDTO convertToUserDto(User user){
        return this.modelMapper.map(user, UserDTO.class);
    }
}
