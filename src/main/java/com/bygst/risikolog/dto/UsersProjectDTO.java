package com.bygst.risikolog.dto;


import com.bygst.risikolog.util.UniqueProject;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class UsersProjectDTO {

    @JsonView({Details.class})
    private Long id;

    @JsonView({Details.class})
    private String title;

}
