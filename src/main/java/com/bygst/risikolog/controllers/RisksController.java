package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.RiskDTO;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.service.RiskService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@CrossOrigin
public class RisksController {

    private final RiskService riskService;
    private final ModelMapper modelMapper;

    public RisksController(RiskService riskService, ModelMapper modelMapper) {
        this.riskService = riskService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/api/projects/{id}/risks")
    public ResponseEntity addRisk(@RequestBody RiskDTO riskDTO, @PathVariable("id") int projectId) throws URISyntaxException {
        Risk risk = convertToRisk(riskDTO);
        Risk savedRisk = riskService.save(risk, projectId);
        return ResponseEntity.created(new URI("/api/risks/" + savedRisk.getId())).body(savedRisk);
    }

    @PutMapping("/api/risks/{riskId}")
    public ResponseEntity updateRisk(@RequestBody Risk risk,
                                     @PathVariable("riskId") int riskId){
        risk.setId(riskId);
        riskService.save(risk);
        return ResponseEntity.ok(riskService.getRisk(riskId).get());
    }

    @GetMapping("/api/risks/{id}")
    public Risk getRisk(@PathVariable("id") int riskId){
        return riskService.getRisk(riskId).get();
    }

    public Risk convertToRisk(RiskDTO riskDTO){
        return this.modelMapper.map(riskDTO, Risk.class);
    }

}
