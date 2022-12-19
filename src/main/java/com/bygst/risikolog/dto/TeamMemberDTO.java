package com.bygst.risikolog.dto;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TeamMemberDTO {

    @JsonView({Details.class})
    private Long id;
    @JsonView({Details.class})
    private String fullName;
}
