package com.bygst.risikolog;

import com.bygst.risikolog.dto.AuthenticationDTO;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.model.Role;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RoleRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import com.bygst.risikolog.service.AuthService;
import com.bygst.risikolog.service.ProjectService;
import com.bygst.risikolog.service.UsersService;
import com.jayway.restassured.RestAssured;
import com.jayway.restassured.authentication.FormAuthConfig;
import com.jayway.restassured.response.Response;

import com.jayway.restassured.specification.RequestSpecification;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
class RisikologApplicationTests {

	private RequestSpecification givenAuth(String username, String password) {
		FormAuthConfig formAuthConfig =
				new FormAuthConfig("http://localhost:8081/auth/login",
						"username", "password");

		return RestAssured.given().auth().form(username, password, formAuthConfig);
	}

	@Test
	void contextLoads() {
	}

	@Autowired
	UsersRepository usersRepository;
	@Autowired
	ProjectRepository projectRepository;
	@Autowired
	ProjectService projectService;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	AuthService authService;
	@Autowired
	UsersService usersService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Test
	public void testProjects(){
		List<Project> projects = new ArrayList<>();
		Project project = projectRepository.findById(2).get();
		projects.add(project);
		User user = new User("user11", "pass",
				"name", "surname", "department", projects);
		User registered = authService.register(user);
//		List<User> team = project.getTeam();
//				team.add(registered);
//				project.setTeam(team);
//		projectRepository.save(project);
//		Assert.assertNotNull(projectRepository.findById(2).get().getTeam());
	}

	@Test
	public void testProjectById(){
		System.out.println(projectService.getProject(1));
	}

	@Test
	public void testGrantedAuthorities(){
		AuthenticationDTO authenticationDTO = new AuthenticationDTO();
		authenticationDTO.setUsername("user2");
		authenticationDTO.setPassword("pass");
		AuthenticationDTO anotherDto = authService.authenticate(authenticationDTO);
		for(String authority :anotherDto.getGrantedAuthorities()){
			System.out.println(authority);
		}
	}

	@Test
	public void givenUserWithReadPrivilegeAndHasPermission_whenGetFooById_thenOK() {
		Response response = givenAuth("user2", "pass")
				.get("http://localhost:8081/api/projects");
		assertEquals(403, response.getStatusCode());
	}

	@Test
	public void testFindAllByProjectsId(){
		List<User> users = usersRepository.findAllByProjectsId(2);
		System.out.println(users.size());
	}

	@Test

	public void setName(){
		User user = usersRepository.findById(18).get();
		user.setFirstName("new name");
		System.out.println(user.getFirstName());//new name
		System.out.println(usersRepository.findById(18).get().getFirstName());//name
		System.out.println(user.getId());//18
		usersRepository.save(user);//update
		//usersRepository.save(usersRepository.findById(18).get());
	}

	@Test
	@Transactional
	public void testAddingProjectToUser(){
		User user = usersRepository.findById(13).get();
		List<Project> projects = user.getProjects();
		System.out.println(projects.get(0).getTitle());
		Project project = projectRepository.findById(2).get();
		projects.add(project);
		user.setProjects(projects);
		List<User> users = project.getTeam();
		users.add(user);
		project.setTeam(users);
		usersService.save(user);
		projectService.add(project);

	}

}
