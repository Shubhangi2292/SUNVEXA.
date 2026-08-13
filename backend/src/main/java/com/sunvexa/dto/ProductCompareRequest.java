package com.sunvexa.dto;

import java.util.List;

public class ProductCompareRequest {

    private List<Long> productIds;

    public List<Long> getProductIds() { return productIds; }
    public void setProductIds(List<Long> productIds) { this.productIds = productIds; }
}
