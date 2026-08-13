package com.sunvexa.controller;

import com.sunvexa.dto.AddToCartRequest;
import com.sunvexa.dto.CartDto;
import com.sunvexa.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartDto> getCart(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "guest@sunvexa.com";
        CartDto cart = cartService.getCartDtoForUser(email);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/items")
    public ResponseEntity<CartDto> addItemToCart(Authentication authentication, @Valid @RequestBody AddToCartRequest request) {
        String email = authentication != null ? authentication.getName() : "guest@sunvexa.com";
        CartDto updatedCart = cartService.addItemToCart(email, request);
        return ResponseEntity.ok(updatedCart);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartDto> updateCartItemQuantity(Authentication authentication,
                                                          @PathVariable Long itemId,
                                                          @RequestParam Integer quantity) {
        String email = authentication != null ? authentication.getName() : "guest@sunvexa.com";
        CartDto updatedCart = cartService.updateCartItemQuantity(email, itemId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartDto> removeCartItem(Authentication authentication, @PathVariable Long itemId) {
        String email = authentication != null ? authentication.getName() : "guest@sunvexa.com";
        CartDto updatedCart = cartService.removeCartItem(email, itemId);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "guest@sunvexa.com";
        cartService.clearCart(email);
        return ResponseEntity.noContent().build();
    }
}
