package com.sunvexa.dto;

import java.math.BigDecimal;
import java.util.List;

public class SystemBuilderResponse {

    private List<ProductDto> selectedComponents;
    private Double systemCapacityKw;
    private Double estimatedAnnualGenerationKwh;
    private BigDecimal estimatedTotalCost;
    private BigDecimal estimated25YearSavings;
    private String compatibilityNotice;

    public List<ProductDto> getSelectedComponents() { return selectedComponents; }
    public void setSelectedComponents(List<ProductDto> selectedComponents) { this.selectedComponents = selectedComponents; }

    public Double getSystemCapacityKw() { return systemCapacityKw; }
    public void setSystemCapacityKw(Double systemCapacityKw) { this.systemCapacityKw = systemCapacityKw; }

    public Double getEstimatedAnnualGenerationKwh() { return estimatedAnnualGenerationKwh; }
    public void setEstimatedAnnualGenerationKwh(Double estimatedAnnualGenerationKwh) { this.estimatedAnnualGenerationKwh = estimatedAnnualGenerationKwh; }

    public BigDecimal getEstimatedTotalCost() { return estimatedTotalCost; }
    public void setEstimatedTotalCost(BigDecimal estimatedTotalCost) { this.estimatedTotalCost = estimatedTotalCost; }

    public BigDecimal getEstimated25YearSavings() { return estimated25YearSavings; }
    public void setEstimated25YearSavings(BigDecimal estimated25YearSavings) { this.estimated25YearSavings = estimated25YearSavings; }

    public String getCompatibilityNotice() { return compatibilityNotice; }
    public void setCompatibilityNotice(String compatibilityNotice) { this.compatibilityNotice = compatibilityNotice; }
}
