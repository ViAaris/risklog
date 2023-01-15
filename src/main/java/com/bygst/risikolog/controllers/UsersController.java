package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.Details;
import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.dto.UsersDTO;
import com.bygst.risikolog.service.UsersService;
import com.fasterxml.jackson.annotation.JsonView;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UsersController {

    private final UsersService usersService;
    private final ModelMapper modelMapper;

    public UsersController(UsersService usersService, ModelMapper modelMapper) {
        this.usersService = usersService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/admin/users")
    @JsonView({Details.class})
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UsersDTO> getAllUsers() {
        return usersService.getAllUsers();
    }

    @DeleteMapping("/admin/users/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity deleteUser(@PathVariable("id") long id){
       usersService.removeUser(id);
        return ResponseEntity.ok("user was deleted");
    }

}
