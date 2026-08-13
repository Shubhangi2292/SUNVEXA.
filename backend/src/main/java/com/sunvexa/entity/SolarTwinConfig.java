package com.sunvexa.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "solar_twins")
public class SolarTwinConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "system_capacity")
    private String systemCapacity;

    @Column(name = "panel_count")
    private Integer panelCount;

    @Column(name = "inverter_capacity")
    private String inverterCapacity;

    @Column(name = "battery_capacity")
    private String batteryCapacity;

    @Column(name = "estimated_generation")
    private String estimatedGeneration;

    @Column(name = "estimated_consumption")
    private String estimatedConsumption;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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
}
