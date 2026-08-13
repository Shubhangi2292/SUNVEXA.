package com.sunvexa.controller;

import com.sunvexa.dto.RoofScanResponse;
import com.sunvexa.service.RoofScanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/roofscan")
public class RoofScanController {

    private final RoofScanService roofScanService;

    public RoofScanController(RoofScanService roofScanService) {
        this.roofScanService = roofScanService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<RoofScanResponse> analyzeRoofImage(@RequestParam("file") MultipartFile file) {
        RoofScanResponse response = roofScanService.analyzeRoofImage(file);
        return ResponseEntity.ok(response);
    }
}
