package com.sunvexa.service;

import com.sunvexa.dto.ProductDto;
import com.sunvexa.dto.SystemBuilderRequest;
import com.sunvexa.dto.SystemBuilderResponse;
import com.sunvexa.entity.Product;
import com.sunvexa.exception.BadRequestException;
import com.sunvexa.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class SolarSystemBuilderService {

    private final ProductRepository productRepository;
    private final ProductService productService;

    public SolarSystemBuilderService(ProductRepository productRepository, ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    public SystemBuilderResponse buildCustomSystem(SystemBuilderRequest request) {
        List<ProductDto> selectedComponents = new ArrayList<>();
        BigDecimal totalCost = BigDecimal.ZERO;
        double totalCapacityKw = 0.0;

        if (request.getPanelProductId() != null) {
            Product panel = productRepository.findById(request.getPanelProductId())
                    .orElseThrow(() -> new BadRequestException("Panel product not found: " + request.getPanelProductId()));
            selectedComponents.add(productService.convertToDto(panel));

            int panelQty = request.getPanelQuantity() != null ? request.getPanelQuantity() : 10;
            totalCost = totalCost.add(panel.getPrice().multiply(BigDecimal.valueOf(panelQty)));

            // Extract numeric wattage from e.g. "550W"
            try {
                String pStr = panel.getPower().replaceAll("[^0-9]", "");
                double panelWatts = Double.parseDouble(pStr);
                totalCapacityKw = (panelWatts * panelQty) / 1000.0;
            } catch (Exception e) {
                totalCapacityKw = (550.0 * panelQty) / 1000.0;
            }
        } else {
            totalCapacityKw = 5.5; // default 5.5 kW setup
        }

        if (request.getInverterProductId() != null) {
            Product inverter = productRepository.findById(request.getInverterProductId()).orElse(null);
            if (inverter != null) {
                selectedComponents.add(productService.convertToDto(inverter));
                totalCost = totalCost.add(inverter.getPrice());
            }
        }

        if (request.getBatteryProductId() != null) {
            Product battery = productRepository.findById(request.getBatteryProductId()).orElse(null);
            if (battery != null) {
                selectedComponents.add(productService.convertToDto(battery));
                totalCost = totalCost.add(battery.getPrice());
            }
        }

        if (request.getMountingProductId() != null) {
            Product mounting = productRepository.findById(request.getMountingProductId()).orElse(null);
            if (mounting != null) {
                selectedComponents.add(productService.convertToDto(mounting));
                totalCost = totalCost.add(mounting.getPrice());
            }
        }

        if (Boolean.TRUE.equals(request.getIncludeInstallation())) {
            totalCost = totalCost.add(new BigDecimal("25000.00"));
        }

        double annualGenKwh = totalCapacityKw * 4.5 * 365.0;
        BigDecimal annualSavings = BigDecimal.valueOf(annualGenKwh * 8.0);
        BigDecimal savings25Yr = annualSavings.multiply(BigDecimal.valueOf(25)).multiply(BigDecimal.valueOf(1.15));

        SystemBuilderResponse response = new SystemBuilderResponse();
        response.setSelectedComponents(selectedComponents);
        response.setSystemCapacityKw(Math.round(totalCapacityKw * 10.0) / 10.0);
        response.setEstimatedAnnualGenerationKwh(Math.round(annualGenKwh * 10.0) / 10.0);
        response.setEstimatedTotalCost(totalCost);
        response.setEstimated25YearSavings(savings25Yr);
        response.setCompatibilityNotice("Component compatibility depends on DISCOM grid regulations, inverter DC voltage thresholds, and site wiring specs. SUNVEXA engineers verify hardware compatibility prior to installation dispatch.");

        return response;
    }
}
