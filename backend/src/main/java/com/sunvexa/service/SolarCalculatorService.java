package com.sunvexa.service;

import com.sunvexa.dto.SolarCalculationRequest;
import com.sunvexa.dto.SolarCalculationResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class SolarCalculatorService {

    public SolarCalculationResponse calculateSolarEstimates(SolarCalculationRequest request) {
        double monthlyBill = request.getMonthlyElectricityBill();
        
        // Solar Estimations Logic
        // Avg commercial/residential tariff in India: ~₹8 per kWh
        double estimatedMonthlyKwh = monthlyBill / 8.0;
        double estimatedDailyKwh = estimatedMonthlyKwh / 30.0;

        // Peak Sun Hours (avg 4.5 to 5.0 hours daily in India)
        double recommendedKw = Math.ceil((estimatedDailyKwh / 4.5) * 10.0) / 10.0;
        recommendedKw = Math.max(1.0, recommendedKw);

        // Standard 550W Panel calculation
        int panelCount = (int) Math.ceil((recommendedKw * 1000.0) / 550.0);

        double annualGenKwh = recommendedKw * 4.5 * 365.0;
        double annualSavings = monthlyBill * 12.0 * 0.85; // 85% bill reduction
        double savings25Yr = annualSavings * 25.0 * 1.15; // factoring energy inflation

        double estimatedSystemCost = recommendedKw * 50000.0; // Approx ₹50k per kW installed
        double paybackPeriodYears = Math.round((estimatedSystemCost / annualSavings) * 10.0) / 10.0;

        double co2OffsetTons = Math.round((annualGenKwh * 0.82 / 1000.0) * 10.0) / 10.0;
        int treesEquivalent = (int) Math.round(co2OffsetTons * 15);

        SolarCalculationResponse response = new SolarCalculationResponse();
        response.setRecommendedSystemCapacityKw(recommendedKw);
        response.setApproximatePanelCount(panelCount);
        response.setEstimatedAnnualGenerationKwh(Math.round(annualGenKwh * 10.0) / 10.0);
        response.setEstimatedAnnualSavings(Math.round(annualSavings * 100.0) / 100.0);
        response.setEstimated25YearSavings(Math.round(savings25Yr * 100.0) / 100.0);
        response.setPaybackPeriodYears(paybackPeriodYears);
        response.setEstimatedCo2OffsetTons(co2OffsetTons);
        response.setEquivalentTreesPlanted(treesEquivalent);
        response.setDisclaimer("This result is an estimate for planning purposes. Actual system sizing, generation and savings depend on site conditions, electricity tariffs, equipment, shading, orientation and professional system design.");

        return response;
    }
}
