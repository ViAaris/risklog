package com.bygst.risikolog.controllers;

import com.bygst.risikolog.dto.Details;
import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.service.ProjectService;

import com.fasterxml.jackson.annotation.JsonView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProjectsController {

    private final ProjectService projectService;
    private final ModelMapper modelMapper;


    @Autowired
    public ProjectsController(ProjectService projectService, ModelMapper modelMapper) {
        this.projectService = projectService;
        this.modelMapper = modelMapper;

    }

    @GetMapping("/projects")
    @JsonView({Details.class})
    public List<ProjectDTO> showAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping("/admin/new_project")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity addNewProject(@RequestBody @Valid ProjectDTO projectDTO) {
        Project project = convertToProject(projectDTO);
        projectService.add(project);//зарегали
        return new ResponseEntity<>("Project added successfully", HttpStatus.OK);
    }

//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    @PutMapping("/admin/projects/{id}")
//    public ResponseEntity<Project> updateProject(@RequestBody @Valid ProjectDTO projectDTO) {
//        Project project = convertToProject(projectDTO);
//
//        return new ResponseEntity<>(projectService.add(project), HttpStatus.OK);
//    }

    @GetMapping("/projects/{id}")
    public List<Risk> getProjectsRisks(@PathVariable("id") int id) {
        return projectService.getAllRisks(id);
    }

//    @GetMapping("/projects/{id}")
//    public Project getOneProject(@PathVariable("id") int id) {
//        return projectService.getProject(id);
//    }


    public Project convertToProject(ProjectDTO projectDTO) {
        return this.modelMapper.map(projectDTO, Project.class);
    }


}
