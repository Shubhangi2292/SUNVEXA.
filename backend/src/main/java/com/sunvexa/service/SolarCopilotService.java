package com.sunvexa.service;

import com.sunvexa.dto.CopilotRequest;
import com.sunvexa.dto.CopilotResponse;
import com.sunvexa.dto.ProductDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SolarCopilotService {

    private final ProductService productService;

    public SolarCopilotService(ProductService productService) {
        this.productService = productService;
    }

    public CopilotResponse processCopilotChat(CopilotRequest request) {
        String msg = request.getMessage().toLowerCase();
        CopilotResponse response = new CopilotResponse();
        List<ProductDto> products = productService.getAllActiveProducts();
        List<ProductDto> suggested = new ArrayList<>();

        if (msg.contains("bill") || msg.contains("cost") || msg.contains("save") || msg.contains("price")) {
            response.setReply("For an average monthly electricity bill of ₹5,000 to ₹15,000, a SUNVEXA 5.5 kW rooftop system featuring 10x Apex 550W Monocrystalline panels offsets ~85% of your grid bill with an estimated payback of 4.8 years.");
            response.setRecommendedAction("CALCULATE_SAVINGS");
            if (!products.isEmpty()) suggested.add(products.get(0));
        } else if (msg.contains("battery") || msg.contains("backup") || msg.contains("outage") || msg.contains("night")) {
            response.setReply("If you experience grid outages or want 100% self-sufficiency at night, we recommend pairing your rooftop panels with the SUNVEXA WallVault 10.2kWh LiFePO4 battery bank with 6,000+ cycle warranty.");
            response.setRecommendedAction("BUILD_SYSTEM");
            products.stream().filter(p -> p.getCategory().name().equals("BATTERY")).findFirst().ifPresent(suggested::add);
        } else if (msg.contains("inverter") || msg.contains("hybrid") || msg.contains("mppt")) {
            response.setReply("SUNVEXA SmartGrid 6kW Hybrid Inverter features dual MPPT tracking, pure sine wave output, and integrated Wi-Fi app monitoring for seamless net metering.");
            response.setRecommendedAction("VIEW_PRODUCTS");
            products.stream().filter(p -> p.getCategory().name().equals("INVERTER")).findFirst().ifPresent(suggested::add);
        } else {
            response.setReply("Welcome to SUNVEXA AI Solar Copilot! I can analyze your rooftop solar potential, recommend optimal panel wattage, estimate 25-year financial savings, or assist with turnkey installation details.");
            response.setRecommendedAction("REQUEST_QUOTE");
            if (products.size() > 1) {
                suggested.add(products.get(0));
                suggested.add(products.get(1));
            }
        }

        response.setSuggestedProducts(suggested);
        response.setIsSimulated(true);

        return response;
    }
}
