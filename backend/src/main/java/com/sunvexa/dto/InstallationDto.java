package com.sunvexa.dto;

import com.sunvexa.entity.InstallationStatus;

public class InstallationDto {

    private Long id;
    private Long orderId;
    private Boolean installationRequired;
    private String installationAddress;
    private String preferredDate;
    private String preferredTime;
    private InstallationStatus status;
    private String notes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

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
}
