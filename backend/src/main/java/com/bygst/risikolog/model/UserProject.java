package com.bygst.risikolog.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity(name="team")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProject implements Serializable {


    @Id
    @ManyToOne
    private Project project;

    @Id
    @ManyToOne
    private User user;
}
