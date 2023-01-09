package com.bygst.risikolog.dto;

import com.bygst.risikolog.util.Unique;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserDTO {



    @NotBlank(message = "cannot be empty")
    @JsonView({Details.class})
    private String firstName;

    @NotBlank(message = "cannot be empty")
    @JsonView({Details.class})
    private String surname;

    @NotBlank(message = "cannot be empty")
    @JsonView({Details.class})
    private String department;

    @NotBlank(message = "cannot be empty")
    @JsonView({Details.class})
    @Unique(message = "username already exists")
    private String username;

    @NotBlank(message = "cannot be empty")
    @Size(min = 8, message = "password should have at least 8 characters")
    private String password;

}
