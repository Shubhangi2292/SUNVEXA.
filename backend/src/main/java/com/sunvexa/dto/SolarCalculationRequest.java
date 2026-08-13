package com.sunvexa.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SolarCalculationRequest {

    @NotNull(message = "Monthly electricity bill is required")
    @Min(value = 100, message = "Monthly bill must be positive")
    private Double monthlyElectricityBill;

    private String propertyType = "residential";
    private String location = "India";
    private Double roofArea; // in sq ft

    public Double getMonthlyElectricityBill() { return monthlyElectricityBill; }
    public void setMonthlyElectricityBill(Double monthlyElectricityBill) { this.monthlyElectricityBill = monthlyElectricityBill; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getRoofArea() { return roofArea; }
    public void setRoofArea(Double roofArea) { this.roofArea = roofArea; }
}
