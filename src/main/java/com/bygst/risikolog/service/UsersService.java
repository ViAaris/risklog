package com.bygst.risikolog.service;

import com.bygst.risikolog.dto.UsersDTO;
import com.bygst.risikolog.dto.UsersProjectDTO;
import com.bygst.risikolog.exceptions.InvalidDataException;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.User;
import com.bygst.risikolog.model.UserProject;
import com.bygst.risikolog.repositories.RequestRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsersService {

    private final UsersRepository usersRepository;
    private final ModelMapper modelMapper;
    private final RequestRepository requestRepository;

    public UsersService(UsersRepository usersRepository, ModelMapper modelMapper, RequestRepository requestRepository) {
        this.usersRepository = usersRepository;
        this.modelMapper = modelMapper;
        this.requestRepository = requestRepository;
    }


    public User getUser(long id) throws InvalidDataException {
        return usersRepository.findById(id).get();
    }

    public Optional<User> loadUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public List<UsersDTO> getAllUsers() {
        List<UsersDTO> dtoList = new ArrayList<>();
        for (User user : usersRepository.findAllWithProjects()) {
            dtoList.add(mapUser(user));
        }
        return dtoList;
    }

    private UsersDTO mapUser(User user) {
        Set<UserProject> projects = user.getProjects();
        List<UsersProjectDTO> projectsDTOS;
        UsersDTO dto = convertToUsersDTO(user);
        if (!projects.isEmpty()) {
            projectsDTOS = projects.stream()
                    .map(userProject -> mapProjectToUsersProject(userProject.getProject())).collect(Collectors.toList());
            dto.setProjects(projectsDTOS);
        }

        return dto;
    }

    private UsersProjectDTO mapProjectToUsersProject(Project project) {
        UsersProjectDTO usersProjectDTO = new UsersProjectDTO();
        usersProjectDTO.setTitle(project.getTitle());
        usersProjectDTO.setId(project.getId());
        return usersProjectDTO;
    }

    private UsersDTO convertToUsersDTO(User user) {
        return this.modelMapper.map(user, UsersDTO.class);
    }

    public void removeUser(Long id) {
        User u = usersRepository.findById(id).orElseThrow();
        u.getProjects().forEach(userProject -> userProject.getProject().getTeam().remove(userProject));
        requestRepository.deleteByUserId(id);
        usersRepository.deleteById(id);
    }
}
