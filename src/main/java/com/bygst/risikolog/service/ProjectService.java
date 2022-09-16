package com.bygst.risikolog.service;

import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.dto.UserDTO;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RiskRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import com.bygst.risikolog.util.MapperUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProjectService {

   private final ProjectRepository projectRepository;
   private final RiskRepository riskRepository;
    private final ModelMapper modelMapper;
    private final UsersRepository usersRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, RiskRepository riskRepository, ModelMapper modelMapper, UsersRepository usersRepository) {
        this.projectRepository = projectRepository;
       this.riskRepository = riskRepository;
        this.modelMapper = modelMapper;
        this.usersRepository = usersRepository;
    }

    public List<ProjectDTO> getAllProjects() {

        //return MapperUtil.convertList(projectRepository.findAllWithTeam(), this::convertToProjectDTO);
        List<ProjectDTO> dtoList = new ArrayList<>();
         for(Project p : projectRepository.findAllWithTeam()){
             dtoList.add(mapProject(p));
         }
         return dtoList;
    }

    public ProjectDTO getProject(int id){
        Project p =  projectRepository.findByIdAndFetchTeamEagerly(id);

        return mapProject(p);


    }
    public ProjectDTO mapProject(Project p){
        List<User> team = p.getTeam();
        List<UserDTO> userDtoList;
        ProjectDTO dto = convertToProjectDTO(p);
        if(team.size()!=0){
            userDtoList =  team.stream()
                    .map(user -> convertToUserDto(user)).collect(Collectors.toList());
            dto.setTeam(userDtoList);
        }
        dto.setContractors(p.getContractors().stream().map(contractor->new StringBuilder().append(contractor)).collect(Collectors.joining()));
        dto.setAdvisers(p.getAdvisers().stream().map(adviser -> new StringBuilder().append(adviser)).collect(Collectors.joining()));
        return dto;
    }
//    @Transactional
//    public List<Project> findAllWithRisksAndTeams() {
//        final List<Project> projects = projectRepository.findAllWithRisks();
//        return !projects.isEmpty() ?
//                projectRepository.findAllWithTeam() :
//                projects;
//    }



    public Project add(ProjectDTO projectDTO){
        Project project = convertToProject(projectDTO);
        if(projectDTO.getContractors()!=null) {
            List<String> contractors = Arrays.asList(projectDTO.getContractors().trim()
                    .split(","));
            project.setContractors(contractors);
        }
        if(projectDTO.getAdvisers()!=null) {
            List<String> advisers = Arrays.asList(projectDTO.getAdvisers().trim()
                    .split(","));
            project.setAdvisers(advisers);
        }
      return projectRepository.save(project);
    }

    public List<User> getTeam(int projectId){
      return   usersRepository.findAllByProjectsId(projectId);
    }

    public Optional<Project> loadProjectByTitle(String title){
      return projectRepository.findByTitle(title);
    }

    //@PreAuthorize("authentication.authorities.contains('#projectId')")
    @PreAuthorize("hasAnyAuthority(#projectId, 'ROLE_ADMIN')")
    public List<Risk> getAllRisks(int projectId){
       return projectRepository.findById(projectId).get().getRisks();
    }

    public ProjectDTO convertToProjectDTO(Project project){
        return this.modelMapper.map(project, ProjectDTO.class);
    }
    public Project convertToProject(ProjectDTO projectDTO) {
        return this.modelMapper.map(projectDTO, Project.class);
    }
    public User convertToUser(UserDTO userDTO) {
        return this.modelMapper.map(userDTO, User.class);
    }
    public UserDTO convertToUserDto(User user){
        return this.modelMapper.map(user, UserDTO.class);
    }
}
