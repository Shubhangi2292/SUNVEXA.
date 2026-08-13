package com.sunvexa.repository;

import com.sunvexa.entity.Product;
import com.sunvexa.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByActiveTrue();
    Page<Product> findByActiveTrue(Pageable pageable);
    List<Product> findByCategoryAndActiveTrue(ProductCategory category);
}
