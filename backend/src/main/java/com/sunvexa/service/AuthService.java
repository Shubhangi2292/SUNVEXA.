package com.sunvexa.service;

import com.sunvexa.dto.AuthRequest;
import com.sunvexa.dto.AuthResponse;
import com.sunvexa.dto.RegisterRequest;
import com.sunvexa.dto.UserDto;
import com.sunvexa.entity.Cart;
import com.sunvexa.entity.Role;
import com.sunvexa.entity.User;
import com.sunvexa.exception.BadRequestException;
import com.sunvexa.repository.CartRepository;
import com.sunvexa.repository.UserRepository;
import com.sunvexa.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    public AuthService(UserRepository userRepository, CartRepository cartRepository,
                       PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider, UserService userService) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address is already in use. Please sign in instead.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CUSTOMER);
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPinCode(request.getPinCode());

        User savedUser = userRepository.save(user);

        // Create persistent cart for user
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);

        String token = tokenProvider.generateTokenFromEmail(savedUser.getEmail());
        return new AuthResponse(token, userService.convertToDto(savedUser));
    }

    public AuthResponse login(AuthRequest request) {
        if (!userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Account not found for email: " + request.getEmail() + ". Please register first.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = tokenProvider.generateToken(authentication);
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            return new AuthResponse(token, userService.convertToDto(user));
        } catch (AuthenticationException e) {
            throw new BadRequestException("Invalid password. Please check your password and try again.");
        }
    }
}
