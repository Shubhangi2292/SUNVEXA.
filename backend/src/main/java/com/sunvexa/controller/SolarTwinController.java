package com.sunvexa.controller;

import com.sunvexa.dto.SolarTwinDto;
import com.sunvexa.service.SolarTwinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solar-twin")
public class SolarTwinController {

    private final SolarTwinService solarTwinService;

    public SolarTwinController(SolarTwinService solarTwinService) {
        this.solarTwinService = solarTwinService;
    }

    @PostMapping
    public ResponseEntity<SolarTwinDto> saveSolarTwin(Authentication authentication, @RequestBody SolarTwinDto dto) {
        String email = authentication != null ? authentication.getName() : null;
        SolarTwinDto saved = solarTwinService.saveSolarTwin(dto, email);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SolarTwinDto>> getUserSolarTwins(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<SolarTwinDto> twins = solarTwinService.getUserSolarTwins(authentication.getName());
        return ResponseEntity.ok(twins);
    }
}
