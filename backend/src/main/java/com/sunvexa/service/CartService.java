package com.sunvexa.service;

import com.sunvexa.dto.AddToCartRequest;
import com.sunvexa.dto.CartDto;
import com.sunvexa.dto.CartItemDto;
import com.sunvexa.entity.Cart;
import com.sunvexa.entity.CartItem;
import com.sunvexa.entity.Product;
import com.sunvexa.entity.User;
import com.sunvexa.exception.BadRequestException;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.CartItemRepository;
import com.sunvexa.repository.CartRepository;
import com.sunvexa.repository.ProductRepository;
import com.sunvexa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductService productService;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository,
                       ProductRepository productRepository, UserRepository userRepository,
                       ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productService = productService;
    }

    public Cart getOrCreateCartForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional(readOnly = true)
    public CartDto getCartDtoForUser(String email) {
        Cart cart = getOrCreateCartForUser(email);
        return convertToDto(cart);
    }

    @Transactional
    public CartDto addItemToCart(String email, AddToCartRequest request) {
        Cart cart = getOrCreateCartForUser(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + request.getProductId()));

        if (!product.getActive()) {
            throw new BadRequestException("Product is currently unavailable.");
        }

        if (request.getQuantity() > product.getStockQuantity()) {
            throw new BadRequestException("Requested quantity exceeds available stock (" + product.getStockQuantity() + ").");
        }

        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId());

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            if (newQuantity > product.getStockQuantity()) {
                throw new BadRequestException("Total cart quantity exceeds available stock.");
            }
            existingItem.setQuantity(newQuantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            newItem.setPriceAtAddition(product.getPrice());
            cartItemRepository.save(newItem);
        }

        return getCartDtoForUser(email);
    }

    @Transactional
    public CartDto updateCartItemQuantity(String email, Long itemId, Integer quantity) {
        Cart cart = getOrCreateCartForUser(email);
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + itemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Unauthorized access to cart item.");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            if (quantity > cartItem.getProduct().getStockQuantity()) {
                throw new BadRequestException("Quantity exceeds available stock.");
            }
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }

        return getCartDtoForUser(email);
    }

    @Transactional
    public CartDto removeCartItem(String email, Long itemId) {
        Cart cart = getOrCreateCartForUser(email);
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + itemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Unauthorized access to cart item.");
        }

        cartItemRepository.delete(cartItem);
        return getCartDtoForUser(email);
    }

    @Transactional
    public void clearCart(String email) {
        Cart cart = getOrCreateCartForUser(email);
        cartItemRepository.deleteByCartId(cart.getId());
    }

    public CartDto convertToDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUser() != null ? cart.getUser().getId() : null);

        List<CartItemDto> itemDtos = cart.getItems().stream().map(item -> {
            CartItemDto itemDto = new CartItemDto();
            itemDto.setId(item.getId());
            itemDto.setProduct(productService.convertToDto(item.getProduct()));
            itemDto.setQuantity(item.getQuantity());
            itemDto.setPriceAtAddition(item.getPriceAtAddition());
            itemDto.setItemSubtotal(item.getPriceAtAddition().multiply(BigDecimal.valueOf(item.getQuantity())));
            return itemDto;
        }).collect(Collectors.toList());

        dto.setItems(itemDtos);

        BigDecimal subtotal = itemDtos.stream()
                .map(CartItemDto::getItemSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = itemDtos.stream()
                .mapToInt(CartItemDto::getQuantity)
                .sum();

        dto.setSubtotal(subtotal);
        dto.setTotalItems(totalItems);

        return dto;
    }
}
