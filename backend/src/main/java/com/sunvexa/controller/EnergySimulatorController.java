package com.sunvexa.controller;

import com.sunvexa.dto.EnergySimDto;
import com.sunvexa.service.EnergySimulatorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/energy-simulator")
public class EnergySimulatorController {

    private final EnergySimulatorService energySimulatorService;

    public EnergySimulatorController(EnergySimulatorService energySimulatorService) {
        this.energySimulatorService = energySimulatorService;
    }

    @PostMapping("/save")
    public ResponseEntity<EnergySimDto> saveEnergySimulation(Authentication authentication, @RequestBody EnergySimDto dto) {
        String email = authentication != null ? authentication.getName() : null;
        EnergySimDto saved = energySimulatorService.saveEnergySimulation(dto, email);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EnergySimDto>> getUserSimulations(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<EnergySimDto> sims = energySimulatorService.getUserSimulations(authentication.getName());
        return ResponseEntity.ok(sims);
    }
}
