package com.bygst.risikolog.dto;


import com.bygst.risikolog.util.OnCreate;
import com.bygst.risikolog.util.OnUpdate;
import com.bygst.risikolog.util.UniqueProject;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {

    @JsonView({Details.class})
    private Long id;

    @JsonView({Details.class})
    @NotBlank(message = "cannot be empty", groups = {OnCreate.class})
    @UniqueProject(message = "project already exists", groups = {OnCreate.class})
    private String title;

    @JsonView({Details.class})
    @NotBlank(message = "cannot be empty", groups = {OnCreate.class, OnUpdate.class})
    private String address;

    @JsonView({Details.class})
    private Long budget;

    @JsonView({Details.class})
    private Date finishingDate;

    @JsonView({Details.class})
    private Date startingDate;

    @JsonView({Details.class})
    private String contractors;

    @JsonView({Details.class})
    private String advisers;

    @JsonView({Details.class})
    private List<TeamMemberDTO> team;

    public ProjectDTO(Long id) {
        this.id = id;
    }
}
