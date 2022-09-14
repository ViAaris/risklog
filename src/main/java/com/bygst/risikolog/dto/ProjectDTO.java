package com.bygst.risikolog.dto;


import com.bygst.risikolog.model.User;
import com.bygst.risikolog.util.Unique;
import com.bygst.risikolog.util.UniqueProject;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Data
public class ProjectDTO {

    @JsonView({Details.class})
    private int id;
    @JsonView({Details.class})
    @NotBlank(message = "cannot be empty")
    @UniqueProject(message = "project already exists")
    private String title;
    @JsonView({Details.class})
    @NotBlank(message = "cannot be empty")
    private String address;
    @JsonView({Details.class})
    @NotBlank(message = "cannot be empty")
    private long budget;
    @JsonView({Details.class})
    private Date finishingDate;
    @JsonView({Details.class})
    private Date startingDate;
    @JsonView({Details.class})
    private List<String> contractors;
    @JsonView({Details.class})
    private List<String> advisers;

    @JsonView({Details.class})
    private List<User> team;
}
