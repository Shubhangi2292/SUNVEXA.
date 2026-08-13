package com.sunvexa.controller;

import com.sunvexa.dto.ProductCompareRequest;
import com.sunvexa.dto.ProductDto;
import com.sunvexa.entity.ProductCategory;
import com.sunvexa.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @RequestParam(required = false) ProductCategory category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String power,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        if (category == null && minPrice == null && maxPrice == null && power == null && search == null) {
            return ResponseEntity.ok(productService.getAllActiveProducts());
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<ProductDto> productPage = productService.filterProducts(category, minPrice, maxPrice, power, search, pageable);
        return ResponseEntity.ok(productPage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/compare")
    public ResponseEntity<List<ProductDto>> compareProducts(@RequestBody ProductCompareRequest request) {
        if (request.getProductIds() == null || request.getProductIds().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<ProductDto> products = productService.getProductsByIds(request.getProductIds());
        return ResponseEntity.ok(products);
    }
}
