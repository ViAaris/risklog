package com.bygst.risikolog.util;


import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.service.ProjectService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ProjectValidator implements Validator {

    private final ProjectService projectService;

    public ProjectValidator(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Project.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
       Project project = (Project) target;

        if(projectService.loadProjectByTitle(project.getTitle()).isPresent())
            errors.rejectValue("title", "", "This project already exists");

    }
}
