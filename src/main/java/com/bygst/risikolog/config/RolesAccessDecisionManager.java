package com.bygst.risikolog.config;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.stream.Collectors;

@Component
public class RolesAccessDecisionManager implements AccessDecisionManager {
    private final static String AUTHENTICATED = "authenticated";
    private final static String PERMIT_ALL = "permitAll";

    @Override
    public void decide(Authentication authentication, Object o, Collection<ConfigAttribute> collection) throws AccessDeniedException, InsufficientAuthenticationException {
        collection.forEach(configAttribute -> {
            if (!this.supports(configAttribute))
                throw new AccessDeniedException("ACCESS DENIED");
        });
    }

    @Override
    public boolean supports(ConfigAttribute configAttribute) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String rolesAsString = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
            if (configAttribute.toString().contains(rolesAsString))
                return true;
            else
                return (configAttribute.toString().contains(PERMIT_ALL) || configAttribute.toString().contains(AUTHENTICATED));
        }
        return true;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}