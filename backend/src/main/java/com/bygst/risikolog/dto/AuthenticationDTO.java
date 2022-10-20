package com.bygst.risikolog.dto;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationDTO {
    @JsonView({Details.class})
    private Long id;

    @JsonView({Details.class})
    private String username;

    private String password;

    @JsonView({Details.class})
    private String[] grantedAuthorities;

}
