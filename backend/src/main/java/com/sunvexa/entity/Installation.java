package com.sunvexa.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "installations")
public class Installation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column(name = "installation_required", nullable = false)
    private Boolean installationRequired = true;

    @Column(name = "installation_address", columnDefinition = "TEXT")
    private String installationAddress;

    @Column(name = "preferred_date")
    private String preferredDate;

    @Column(name = "preferred_time")
    private String preferredTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InstallationStatus status = InstallationStatus.REQUESTED;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Boolean getInstallationRequired() { return installationRequired; }
    public void setInstallationRequired(Boolean installationRequired) { this.installationRequired = installationRequired; }

    public String getInstallationAddress() { return installationAddress; }
    public void setInstallationAddress(String installationAddress) { this.installationAddress = installationAddress; }

    public String getPreferredDate() { return preferredDate; }
    public void setPreferredDate(String preferredDate) { this.preferredDate = preferredDate; }

    public String getPreferredTime() { return preferredTime; }
    public void setPreferredTime(String preferredTime) { this.preferredTime = preferredTime; }

    public InstallationStatus getStatus() { return status; }
    public void setStatus(InstallationStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
}
