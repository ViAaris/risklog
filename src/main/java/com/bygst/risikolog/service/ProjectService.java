package com.bygst.risikolog.service;

import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.dto.UserDTO;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RiskRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<ProjectDTO> dtoList = new ArrayList<>();
         for(Project p : projectRepository.findAll()){
             List<User> team = getTeam(p.getId());
             ProjectDTO dto = convertToProjectDTO(p);
             dto.setTeam(team);
             dtoList.add(dto);
         }
         return dtoList;
    }

    public Project getProject(int id){
        //return projectRepository.findByIdAndFetchTeamEagerly(id);
        return findById(id);
    }

//    @Transactional
//    public List<Project> findAllWithRisksAndTeams() {
//        final List<Project> projects = projectRepository.findAllWithRisks();
//        return !projects.isEmpty() ?
//                projectRepository.findAllWithTeam() :
//                projects;
//    }


    @Transactional
    public Project findById(Integer id) {
        Project project = projectRepository.findById(id).get();
        // To load lazy association roles.
        //project.setTeam(getTeam(id));
        project.getTeam().size();
        project.getAdvisers().size();
        project.getContractors().size();
        project.getRisks().size();
        return project;
    }

    public Project add(Project project){
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

    public User convertToUser(UserDTO userDTO) {
        return this.modelMapper.map(userDTO, User.class);
    }
    public UserDTO convertToUserDto(User user){
        return this.modelMapper.map(user, UserDTO.class);
    }
}
