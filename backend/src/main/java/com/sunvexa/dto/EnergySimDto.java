package com.sunvexa.dto;

import java.time.ZonedDateTime;

public class EnergySimDto {

    private Long id;
    private Long userId;
    private String systemSize;
    private String batteryCapacity;
    private String estimatedConsumptionProfile;
    private String simulationParameters;
    private ZonedDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSystemSize() { return systemSize; }
    public void setSystemSize(String systemSize) { this.systemSize = systemSize; }

    public String getBatteryCapacity() { return batteryCapacity; }
    public void setBatteryCapacity(String batteryCapacity) { this.batteryCapacity = batteryCapacity; }

    public String getEstimatedConsumptionProfile() { return estimatedConsumptionProfile; }
    public void setEstimatedConsumptionProfile(String estimatedConsumptionProfile) { this.estimatedConsumptionProfile = estimatedConsumptionProfile; }

    public String getSimulationParameters() { return simulationParameters; }
    public void setSimulationParameters(String simulationParameters) { this.simulationParameters = simulationParameters; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
