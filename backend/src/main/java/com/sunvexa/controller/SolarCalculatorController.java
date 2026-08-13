package com.sunvexa.controller;

import com.sunvexa.dto.SolarCalculationRequest;
import com.sunvexa.dto.SolarCalculationResponse;
import com.sunvexa.service.SolarCalculatorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solar")
public class SolarCalculatorController {

    private final SolarCalculatorService solarCalculatorService;

    public SolarCalculatorController(SolarCalculatorService solarCalculatorService) {
        this.solarCalculatorService = solarCalculatorService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<SolarCalculationResponse> calculateSolarEstimates(@Valid @RequestBody SolarCalculationRequest request) {
        SolarCalculationResponse response = solarCalculatorService.calculateSolarEstimates(request);
        return ResponseEntity.ok(response);
    }
}
