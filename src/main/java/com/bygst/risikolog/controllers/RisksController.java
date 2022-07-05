package com.bygst.risikolog.controllers;


import com.bygst.risikolog.model.Risk;
import com.bygst.risikolog.service.RiskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
public class RisksController {

    private final RiskService riskService;

    public RisksController(RiskService riskService) {
        this.riskService = riskService;
    }

    @PostMapping("/api/projects/{id}/risks")
    public ResponseEntity addRisk(@RequestBody Risk risk, @PathVariable("id") int projectId) throws URISyntaxException {
        Risk savedRisk = riskService.save(risk, projectId);
        return ResponseEntity.created(new URI("/api/projects/" + projectId + "/risks/" + savedRisk.getId())).body(savedRisk);
    }

    @PutMapping("/api/projects/{id}/risks/{riskId}")
    public ResponseEntity updateRisk(@RequestBody Risk risk, @PathVariable("riskId") int riskId, @PathVariable("id") int projectId){
        riskService.save(risk, projectId);
        return ResponseEntity.ok(riskService.getRisk(riskId).get());
    }

}
