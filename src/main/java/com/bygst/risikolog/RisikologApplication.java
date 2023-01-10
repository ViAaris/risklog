package com.bygst.risikolog;

import org.apache.catalina.Context;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;

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



