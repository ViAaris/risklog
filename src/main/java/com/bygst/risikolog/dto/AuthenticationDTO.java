package com.bygst.risikolog.dto;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Collection;

@Getter
@Setter
public class AuthenticationDTO {

    @JsonView({Details.class})
    private String username;

    private String password;

    @JsonView({Details.class})
    private String[] grantedAuthorities;

}
