package com.bygst.risikolog.service;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RiskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {

   private final ProjectRepository projectRepository;
   private final RiskRepository riskRepository;

   @Autowired
    public ProjectService(ProjectRepository projectRepository, RiskRepository riskRepository) {
        this.projectRepository = projectRepository;
       this.riskRepository = riskRepository;
   }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void add(Project project){
       projectRepository.save(project);
    }

    public Optional<Project> loadProjectByTitle(String title){
      return projectRepository.findByTitle(title);
    }

    public List<Risk> getAllRisks(int projectId){
       return projectRepository.findById(projectId).get().getRisks();
    }



}
