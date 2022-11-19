package com.bygst.risikolog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@EnableWebSecurity
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true)
public class SecurityConfig {

    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()

                .authorizeRequests()
                .antMatchers("/api/admin/*").access("hasAuthority('ROLE_ADMIN')")
                .antMatchers("/auth/login*", "/auth/reg", "/").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/auth/login")
                .loginProcessingUrl("/process_login")
                .defaultSuccessUrl("/api/projects")
                //.failureUrl("/auth/login?error")
                .and()
                .logout()
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .logoutUrl("/perform_logout")
                .logoutSuccessUrl("/api/projects")
                .and()
                .cors()
                .configurationSource(corsConfigurationSource());


        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8081"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "withCredentials", "Content-Type", "x-auth-token",
                "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "X-XSRF-TOKEN"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token", "set-cookie"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration.applyPermitDefaultValues());
        return source;
    }


//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }



//    // Настраиваем аутентификацию
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService)
//                .passwordEncoder(getPasswordEncoder());
//    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
