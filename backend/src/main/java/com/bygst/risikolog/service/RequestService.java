package com.bygst.risikolog.service;
import com.bygst.risikolog.dto.RequestDTO;
import com.bygst.risikolog.model.Request;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RequestRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import com.bygst.risikolog.util.RequestStatus;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RequestService {

    private final RequestRepository requestRepository;
    private final ProjectRepository projectRepository;
    private final UsersRepository usersRepository;
    private final ModelMapper modelMapper;


    public RequestService(RequestRepository requestRepository, ProjectService projectService,
                          ProjectRepository projectRepository,
                          UsersService usersService, UsersRepository usersRepository, ModelMapper modelMapper) {
        this.requestRepository = requestRepository;
        this.projectRepository = projectRepository;
        this.usersRepository = usersRepository;
        this.modelMapper = modelMapper;
    }

    public Request getRequest(int id){
        return requestRepository.findById(id).get();
    }

    public List<RequestDTO> getAllRequests(){
        List<RequestDTO> dtoList = new ArrayList<>();
        for(Request r : requestRepository.findAll()){
            dtoList.add(convertToDto(r));
        }
        return dtoList;
    }

    public Request addRequest(RequestDTO requestDTO){
        Request request = convertToRequest(requestDTO);
        switch (requestDTO.getStatus()) {
            case "pending":
                request.setStatus(RequestStatus.PENDING);
                break;
            case "approved":
                request.setStatus(RequestStatus.APPROVED);
                projectRepository.findById(requestDTO.getProjectId()).get()
                        .getTeam()
                        .add(usersRepository.findById(requestDTO.getUserId()).get());
                break;
            case "declined":
                request.setStatus(RequestStatus.DECLINED);
                break;

            //default:request.setStatus(RequestStatus.PENDING);
        }
        return requestRepository.save(request);
    }

//    public Request updateRequest(Request request){
//        if(request.isApproved()){
//           projectRepository.findByIdAndFetchTeamEagerly(request.getProjectId())
//                    .getTeam().add(usersRepository.findById(request.getUserId()).get());
//        }
//        return requestRepository.save(request);
//    }

    public Request convertToRequest(RequestDTO requestDTO) {
        return this.modelMapper.map(requestDTO, Request.class);
    }

    public RequestDTO convertToDto(Request request){
        return this.modelMapper.map(request, RequestDTO.class);
    }

}
