package com.sunvexa.service;

import com.sunvexa.dto.QuoteRequestDto;
import com.sunvexa.entity.Quote;
import com.sunvexa.entity.QuoteStatus;
import com.sunvexa.entity.User;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.QuoteRepository;
import com.sunvexa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final UserRepository userRepository;

    public QuoteService(QuoteRepository quoteRepository, UserRepository userRepository) {
        this.quoteRepository = quoteRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public QuoteRequestDto createQuoteRequest(QuoteRequestDto dto, String userEmail) {
        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        Quote quote = new Quote();
        quote.setUser(user);
        quote.setName(dto.getName());
        quote.setEmail(dto.getEmail());
        quote.setPhone(dto.getPhone());
        quote.setPropertyType(dto.getPropertyType());
        quote.setLocation(dto.getLocation());
        quote.setMonthlyElectricityBill(dto.getMonthlyElectricityBill());
        quote.setRoofArea(dto.getRoofArea());
        quote.setPreferredSystemSize(dto.getPreferredSystemSize());
        quote.setMessage(dto.getMessage());
        quote.setStatus(QuoteStatus.NEW);

        Quote saved = quoteRepository.save(quote);
        return convertToDto(saved);
    }

    public List<QuoteRequestDto> getUserQuotes(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return quoteRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<QuoteRequestDto> getAllQuotesForAdmin() {
        return quoteRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public QuoteRequestDto updateQuoteStatus(Long quoteId, QuoteStatus status) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found: " + quoteId));
        quote.setStatus(status);
        Quote updated = quoteRepository.save(quote);
        return convertToDto(updated);
    }

    public QuoteRequestDto convertToDto(Quote quote) {
        QuoteRequestDto dto = new QuoteRequestDto();
        dto.setId(quote.getId());
        dto.setName(quote.getName());
        dto.setEmail(quote.getEmail());
        dto.setPhone(quote.getPhone());
        dto.setPropertyType(quote.getPropertyType());
        dto.setLocation(quote.getLocation());
        dto.setMonthlyElectricityBill(quote.getMonthlyElectricityBill());
        dto.setRoofArea(quote.getRoofArea());
        dto.setPreferredSystemSize(quote.getPreferredSystemSize());
        dto.setMessage(quote.getMessage());
        dto.setStatus(quote.getStatus());
        dto.setCreatedAt(quote.getCreatedAt());
        return dto;
    }
}
