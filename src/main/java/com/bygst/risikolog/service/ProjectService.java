package com.bygst.risikolog.service;

import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {

   private final ProjectRepository projectRepository;

   @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
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

}
