package com.sunvexa.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class CreateOrderRequest {

    private Long productId; // For direct Buy Now flow
    private Integer quantity; // For direct Buy Now flow
    private List<Long> cartItemIds; // For Cart Checkout flow

    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "PIN Code is required")
    private String pinCode;

    private Boolean installationRequired = false;
    private String installationAddress;
    private String preferredDate;
    private String preferredTime;
    private String installationNotes;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // UPI, CARD, NET_BANKING

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public List<Long> getCartItemIds() { return cartItemIds; }
    public void setCartItemIds(List<Long> cartItemIds) { this.cartItemIds = cartItemIds; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPinCode() { return pinCode; }
    public void setPinCode(String pinCode) { this.pinCode = pinCode; }

    public Boolean getInstallationRequired() { return installationRequired; }
    public void setInstallationRequired(Boolean installationRequired) { this.installationRequired = installationRequired; }

    public String getInstallationAddress() { return installationAddress; }
    public void setInstallationAddress(String installationAddress) { this.installationAddress = installationAddress; }

    public String getPreferredDate() { return preferredDate; }
    public void setPreferredDate(String preferredDate) { this.preferredDate = preferredDate; }

    public String getPreferredTime() { return preferredTime; }
    public void setPreferredTime(String preferredTime) { this.preferredTime = preferredTime; }

    public String getInstallationNotes() { return installationNotes; }
    public void setInstallationNotes(String installationNotes) { this.installationNotes = installationNotes; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
