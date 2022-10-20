package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.RiskDTO;
import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.service.RiskService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<RiskDTO> addRisk(@RequestBody RiskDTO riskDTO,
                                  @PathVariable("id") long projectId) throws URISyntaxException {
        Risk risk = riskService.save(convertToRisk(riskDTO), projectId);
        RiskDTO dtoForResponse = convertToRiskDTO(risk);
        return ResponseEntity.ok(dtoForResponse);
        //return ResponseEntity.created(new URI("/api/risks/" + savedRisk.getId())).body(savedRisk);
    }

    @PutMapping("/api/projects/{projectId}/risks/{riskId}")
    public ResponseEntity<RiskDTO> updateRisk(@RequestBody RiskDTO riskDTO,
                                     @PathVariable("riskId") long riskId){
        Risk risk = convertToRisk(riskDTO);
        risk.setId(riskId);
        RiskDTO dtoForResponse = convertToRiskDTO(riskService.save(risk));
        return ResponseEntity.ok(dtoForResponse);
    }

    @GetMapping("/api/projects/{projectId}/risks/{riskId}")
    public RiskDTO getRisk(@PathVariable("riskId") long riskId){
        return convertToRiskDTO(riskService.getRisk(riskId).get());
    }


    public Risk convertToRisk(RiskDTO riskDTO){
        return this.modelMapper.map(riskDTO, Risk.class);
    }

    public RiskDTO convertToRiskDTO(Risk risk){
        return this.modelMapper.map(risk, RiskDTO.class);
    }

}
