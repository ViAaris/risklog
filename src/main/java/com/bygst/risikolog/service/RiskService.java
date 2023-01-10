package com.bygst.risikolog.service;


import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.repositories.ProjectRepository;
import com.bygst.risikolog.repositories.RiskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RiskService {

    private final RiskRepository riskRepository;
    private final ProjectRepository projectRepository;

    public RiskService(RiskRepository riskRepository,
                       ProjectRepository projectRepository) {
        this.riskRepository = riskRepository;
        this.projectRepository = projectRepository;
    }

    public Risk save(Risk risk, long projectId){
        //System.out.println(risk.getId());
        if(risk.getId() == null) {
            Project project = projectRepository.findById(projectId).get();
            project.addRiskToProject(risk);
        }
        return riskRepository.save(risk);
    }

    public Risk save(Risk risk){
        return riskRepository.save(risk);
    }

    public Optional<Risk> getRisk(long id){
        return riskRepository.findById(id);
    }
}
