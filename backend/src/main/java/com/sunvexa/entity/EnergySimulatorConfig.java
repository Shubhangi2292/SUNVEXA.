package com.sunvexa.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "energy_simulations")
public class EnergySimulatorConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "system_size")
    private String systemSize;

    @Column(name = "battery_capacity")
    private String batteryCapacity;

    @Column(name = "estimated_consumption_profile", columnDefinition = "TEXT")
    private String estimatedConsumptionProfile;

    @Column(name = "simulation_parameters", columnDefinition = "TEXT")
    private String simulationParameters;

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

    public String getSystemSize() { return systemSize; }
    public void setSystemSize(String systemSize) { this.systemSize = systemSize; }

    public String getBatteryCapacity() { return batteryCapacity; }
    public void setBatteryCapacity(String batteryCapacity) { this.batteryCapacity = batteryCapacity; }

    public String getEstimatedConsumptionProfile() { return estimatedConsumptionProfile; }
    public void setEstimatedConsumptionProfile(String estimatedConsumptionProfile) { this.estimatedConsumptionProfile = estimatedConsumptionProfile; }

    public String getSimulationParameters() { return simulationParameters; }
    public void setSimulationParameters(String simulationParameters) { this.simulationParameters = simulationParameters; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
}
