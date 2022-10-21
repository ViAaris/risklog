package com.bygst.risikolog.service;

import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.dto.TeamMemberDTO;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.model.UserProject;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RequestRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper modelMapper;
    private final UsersRepository usersRepository;
    private final RequestRepository requestRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, ModelMapper modelMapper, UsersRepository usersRepository, RequestRepository requestRepository) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.usersRepository = usersRepository;
        this.requestRepository = requestRepository;
    }

    public List<ProjectDTO> getAllProjects() {
        //return MapperUtil.convertList(projectRepository.findAllWithTeam(), this::convertToProjectDTO);
        List<ProjectDTO> dtoList = new ArrayList<>();
        for (Project p : projectRepository.findAllWithTeam()) {
            dtoList.add(mapProject(p));
        }
        return dtoList;
    }

    public ProjectDTO getProject(long id) {
        Project p = projectRepository.findByIdAndFetchTeamEagerly(id);
        return mapProject(p);
    }

    public ProjectDTO mapProject(Project p) {
        Set<UserProject> team = p.getTeam();
        List<TeamMemberDTO> teamMemberDTOS;
        ProjectDTO dto = convertToProjectDTO(p);
        if (!team.isEmpty()) {
            //team.stream().forEach(System.out::println);
            teamMemberDTOS = team.stream()
                    .map(user -> mapUserToTeamMember(user.getUser())).collect(Collectors.toList());
            //teamMemberDTOS.stream().forEach(System.out::println);
            dto.setTeam(teamMemberDTOS);
        }
        //dto.setTeam(p.getTeam().stream().map(user -> mapUserToTeamMember(user)).collect(Collectors.toList()));
        dto.setContractors(String.join(",", p.getContractors()));
        dto.setAdvisers(String.join(",", p.getAdvisers()));
        return dto;
    }


    public Project add(ProjectDTO projectDTO) {
        Project project = convertToProject(projectDTO);
        if (!projectDTO.getContractors().isBlank()) {
            List<String> contractors = Arrays.asList(projectDTO.getContractors().trim()
                    .split(","));
            project.setContractors(contractors);
        }
        if (!projectDTO.getAdvisers().isBlank()) {
            List<String> advisers = Arrays.asList(projectDTO.getAdvisers().trim()
                    .split(","));
            project.setAdvisers(advisers);
        }
        if (projectDTO.getId() != null) {
            project.setTeam(projectRepository.findById(project.getId()).get().getTeam());
            project.setRisks(projectRepository
                    .findByIdAndFetchRisks(project.getId()).getRisks());
        }
        return projectRepository.save(project);
    }


    public Optional<Project> loadProjectByTitle(String title) {
        return projectRepository.findByTitle(title);
    }

    //@PreAuthorize("authentication.authorities.contains('#projectId')")
    @PreAuthorize("hasAnyAuthority(#projectId, 'ROLE_ADMIN')")
    public List<Risk> getAllRisks(long projectId) {
        return projectRepository.findById(projectId).get().getRisks();
    }

    public ProjectDTO convertToProjectDTO(Project project) {
        return this.modelMapper.map(project, ProjectDTO.class);
    }

    public Project convertToProject(ProjectDTO projectDTO) {
        return this.modelMapper.map(projectDTO, Project.class);
    }

    public TeamMemberDTO mapUserToTeamMember(User user) {
        TeamMemberDTO teamMemberDTO = new TeamMemberDTO();
        teamMemberDTO.setFullName(user.getFirstName() + " " + user.getSurname());
        teamMemberDTO.setId(user.getId());
        return teamMemberDTO;
    }

    public void removeProject(long id) {
        requestRepository.deleteByProjectId(id);
        projectRepository.deleteById(id);
    }
}
