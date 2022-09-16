package com.bygst.risikolog.controllers;

import com.bygst.risikolog.dto.Details;
import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.dto.RiskDTO;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.service.ProjectService;

import com.bygst.risikolog.util.OnUpdate;
import com.fasterxml.jackson.annotation.JsonView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
@Validated
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



    @PostMapping("/admin/projects")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ProjectDTO> addNewProject(@RequestBody @Valid ProjectDTO projectDTO) {


        ProjectDTO dtoForResponse = convertToDto(projectService.add(projectDTO));
        return new ResponseEntity<>(dtoForResponse, HttpStatus.OK);
    }


    @PutMapping("/admin/projects/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Validated(OnUpdate.class)
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody @Valid ProjectDTO projectDTO) {
        ProjectDTO dtoForResponse = convertToDto(projectService.add(projectDTO));
        return new ResponseEntity<>(dtoForResponse, HttpStatus.OK);
    }

    @GetMapping("/projects/{id}/risks")
    @PreAuthorize("hasAuthority(#id)")
    public List<RiskDTO> getProjectRisks(@PathVariable("id") int id) {
       return projectService.getAllRisks(id).stream()
               .map(risk -> convertToRiskDTO(risk))
               .collect(Collectors.toList());
    }

    @GetMapping("/projects/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ProjectDTO getOneProject(@PathVariable("id") int id) {
        return projectService.getProject(id);
    }


    public Project convertToProject(ProjectDTO projectDTO) {
        return this.modelMapper.map(projectDTO, Project.class);
    }

    public ProjectDTO convertToDto(Project project){
        return this.modelMapper.map(project, ProjectDTO.class);
    }

    public RiskDTO convertToRiskDTO(Risk risk){
        return this.modelMapper.map(risk, RiskDTO.class);
    }

}
