package com.bygst.risikolog.dto;

import com.bygst.risikolog.model.Project;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
public class UserDTO {


    private String firstName;

    private String surname;

    private String department;


    private String username;

    private String password;


    private List<Project> projects;
}
