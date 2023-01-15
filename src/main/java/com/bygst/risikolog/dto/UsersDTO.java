package com.bygst.risikolog.dto;

import com.bygst.risikolog.util.Unique;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
public class UsersDTO {

    @JsonView({Details.class})
    private Long id;

    @JsonView({Details.class})
    private String firstName;


    @JsonView({Details.class})
    private String surname;


    @JsonView({Details.class})
    private String department;


    @JsonView({Details.class})
    private String username;

    @JsonView({Details.class})
    private List<UsersProjectDTO> projects;
}
