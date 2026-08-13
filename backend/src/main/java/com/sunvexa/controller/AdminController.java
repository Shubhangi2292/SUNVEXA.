package com.sunvexa.controller;

import com.sunvexa.dto.OrderDto;
import com.sunvexa.dto.ProductDto;
import com.sunvexa.dto.QuoteRequestDto;
import com.sunvexa.entity.InstallationStatus;
import com.sunvexa.entity.OrderStatus;
import com.sunvexa.entity.QuoteStatus;
import com.sunvexa.service.InstallationService;
import com.sunvexa.service.OrderService;
import com.sunvexa.service.ProductService;
import com.sunvexa.service.QuoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final QuoteService quoteService;
    private final InstallationService installationService;

    public AdminController(ProductService productService, OrderService orderService,
                           QuoteService quoteService, InstallationService installationService) {
        this.productService = productService;
        this.orderService = orderService;
        this.quoteService = quoteService;
        this.installationService = installationService;
    }

    // Product Management
    @PostMapping("/products")
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto dto) {
        ProductDto created = productService.createProduct(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto dto) {
        ProductDto updated = productService.updateProduct(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // Order Management
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrdersForAdmin());
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        OrderDto updated = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    // Installation Management
    @PutMapping("/installations/{id}/status")
    public ResponseEntity<?> updateInstallationStatus(@PathVariable Long id, @RequestParam InstallationStatus status) {
        return ResponseEntity.ok(installationService.updateInstallationStatus(id, status));
    }

    // Quote Management
    @GetMapping("/quotes")
    public ResponseEntity<List<QuoteRequestDto>> getAllQuotes() {
        return ResponseEntity.ok(quoteService.getAllQuotesForAdmin());
    }

    @PutMapping("/quotes/{id}/status")
    public ResponseEntity<QuoteRequestDto> updateQuoteStatus(@PathVariable Long id, @RequestParam QuoteStatus status) {
        QuoteRequestDto updated = quoteService.updateQuoteStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
