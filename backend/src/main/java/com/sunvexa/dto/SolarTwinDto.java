package com.sunvexa.dto;

import java.time.ZonedDateTime;

public class SolarTwinDto {

    private Long id;
    private Long userId;
    private String systemCapacity;
    private Integer panelCount;
    private String inverterCapacity;
    private String batteryCapacity;
    private String estimatedGeneration;
    private String estimatedConsumption;
    private ZonedDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSystemCapacity() { return systemCapacity; }
    public void setSystemCapacity(String systemCapacity) { this.systemCapacity = systemCapacity; }

    public Integer getPanelCount() { return panelCount; }
    public void setPanelCount(Integer panelCount) { this.panelCount = panelCount; }

    public String getInverterCapacity() { return inverterCapacity; }
    public void setInverterCapacity(String inverterCapacity) { this.inverterCapacity = inverterCapacity; }

    public String getBatteryCapacity() { return batteryCapacity; }
    public void setBatteryCapacity(String batteryCapacity) { this.batteryCapacity = batteryCapacity; }

    public String getEstimatedGeneration() { return estimatedGeneration; }
    public void setEstimatedGeneration(String estimatedGeneration) { this.estimatedGeneration = estimatedGeneration; }

    public String getEstimatedConsumption() { return estimatedConsumption; }
    public void setEstimatedConsumption(String estimatedConsumption) { this.estimatedConsumption = estimatedConsumption; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
