package com.sunvexa.controller;

import com.sunvexa.dto.CopilotRequest;
import com.sunvexa.dto.CopilotResponse;
import com.sunvexa.service.SolarCopilotService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/copilot")
public class SolarCopilotController {

    private final SolarCopilotService copilotService;

    public SolarCopilotController(SolarCopilotService copilotService) {
        this.copilotService = copilotService;
    }

    @PostMapping("/chat")
    public ResponseEntity<CopilotResponse> chat(@Valid @RequestBody CopilotRequest request) {
        CopilotResponse response = copilotService.processCopilotChat(request);
        return ResponseEntity.ok(response);
    }
}
