package com.sunvexa.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class CopilotRequest {

    @NotBlank(message = "Message is required")
    private String message;

    private String context;

    private List<ChatMessageDto> history;

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }

    public List<ChatMessageDto> getHistory() { return history; }
    public void setHistory(List<ChatMessageDto> history) { this.history = history; }

    public static class ChatMessageDto {
        private String sender; // "user" or "ai" / "model"
        private String text;

        public ChatMessageDto() {}

        public ChatMessageDto(String sender, String text) {
            this.sender = sender;
            this.text = text;
        }

        public String getSender() { return sender; }
        public void setSender(String sender) { this.sender = sender; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}
