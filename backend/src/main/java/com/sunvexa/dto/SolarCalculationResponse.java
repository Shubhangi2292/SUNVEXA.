package com.sunvexa.dto;

public class SolarCalculationResponse {

    private Double recommendedSystemCapacityKw;
    private Integer approximatePanelCount;
    private Double estimatedAnnualGenerationKwh;
    private Double estimatedAnnualSavings;
    private Double estimated25YearSavings;
    private Double paybackPeriodYears;
    private Double estimatedCo2OffsetTons;
    private Integer equivalentTreesPlanted;
    private String disclaimer;

    public Double getRecommendedSystemCapacityKw() { return recommendedSystemCapacityKw; }
    public void setRecommendedSystemCapacityKw(Double recommendedSystemCapacityKw) { this.recommendedSystemCapacityKw = recommendedSystemCapacityKw; }

    public Integer getApproximatePanelCount() { return approximatePanelCount; }
    public void setApproximatePanelCount(Integer approximatePanelCount) { this.approximatePanelCount = approximatePanelCount; }

    public Double getEstimatedAnnualGenerationKwh() { return estimatedAnnualGenerationKwh; }
    public void setEstimatedAnnualGenerationKwh(Double estimatedAnnualGenerationKwh) { this.estimatedAnnualGenerationKwh = estimatedAnnualGenerationKwh; }

    public Double getEstimatedAnnualSavings() { return estimatedAnnualSavings; }
    public void setEstimatedAnnualSavings(Double estimatedAnnualSavings) { this.estimatedAnnualSavings = estimatedAnnualSavings; }

    public Double getEstimated25YearSavings() { return estimated25YearSavings; }
    public void setEstimated25YearSavings(Double estimated25YearSavings) { this.estimated25YearSavings = estimated25YearSavings; }

    public Double getPaybackPeriodYears() { return paybackPeriodYears; }
    public void setPaybackPeriodYears(Double paybackPeriodYears) { this.paybackPeriodYears = paybackPeriodYears; }

    public Double getEstimatedCo2OffsetTons() { return estimatedCo2OffsetTons; }
    public void setEstimatedCo2OffsetTons(Double estimatedCo2OffsetTons) { this.estimatedCo2OffsetTons = estimatedCo2OffsetTons; }

    public Integer getEquivalentTreesPlanted() { return equivalentTreesPlanted; }
    public void setEquivalentTreesPlanted(Integer equivalentTreesPlanted) { this.equivalentTreesPlanted = equivalentTreesPlanted; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}
