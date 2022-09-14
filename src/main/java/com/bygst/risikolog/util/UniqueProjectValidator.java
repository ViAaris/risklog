package com.bygst.risikolog.util;

import com.bygst.risikolog.service.ProjectService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueProjectValidator implements ConstraintValidator<UniqueProject, String> {

    private final ProjectService projectService;

    public UniqueProjectValidator(ProjectService projectService) {
        this.projectService = projectService;
    }


    @Override
    public void initialize(UniqueProject constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String enteredValue,
                           ConstraintValidatorContext constraintValidatorContext) {
        return projectService.loadProjectByTitle(enteredValue).isEmpty();
    }
}
