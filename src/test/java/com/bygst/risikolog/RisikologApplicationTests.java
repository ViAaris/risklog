package com.bygst.risikolog;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.repositories.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
class RisikologApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void insert(){

		Project school = new Project();
		school.setTitle("school amager");
		school.setStartingDate(new Date());
		school.setBudget(500);
		List<Risk> riskList = new ArrayList<>();
		Risk risk1 = new Risk();
		risk1.setTitle("risk 1 title");
		risk1.setDescription("risk 1 description");
		risk1.setActive(true);
		Risk risk2 = new Risk();
		risk1.setTitle("risk 2 title");
		risk1.setDescription("risk 2 description");
		risk1.setActive(false);
		riskList.add(risk1);
		riskList.add(risk2);
		school.setRisks(riskList);

	}

}
