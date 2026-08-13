package com.sunvexa.dto;

import com.sunvexa.entity.QuoteStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.ZonedDateTime;

public class QuoteRequestDto {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Property type is required")
    private String propertyType;

    private String location;
    private String monthlyElectricityBill;
    private String roofArea;
    private String preferredSystemSize;
    private String message;
    private QuoteStatus status;
    private ZonedDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMonthlyElectricityBill() { return monthlyElectricityBill; }
    public void setMonthlyElectricityBill(String monthlyElectricityBill) { this.monthlyElectricityBill = monthlyElectricityBill; }

    public String getRoofArea() { return roofArea; }
    public void setRoofArea(String roofArea) { this.roofArea = roofArea; }

    public String getPreferredSystemSize() { return preferredSystemSize; }
    public void setPreferredSystemSize(String preferredSystemSize) { this.preferredSystemSize = preferredSystemSize; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public QuoteStatus getStatus() { return status; }
    public void setStatus(QuoteStatus status) { this.status = status; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
