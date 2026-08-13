package com.sunvexa.dto;

import jakarta.validation.constraints.NotBlank;

public class CopilotRequest {

    @NotBlank(message = "Message is required")
    private String message;

    private String context;

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }
}
