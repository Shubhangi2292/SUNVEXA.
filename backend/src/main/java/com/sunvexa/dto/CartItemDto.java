package com.sunvexa.dto;

import java.math.BigDecimal;

public class CartItemDto {

    private Long id;
    private ProductDto product;
    private Integer quantity;
    private BigDecimal priceAtAddition;
    private BigDecimal itemSubtotal;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ProductDto getProduct() { return product; }
    public void setProduct(ProductDto product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getPriceAtAddition() { return priceAtAddition; }
    public void setPriceAtAddition(BigDecimal priceAtAddition) { this.priceAtAddition = priceAtAddition; }

    public BigDecimal getItemSubtotal() { return itemSubtotal; }
    public void setItemSubtotal(BigDecimal itemSubtotal) { this.itemSubtotal = itemSubtotal; }
}
