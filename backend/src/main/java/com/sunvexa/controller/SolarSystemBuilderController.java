package com.sunvexa.controller;

import com.sunvexa.dto.SystemBuilderRequest;
import com.sunvexa.dto.SystemBuilderResponse;
import com.sunvexa.service.SolarSystemBuilderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solar")
public class SolarSystemBuilderController {

    private final SolarSystemBuilderService systemBuilderService;

    public SolarSystemBuilderController(SolarSystemBuilderService systemBuilderService) {
        this.systemBuilderService = systemBuilderService;
    }

    @PostMapping("/system-builder")
    public ResponseEntity<SystemBuilderResponse> buildCustomSystem(@RequestBody SystemBuilderRequest request) {
        SystemBuilderResponse response = systemBuilderService.buildCustomSystem(request);
        return ResponseEntity.ok(response);
    }
}
