package com.bygst.risikolog.service;
import com.bygst.risikolog.model.Request;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RequestRepository;
import com.bygst.risikolog.repositories.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class RequestService {

    private final RequestRepository requestRepository;
    private final ProjectRepository projectRepository;
    private final UsersRepository usersRepository;


    public RequestService(RequestRepository requestRepository, ProjectService projectService,
                          ProjectRepository projectRepository,
                          UsersService usersService, UsersRepository usersRepository) {
        this.requestRepository = requestRepository;
        this.projectRepository = projectRepository;
        this.usersRepository = usersRepository;
    }

    public Request getRequest(int id){
        return requestRepository.findById(id).get();
    }

    public List<Request> getAllRequests(){
        return requestRepository.findAll();
    }

    public Request addRequest(Request request){
        return requestRepository.save(request);
    }

    public Request updateRequest(Request request){
        if(request.isApproved()){
           projectRepository.findByIdAndFetchTeamEagerly(request.getProjectId())
                    .getTeam().add(usersRepository.findById(request.getUserId()).get());
        }
        return requestRepository.save(request);
    }

}
