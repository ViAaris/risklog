package com.bygst.risikolog.controllers;

import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.service.ProjectService;
import com.bygst.risikolog.util.ProjectValidator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectsController {

    private final ProjectService projectService;
    private final ModelMapper modelMapper;
    private final ProjectValidator projectValidator;

    @Autowired
    public ProjectsController(ProjectService projectService, ModelMapper modelMapper, ProjectValidator projectValidator) {
        this.projectService = projectService;
        this.modelMapper = modelMapper;
        this.projectValidator = projectValidator;
    }

    @GetMapping("/projects")
    public List<Project> showAllProjects(){
        return projectService.getAllProjects();
    }

    @PostMapping("/admin/new_project")
    public ResponseEntity addNewProject(@RequestBody @Valid ProjectDTO projectDTO, BindingResult bindingResult){
        Project project = convertToProject(projectDTO);
        projectValidator.validate(project, bindingResult);
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new InvalidDataException("you entered wrong data"));
        }

        projectService.add(project);//зарегали
        return new ResponseEntity<>("Project added successfully", HttpStatus.OK);
    }

    public Project convertToProject(ProjectDTO projectDTO){
        return this.modelMapper.map(projectDTO, Project.class);
    }

}
