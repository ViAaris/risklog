package com.bygst.risikolog;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class RisikologApplication {

	public static void main(String[] args) {
		SpringApplication.run(RisikologApplication.class, args);

	}

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}


}
