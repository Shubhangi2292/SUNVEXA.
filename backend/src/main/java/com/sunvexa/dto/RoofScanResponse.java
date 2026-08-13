package com.sunvexa.dto;

public class RoofScanResponse {

    private Integer estimatedRoofArea;
    private String estimatedCapacity;
    private Integer estimatedPanelCount;
    private String solarPotential;
    private Boolean isPreliminary = true;
    private String disclaimer;
    private String imageReferenceId;

    public Integer getEstimatedRoofArea() { return estimatedRoofArea; }
    public void setEstimatedRoofArea(Integer estimatedRoofArea) { this.estimatedRoofArea = estimatedRoofArea; }

    public String getEstimatedCapacity() { return estimatedCapacity; }
    public void setEstimatedCapacity(String estimatedCapacity) { this.estimatedCapacity = estimatedCapacity; }

    public Integer getEstimatedPanelCount() { return estimatedPanelCount; }
    public void setEstimatedPanelCount(Integer estimatedPanelCount) { this.estimatedPanelCount = estimatedPanelCount; }

    public String getSolarPotential() { return solarPotential; }
    public void setSolarPotential(String solarPotential) { this.solarPotential = solarPotential; }

    public Boolean getIsPreliminary() { return isPreliminary; }
    public void setIsPreliminary(Boolean isPreliminary) { this.isPreliminary = isPreliminary; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }

    public String getImageReferenceId() { return imageReferenceId; }
    public void setImageReferenceId(String imageReferenceId) { this.imageReferenceId = imageReferenceId; }
}
