package com.sunvexa.controller;

import com.sunvexa.dto.CreateOrderRequest;
import com.sunvexa.dto.OrderDto;
import com.sunvexa.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(Authentication authentication, @Valid @RequestBody CreateOrderRequest request) {
        String email = authentication != null ? authentication.getName() : null;
        OrderDto createdOrder = orderService.createOrder(email, request);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getUserOrders(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<OrderDto> orders = orderService.getUserOrders(authentication.getName());
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{idOrNumber}")
    public ResponseEntity<OrderDto> getOrderByIdOrNumber(@PathVariable String idOrNumber, Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        OrderDto order = orderService.getOrderByIdOrNumber(idOrNumber, email);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderNumber}/tracking")
    public ResponseEntity<Map<String, Object>> getOrderTracking(@PathVariable String orderNumber) {
        Map<String, Object> tracking = orderService.getOrderTracking(orderNumber);
        return ResponseEntity.ok(tracking);
    }
}
