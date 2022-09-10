package com.bygst.risikolog.dto;


import com.bygst.risikolog.model.User;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class ProjectDTO {

    @JsonView({Details.class})
    private int id;
    @JsonView({Details.class})
    private String title;
    @JsonView({Details.class})
    private String address;
    @JsonView({Details.class})
    private long budget;
    @JsonView({Details.class})
    private Date finishingDate;
    @JsonView({Details.class})
    private Date startingDate;

    private List<String> contractors;

    private List<String> advisers;

    @JsonView({Details.class})
    private List<User> team;
}
