package com.sunvexa.service;

import com.sunvexa.dto.RoofScanResponse;
import com.sunvexa.exception.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class RoofScanService {

    public RoofScanResponse analyzeRoofImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Roof satellite image file is required.");
        }

        // Generate safe image ref id
        String refId = "ROOF-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        RoofScanResponse response = new RoofScanResponse();
        response.setEstimatedRoofArea(850);
        response.setEstimatedCapacity("4.5 - 5.5 kW");
        response.setEstimatedPanelCount(10);
        response.setSolarPotential("HIGH (92% Sun Irradiance Index)");
        response.setIsPreliminary(true);
        response.setImageReferenceId(refId);
        response.setDisclaimer("AI-assisted preliminary visualization and NOT a professional engineering/site assessment. Site visits verify shading, structural tilt, and load bearing.");

        return response;
    }
}
