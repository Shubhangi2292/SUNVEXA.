package com.sunvexa.dto;

import java.util.List;

public class CopilotResponse {

    private String reply;
    private List<ProductDto> suggestedProducts;
    private String recommendedAction; // e.g., CALCULATE_SAVINGS, BUILD_SYSTEM, REQUEST_QUOTE
    private Boolean isSimulated = true;

    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }

    public List<ProductDto> getSuggestedProducts() { return suggestedProducts; }
    public void setSuggestedProducts(List<ProductDto> suggestedProducts) { this.suggestedProducts = suggestedProducts; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }

    public Boolean getIsSimulated() { return isSimulated; }
    public void setIsSimulated(Boolean isSimulated) { this.isSimulated = isSimulated; }
}
