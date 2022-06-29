package com.bygst.risikolog.dto;


import com.bygst.risikolog.model.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class ProjectDTO {


    private String title;

    private String address;

    private long budget;

    private Date finishingDate;

    private Date startingDate;

    private List<String> contractors;

    private List<String> advisers;

    private List<User> team;
}
