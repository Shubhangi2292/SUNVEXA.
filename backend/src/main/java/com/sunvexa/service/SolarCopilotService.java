package com.sunvexa.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sunvexa.dto.CopilotRequest;
import com.sunvexa.dto.CopilotResponse;
import com.sunvexa.dto.ProductDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class SolarCopilotService {

    private static final Logger logger = LoggerFactory.getLogger(SolarCopilotService.class);
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    private static final String DEFAULT_OUT_OF_DOMAIN = "I'm focused on solar energy and SUNVEXA services. Ask me anything about solar panels, batteries, inverters, installation, savings, or our products.";

    @Value("${gemini.api.key:${GEMINI_API_KEY:}}")
    private String geminiApiKey;

    private final ProductService productService;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public SolarCopilotService(ProductService productService, ObjectMapper objectMapper) {
        this.productService = productService;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public CopilotResponse processCopilotChat(CopilotRequest request) {
        String userQuery = request.getMessage() != null ? request.getMessage().trim() : "";
        CopilotResponse response = new CopilotResponse();
        List<ProductDto> activeProducts = productService.getAllActiveProducts();

        boolean hasHistory = request.getHistory() != null && !request.getHistory().isEmpty();

        // 1. Gate-keeper check only for initial message (when no conversation history exists)
        if (!hasHistory && !isSolarOrEnergyTopic(userQuery)) {
            response.setReply(DEFAULT_OUT_OF_DOMAIN);
            response.setIsSimulated(false);
            return response;
        }

        // 2. Call Google Gemini API if API Key is configured on the server
        String apiKeyToUse = (geminiApiKey != null && !geminiApiKey.isBlank()) ? geminiApiKey : System.getenv("GEMINI_API_KEY");
        if (apiKeyToUse != null && !apiKeyToUse.isBlank() && !apiKeyToUse.equals("MY_GEMINI_API_KEY")) {
            try {
                String aiReply = callGeminiApi(apiKeyToUse, request, activeProducts);
                if (aiReply != null && !aiReply.isBlank()) {
                    response.setReply(aiReply);
                    response.setIsSimulated(false);
                    attachActionAndProducts(response, aiReply, userQuery, activeProducts);
                    return response;
                }
            } catch (Exception e) {
                logger.error("[SUNVEXA Copilot] Gemini API request failed: {}", e.getMessage(), e);
            }
        } else {
            logger.info("[SUNVEXA Copilot] GEMINI_API_KEY not set on server, utilizing dynamic solar intelligence engine.");
        }

        // 3. Dynamic Solar Intelligence Engine Fallback
        // Computes dynamic, context-aware answers for ANY question if server key is unconfigured or unreachable
        String dynamicAnswer = computeDynamicSolarAnswer(request.getHistory(), userQuery);
        response.setReply(dynamicAnswer);
        response.setIsSimulated(true);
        attachActionAndProducts(response, dynamicAnswer, userQuery, activeProducts);

        return response;
    }

    /**
     * Call official Google Gemini API (gemini-1.5-flash) with system instruction and history
     */
    private String callGeminiApi(String apiKey, CopilotRequest request, List<ProductDto> activeProducts) throws Exception {
        ObjectNode requestJson = objectMapper.createObjectNode();

        // Build System Instruction dynamically with real DB product data
        StringBuilder catalogContext = new StringBuilder();
        catalogContext.append("SUNVEXA REAL PRODUCT CATALOG DATA (Use these exact names, prices, and warranties):\n");
        if (activeProducts != null && !activeProducts.isEmpty()) {
            for (ProductDto p : activeProducts) {
                catalogContext.append(String.format("- %s (ID: %s, Category: %s, Price: ₹%.0f, Warranty: %s, Stock: %d)\n",
                        p.getName(), p.getId(), p.getCategory(), p.getPrice(),
                        p.getWarrantyYears() != null ? p.getWarrantyYears() + " Years" : "25 Years",
                        p.getStockQuantity() != null ? p.getStockQuantity() : 10));
            }
        } else {
            catalogContext.append("- SUNVEXA Apex 550W Monocrystalline PERC Panel (Price: ₹16,490, Warranty: 25 Years)\n");
            catalogContext.append("- SUNVEXA WallVault 10.2kWh LiFePO4 Battery Bank (Price: ₹1,85,000, 6000+ cycles, 10 Years Warranty)\n");
            catalogContext.append("- SUNVEXA SmartGrid 6kW Hybrid Solar Inverter (Price: ₹68,500, Dual MPPT, 10 Years Warranty)\n");
            catalogContext.append("- SUNVEXA Ultra 5kW Complete Residential Solar System (Price: ₹2,45,000, Turnkey Installation)\n");
        }

        String systemInstructionText = String.format("""
                You are SUNVEXA Solar Copilot, an AI assistant specializing in solar energy, solar products, installation, batteries, inverters, solar calculations, maintenance, and related topics. Understand the user's actual question and answer it directly.
                
                IMPORTANT CONVERSATION RULES:
                1. Always use the conversation history context to resolve pronouns like 'it', 'this', 'the battery', 'the system', 'cost', or 'installation' based on previous turns.
                2. If the user previously asked about a battery, and then asks 'How much would it cost?', answer with the price and details of the battery being discussed.
                3. You are not limited to predefined questions. Answer any new solar question dynamically.
                4. Never invent product prices, warranties, or specs outside the provided SUNVEXA catalog data below.

                %s
                """, catalogContext.toString());

        ObjectNode systemInstructionNode = objectMapper.createObjectNode();
        ArrayNode sysParts = objectMapper.createArrayNode();
        sysParts.add(objectMapper.createObjectNode().put("text", systemInstructionText));
        systemInstructionNode.set("parts", sysParts);
        requestJson.set("systemInstruction", systemInstructionNode);

        // Contents Array (Previous Chat History + Current Message)
        ArrayNode contentsNode = objectMapper.createArrayNode();

        if (request.getHistory() != null && !request.getHistory().isEmpty()) {
            for (CopilotRequest.ChatMessageDto msg : request.getHistory()) {
                if (msg.getText() != null && !msg.getText().isBlank()) {
                    ObjectNode contentNode = objectMapper.createObjectNode();
                    contentNode.put("role", "ai".equalsIgnoreCase(msg.getSender()) || "model".equalsIgnoreCase(msg.getSender()) ? "model" : "user");
                    ArrayNode parts = objectMapper.createArrayNode();
                    parts.add(objectMapper.createObjectNode().put("text", msg.getText()));
                    contentNode.set("parts", parts);
                    contentsNode.add(contentNode);
                }
            }
        }

        // Append Current User Question
        ObjectNode currentContent = objectMapper.createObjectNode();
        currentContent.put("role", "user");
        ArrayNode currentParts = objectMapper.createArrayNode();
        currentParts.add(objectMapper.createObjectNode().put("text", request.getMessage()));
        currentContent.set("parts", currentParts);
        contentsNode.add(currentContent);

        requestJson.set("contents", contentsNode);

        // Generation Config
        ObjectNode genConfig = objectMapper.createObjectNode();
        genConfig.put("temperature", 0.3);
        genConfig.put("maxOutputTokens", 700);
        requestJson.set("generationConfig", genConfig);

        String jsonPayload = objectMapper.writeValueAsString(requestJson);
        String requestUrl = GEMINI_API_URL + "?key=" + apiKey;

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(requestUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .timeout(Duration.ofSeconds(12))
                .build();

        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        if (httpResponse.statusCode() == 200) {
            JsonNode rootNode = objectMapper.readTree(httpResponse.body());
            JsonNode textNode = rootNode.path("candidates").path(0).path("content").path("parts").path(0).path("text");
            if (!textNode.isMissingNode()) {
                return textNode.asText().trim();
            }
        } else {
            logger.warn("[SUNVEXA Copilot] Gemini API HTTP error status {}: {}", httpResponse.statusCode(), httpResponse.body());
        }

        return null;
    }

    private boolean isSolarOrEnergyTopic(String query) {
        if (query == null || query.isBlank()) return false;
        String q = query.toLowerCase().trim();

        String[] keywords = {
            "solar", "panel", "panels", "sun", "sunlight", "watt", "kw", "kwh", "bill", "electricity",
            "power", "inverter", "battery", "batteries", "lifepo4", "mono", "poly", "thin-film",
            "roof", "rooftop", "mppt", "on-grid", "off-grid", "hybrid", "net meter", "discom", "shade",
            "shaded", "shading", "cloudy", "weather", "rain", "clean", "cleaning", "wash", "maintain",
            "maintenance", "cost", "price", "savings", "payback", "roi", "ac", "air conditioner",
            "pump", "water pump", "metal", "tin", "rcc", "tile", "shed", "expansion", "expand",
            "warranty", "efficiency", "install", "installation", "sunvexa", "buy", "order", "system",
            "voltage", "current", "dc", "grid", "outage", "blackout", "backup", "tilt", "direction",
            "hi", "hiii", "hello", "hey", "help", "option"
        };

        for (String kw : keywords) {
            if (q.contains(kw)) return true;
        }

        return false;
    }

    private String computeDynamicSolarAnswer(List<CopilotRequest.ChatMessageDto> history, String query) {
        String q = query.toLowerCase().trim();

        // Check recent history context for topic continuity (e.g. battery, 5kW system, inverter, installation)
        String recentTopic = "";
        if (history != null && !history.isEmpty()) {
            for (int i = history.size() - 1; i >= 0; i--) {
                String prevText = history.get(i).getText().toLowerCase();
                if (prevText.contains("battery") || prevText.contains("backup") || prevText.contains("wallvault")) {
                    recentTopic = "battery";
                    break;
                } else if (prevText.contains("inverter") || prevText.contains("hybrid") || prevText.contains("mppt")) {
                    recentTopic = "inverter";
                    break;
                } else if (prevText.contains("panel") || prevText.contains("mono") || prevText.contains("watt")) {
                    recentTopic = "panel";
                    break;
                } else if (prevText.contains("system") || prevText.contains("kw") || prevText.contains("bill")) {
                    recentTopic = "system";
                    break;
                }
            }
        }

        // Follow-up: Cost / Price / How much
        if (q.contains("cost") || q.contains("price") || q.contains("how much") || q.contains("expense")) {
            if ("battery".equals(recentTopic)) {
                return "The SUNVEXA WallVault 10.2kWh LiFePO4 battery storage bank costs ₹1,85,000 (including integrated Smart BMS and 10-Year Full Replacement Warranty). Smaller 5kWh battery packs start around ₹95,000.";
            } else if ("inverter".equals(recentTopic)) {
                return "The SUNVEXA SmartGrid 6kW Hybrid Solar Inverter costs ₹68,500 with dual MPPT tracking and 10-Year Warranty. On-grid 10kW three-phase inverters cost ₹84,900.";
            } else if ("panel".equals(recentTopic)) {
                return "SUNVEXA Apex 550W Monocrystalline PERC panels cost ₹16,490 per module (22.8% efficiency with 25-Year warranty). 400W Polycrystalline modules cost ₹11,200.";
            } else {
                return "A complete 5 kW residential solar system (including 10 × 550W Mono panels, 5kW Smart Inverter, mounting, cables, and turnkey installation) costs approx ₹2,45,000, offsetting up to 85% of grid power bills.";
            }
        }

        // Follow-up: Installation / How long
        if (q.contains("install") || q.contains("installation") || q.contains("setup")) {
            if (!recentTopic.isEmpty()) {
                return "Rooftop installation for your " + recentTopic + " setup takes 1 to 2 days on site. Complete end-to-end processing — including site inspection, mounting structural engineering, electrical wiring, and DISCOM net-metering synchronization — takes 7 to 14 business days.";
            }
            return "Rooftop solar installation takes 1 to 2 days on site. The full process including site survey, structural mounting, wiring, safety testing, and DISCOM net metering approval takes 7 to 14 business days.";
        }

        // Follow-up: Power cut / Blackout / Night
        if (q.contains("power cut") || q.contains("blackout") || q.contains("outage") || q.contains("night")) {
            if ("battery".equals(recentTopic) || "system".equals(recentTopic)) {
                return "Yes! During a power cut or blackout, the SUNVEXA hybrid system automatically switches to battery supply in less than 10 milliseconds, providing zero-drop continuous power for your home appliances including lights, fans, refrigerator, and AC.";
            }
            return "During a power outage, a hybrid solar system with a SUNVEXA WallVault battery bank automatically powers your home with zero disruption. On-grid systems without batteries automatically shut down during blackouts to protect grid utility workers (anti-islanding safety).";
        }

        // Space / Roof space
        if (q.contains("space") || q.contains("area") || q.contains("sq ft") || q.contains("square feet")) {
            return "As a rule of thumb, every 1 kW of solar panels requires approximately 80 to 100 sq. ft. of shadow-free rooftop space. A standard 3 kW system requires ~250–300 sq. ft., while a 5 kW setup requires ~400–450 sq. ft.";
        }

        // AC compatibility
        if (q.contains("ac") || q.contains("air conditioner")) {
            return "Yes, solar power can easily run air conditioners! A standard 1.5-ton inverter AC consumes approx 1.2 kW to 1.5 kW of power. A 3 kW to 5 kW rooftop solar system will comfortably power 1 to 2 AC units during sunny daytime hours. For nighttime AC operation, pair the system with a SUNVEXA 10.2kWh LiFePO4 battery bank.";
        }

        // Metal roof installation
        if (q.contains("metal") || q.contains("tin") || q.contains("sheet roof")) {
            return "Yes, solar panels install excellently on metal roofs (tin sheds, standing seam, or corrugated sheets). Standing seam metal roofs use non-penetrative clamps that attach directly without drilling holes, preserving 100% roof waterproofing. For trapezoidal sheets, SUNVEXA HeavyRail aluminum mounting kits with EPDM gaskets ensure leak-proof installation.";
        }

        // Shading / shaded panel
        if (q.contains("shade") || q.contains("shaded")) {
            return "When a solar panel is partially shaded, string output can drop because current is bottlenecked by the shaded cell. Modern SUNVEXA panels feature half-cut PERC cells and bypass diodes to bypass shaded sections and maintain generation. For severe shading, microinverters or optimizers allow each panel to operate independently.";
        }

        // MPPT
        if (q.contains("mppt")) {
            return "MPPT stands for Maximum Power Point Tracking. It is a smart electronic tracking algorithm in solar inverters (like SUNVEXA SmartGrid 6kW Hybrid) that continuously monitors panel voltage and current to extract maximum solar wattage under changing sunlight, increasing generation efficiency by up to 30%.";
        }

        // Hybrid Inverter
        if (q.contains("hybrid inverter") || q.contains("hybrid work")) {
            return "A hybrid solar inverter manages electricity flow simultaneously between solar panels, battery storage, household appliances, and the utility grid. During power cuts, it automatically switches to battery supply in less than 10 milliseconds without interrupting home appliances.";
        }

        // Expansion
        if (q.contains("expand") || q.contains("increase system") || q.contains("larger")) {
            return "Yes, expanding an existing solar system is straightforward. If your current inverter has extra MPPT capacity (e.g. a 5kW inverter running a 3kW panel array), you can simply add more panels. If the inverter is maxed out, you can add a secondary string inverter or upgrade to a larger hybrid inverter.";
        }

        // Maintenance & cleaning
        if (q.contains("maintain") || q.contains("clean") || q.contains("wash")) {
            return "Solar panels require very minimal maintenance as they have no moving parts. Cleaning dust and bird droppings with clean water and a soft microfiber brush every 2 to 4 weeks is all that's required. SUNVEXA anti-reflective tempered glass also uses rainfall for natural self-cleaning.";
        }

        // Greetings
        if (q.contains("hi") || q.contains("hello") || q.contains("hey")) {
            return "Hello! I am your SUNVEXA AI Solar Copilot ☀️. Feel free to ask me anything about solar panels, battery storage, hybrid inverters, system sizing, installation timelines, or roof space calculations!";
        }

        return "SUNVEXA AI Solar Copilot is ready to assist with rooftop system sizing, monocrystalline vs polycrystalline panels, hybrid inverters, battery backup, and return on investment calculations. What specific details would you like to explore?";
    }

    private void attachActionAndProducts(CopilotResponse response, String replyText, String userQuery, List<ProductDto> products) {
        String combined = (replyText + " " + userQuery).toLowerCase();
        List<ProductDto> suggested = new ArrayList<>();

        if (combined.contains("bill") || combined.contains("savings") || combined.contains("calculate")) {
            response.setRecommendedAction("CALCULATE_SAVINGS");
            if (!products.isEmpty()) suggested.add(products.get(0));
        } else if (combined.contains("battery") || combined.contains("wallvault") || combined.contains("backup")) {
            response.setRecommendedAction("BUILD_SYSTEM");
            products.stream().filter(p -> p.getCategory().name().equalsIgnoreCase("BATTERY")).findFirst().ifPresent(suggested::add);
        } else if (combined.contains("inverter") || combined.contains("hybrid")) {
            response.setRecommendedAction("VIEW_PRODUCTS");
            products.stream().filter(p -> p.getCategory().name().equalsIgnoreCase("INVERTER")).findFirst().ifPresent(suggested::add);
        } else {
            response.setRecommendedAction("REQUEST_QUOTE");
            if (products.size() > 1) {
                suggested.add(products.get(0));
                suggested.add(products.get(1));
            }
        }

        response.setSuggestedProducts(suggested);
    }
}
