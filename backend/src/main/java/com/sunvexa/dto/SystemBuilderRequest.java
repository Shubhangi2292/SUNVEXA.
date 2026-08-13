package com.sunvexa.dto;

import java.util.List;

public class SystemBuilderRequest {

    private Long panelProductId;
    private Integer panelQuantity;
    private Long inverterProductId;
    private Long batteryProductId;
    private Long mountingProductId;
    private Boolean includeInstallation = true;

    public Long getPanelProductId() { return panelProductId; }
    public void setPanelProductId(Long panelProductId) { this.panelProductId = panelProductId; }

    public Integer getPanelQuantity() { return panelQuantity; }
    public void setPanelQuantity(Integer panelQuantity) { this.panelQuantity = panelQuantity; }

    public Long getInverterProductId() { return inverterProductId; }
    public void setInverterProductId(Long inverterProductId) { this.inverterProductId = inverterProductId; }

    public Long getBatteryProductId() { return batteryProductId; }
    public void setBatteryProductId(Long batteryProductId) { this.batteryProductId = batteryProductId; }

    public Long getMountingProductId() { return mountingProductId; }
    public void setMountingProductId(Long mountingProductId) { this.mountingProductId = mountingProductId; }

    public Boolean getIncludeInstallation() { return includeInstallation; }
    public void setIncludeInstallation(Boolean includeInstallation) { this.includeInstallation = includeInstallation; }
}
