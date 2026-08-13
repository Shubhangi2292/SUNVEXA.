package com.sunvexa.controller;

import com.sunvexa.dto.PaymentDto;
import com.sunvexa.dto.ProcessPaymentRequest;
import com.sunvexa.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<PaymentDto> processPayment(@Valid @RequestBody ProcessPaymentRequest request) {
        PaymentDto response = paymentService.processDemoPayment(request);
        return ResponseEntity.ok(response);
    }
}
