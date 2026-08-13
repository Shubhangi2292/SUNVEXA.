package com.sunvexa.dto;

import com.sunvexa.entity.ProductCategory;
import java.math.BigDecimal;

public class ProductDto {

    private Long id;
    private String name;
    private ProductCategory category;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String power;
    private String efficiency;
    private Integer warrantyYears;
    private String productType;
    private String imageUrl;
    private String badge;
    private Boolean active;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public ProductCategory getCategory() { return category; }
    public void setCategory(ProductCategory category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getPower() { return power; }
    public void setPower(String power) { this.power = power; }

    public String getEfficiency() { return efficiency; }
    public void setEfficiency(String efficiency) { this.efficiency = efficiency; }

    public Integer getWarrantyYears() { return warrantyYears; }
    public void setWarrantyYears(Integer warrantyYears) { this.warrantyYears = warrantyYears; }

    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
