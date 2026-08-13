package com.sunvexa.controller;

import com.sunvexa.dto.QuoteRequestDto;
import com.sunvexa.service.QuoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @PostMapping
    public ResponseEntity<QuoteRequestDto> createQuoteRequest(Authentication authentication, @Valid @RequestBody QuoteRequestDto dto) {
        String email = authentication != null ? authentication.getName() : null;
        QuoteRequestDto created = quoteService.createQuoteRequest(dto, email);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<QuoteRequestDto>> getUserQuotes(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<QuoteRequestDto> quotes = quoteService.getUserQuotes(authentication.getName());
        return ResponseEntity.ok(quotes);
    }
}
