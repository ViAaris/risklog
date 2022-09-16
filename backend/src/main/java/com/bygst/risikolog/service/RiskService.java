package com.bygst.risikolog.service;


import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.repositories.RiskRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RiskService {

    private final RiskRepository riskRepository;
    private final JdbcTemplate jdbcTemplate;

    public RiskService(RiskRepository riskRepository, JdbcTemplate jdbcTemplate) {
        this.riskRepository = riskRepository;


        this.jdbcTemplate = jdbcTemplate;
    }

    public Risk save(Risk risk, int projectId){
        //System.out.println(risk.getId());
        if(risk.getId() == 0) {
            Risk savedRisk = riskRepository.save(risk);
            //projectRepository.findById(projectId).get().getRisks().add(risk);
            jdbcTemplate.update("INSERT INTO PROJECT_RISKS VALUES (?, ?)", projectId, savedRisk.getId());
        }
        return riskRepository.save(risk);
    }

    public Risk save(Risk risk){

        if(risk.getId() != 0) {
            Risk savedRisk = riskRepository.save(risk);
        }
        return riskRepository.save(risk);
    }

    public Optional<Risk> getRisk(int id){
        return riskRepository.findById(id);
    }
}
