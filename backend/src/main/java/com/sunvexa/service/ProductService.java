package com.sunvexa.service;

import com.sunvexa.dto.ProductDto;
import com.sunvexa.entity.Product;
import com.sunvexa.entity.ProductCategory;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> getAllActiveProducts() {
        return productRepository.findByActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Page<ProductDto> filterProducts(ProductCategory category, BigDecimal minPrice, BigDecimal maxPrice, 
                                          String power, String search, Pageable pageable) {
        Specification<Product> spec = Specification.where((root, query, cb) -> cb.equal(root.get("active"), true));

        if (category != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category"), category));
        }
        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }
        if (power != null && !power.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("power")), "%" + power.toLowerCase() + "%"));
        }
        if (search != null && !search.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%")
            ));
        }

        return productRepository.findAll(spec, pageable).map(this::convertToDto);
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDto(product);
    }

    public List<ProductDto> getProductsByIds(List<Long> ids) {
        return productRepository.findAllById(ids).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDto createProduct(ProductDto dto) {
        Product product = convertToEntity(dto);
        Product saved = productRepository.save(product);
        return convertToDto(saved);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        if (dto.getName() != null) product.setName(dto.getName());
        if (dto.getCategory() != null) product.setCategory(dto.getCategory());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getPrice() != null) product.setPrice(dto.getPrice());
        if (dto.getStockQuantity() != null) product.setStockQuantity(dto.getStockQuantity());
        if (dto.getPower() != null) product.setPower(dto.getPower());
        if (dto.getEfficiency() != null) product.setEfficiency(dto.getEfficiency());
        if (dto.getWarrantyYears() != null) product.setWarrantyYears(dto.getWarrantyYears());
        if (dto.getProductType() != null) product.setProductType(dto.getProductType());
        if (dto.getImageUrl() != null) product.setImageUrl(dto.getImageUrl());
        if (dto.getBadge() != null) product.setBadge(dto.getBadge());
        if (dto.getActive() != null) product.setActive(dto.getActive());

        Product updated = productRepository.save(product);
        return convertToDto(updated);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setActive(false); // Soft delete
        productRepository.save(product);
    }

    public ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setCategory(product.getCategory());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setPower(product.getPower());
        dto.setEfficiency(product.getEfficiency());
        dto.setWarrantyYears(product.getWarrantyYears());
        dto.setProductType(product.getProductType());
        dto.setImageUrl(product.getImageUrl());
        dto.setBadge(product.getBadge());
        dto.setActive(product.getActive());
        return dto;
    }

    public Product convertToEntity(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setCategory(dto.getCategory());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        if (dto.getStockQuantity() != null) product.setStockQuantity(dto.getStockQuantity());
        product.setPower(dto.getPower());
        product.setEfficiency(dto.getEfficiency());
        if (dto.getWarrantyYears() != null) product.setWarrantyYears(dto.getWarrantyYears());
        product.setProductType(dto.getProductType());
        product.setImageUrl(dto.getImageUrl());
        product.setBadge(dto.getBadge());
        if (dto.getActive() != null) product.setActive(dto.getActive());
        return product;
    }
}
