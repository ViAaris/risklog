package com.bygst.risikolog;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import org.apache.catalina.Context;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.Arrays;
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

	@Bean
	public ServletWebServerFactory servletContainer() {
		return new TomcatServletWebServerFactory() {
			@Override
			protected void postProcessContext(Context context) {
				Rfc6265CookieProcessor rfc6265Processor = new Rfc6265CookieProcessor();
				rfc6265Processor.setSameSiteCookies("lax");
				context.setCookieProcessor(rfc6265Processor);
			}
		};
	}

}



