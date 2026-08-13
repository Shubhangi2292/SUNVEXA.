package com.sunvexa.controller;

import com.sunvexa.dto.InstallationDto;
import com.sunvexa.service.InstallationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/installations")
public class InstallationController {

    private final InstallationService installationService;

    public InstallationController(InstallationService installationService) {
        this.installationService = installationService;
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<InstallationDto> getInstallationByOrderId(@PathVariable Long orderId) {
        InstallationDto dto = installationService.getInstallationByOrderId(orderId);
        return ResponseEntity.ok(dto);
    }
}
