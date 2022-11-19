package com.bygst.risikolog.controllers;


import com.bygst.risikolog.dto.Details;
import com.bygst.risikolog.dto.ProjectDTO;
import com.bygst.risikolog.dto.RequestDTO;
import com.bygst.risikolog.dto.RiskDTO;
import com.bygst.risikolog.model.Project;
import com.bygst.risikolog.model.Request;
import com.bygst.risikolog.service.RequestService;
import com.bygst.risikolog.util.RequestStatus;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RequestController {

    private final RequestService requestService;
    private final ModelMapper modelMapper;

    public RequestController(RequestService requestService, ModelMapper modelMapper) {
        this.requestService = requestService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/admin/requests")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<RequestDTO> showAllRequests() {
        return requestService.getAllRequests();
    }

    @PostMapping("/requests")
    public ResponseEntity sendRequest(@RequestBody @Valid RequestDTO requestDTO) {
        requestService.addRequest(requestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/admin/requests/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    //@Validated(OnUpdate.class)
    public ResponseEntity updateRequestStatus(@RequestBody @Valid RequestDTO requestDTO) {
        RequestDTO dtoForResponse = convertToDto(requestService.addRequest(requestDTO));
        return new ResponseEntity<>(dtoForResponse, HttpStatus.OK);
    }

//    @GetMapping("/projects/{id}/risks")
//    @PreAuthorize("hasAnyAuthority(#id, 'ROLE_ADMIN')")
//    public List<RiskDTO> getProjectRisks(@PathVariable("id") int id) {
//        return projectService.getAllRisks(id).stream()
//                .map(risk -> convertToRiskDTO(risk))
//                .collect(Collectors.toList());
//    }
//
//    @GetMapping("/projects/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public ProjectDTO getOneProject(@PathVariable("id") int id) {
//        return projectService.getProject(id);
//    }
//
//    @DeleteMapping("/admin/projects/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public ResponseEntity deleteProject(@PathVariable("id") int id){
//        projectService.removeProject(id);
//        return ResponseEntity.ok("project was deleted");
//    }

    public Request convertToRequest(RequestDTO requestDTO) {
        return this.modelMapper.map(requestDTO, Request.class);
    }

    public RequestDTO convertToDto(Request request) {
        return this.modelMapper.map(request, RequestDTO.class);
    }

}
