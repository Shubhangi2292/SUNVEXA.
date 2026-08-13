package com.sunvexa.service;

import com.sunvexa.dto.CreateOrderRequest;
import com.sunvexa.dto.InstallationDto;
import com.sunvexa.dto.OrderDto;
import com.sunvexa.dto.OrderItemDto;
import com.sunvexa.entity.*;
import com.sunvexa.exception.BadRequestException;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final InstallationRepository installationRepository;
    private final PaymentRepository paymentRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository,
                        UserRepository userRepository, CartRepository cartRepository,
                        CartItemRepository cartItemRepository, InstallationRepository installationRepository,
                        PaymentRepository paymentRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.installationRepository = installationRepository;
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public OrderDto createOrder(String userEmail, CreateOrderRequest request) {
        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber("SNR-" + System.currentTimeMillis() % 1000000);
        order.setStatus(OrderStatus.PAYMENT_CONFIRMED);
        order.setShippingAddress(request.getShippingAddress());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setPinCode(request.getPinCode());

        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        if (request.getProductId() != null) {
            // Direct Buy Now Flow
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + request.getProductId()));

            int qty = request.getQuantity() != null ? request.getQuantity() : 1;
            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(qty));
            subtotal = subtotal.add(itemTotal);

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setProductNameSnapshot(product.getName());
            item.setQuantity(qty);
            item.setPrice(product.getPrice());
            item.setSubtotal(itemTotal);
            orderItems.add(item);
        } else if (user != null) {
            // Cart Checkout Flow
            Cart cart = cartRepository.findByUser(user)
                    .orElseThrow(() -> new BadRequestException("User has no active cart."));

            if (cart.getItems().isEmpty()) {
                throw new BadRequestException("Cart is empty.");
            }

            for (CartItem cartItem : cart.getItems()) {
                BigDecimal itemTotal = cartItem.getPriceAtAddition().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
                subtotal = subtotal.add(itemTotal);

                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProduct(cartItem.getProduct());
                item.setProductNameSnapshot(cartItem.getProduct().getName());
                item.setQuantity(cartItem.getQuantity());
                item.setPrice(cartItem.getPriceAtAddition());
                item.setSubtotal(itemTotal);
                orderItems.add(item);
            }

            // Clear user cart after checkout
            cartItemRepository.deleteByCartId(cart.getId());
        } else {
            throw new BadRequestException("Order must contain a product or belong to an authenticated cart.");
        }

        BigDecimal deliveryCharge = BigDecimal.ZERO;
        BigDecimal installationCharge = Boolean.TRUE.equals(request.getInstallationRequired()) ? new BigDecimal("25000.00") : BigDecimal.ZERO;
        BigDecimal gstAmount = subtotal.add(installationCharge).multiply(new BigDecimal("0.12")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalAmount = subtotal.add(deliveryCharge).add(installationCharge).add(gstAmount);

        order.setSubtotal(subtotal);
        order.setDeliveryCharge(deliveryCharge);
        order.setInstallationCharge(installationCharge);
        order.setGstAmount(gstAmount);
        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // Record installation
        Installation installation = new Installation();
        installation.setOrder(savedOrder);
        installation.setInstallationRequired(Boolean.TRUE.equals(request.getInstallationRequired()));
        installation.setInstallationAddress(request.getInstallationAddress() != null ? request.getInstallationAddress() : request.getShippingAddress());
        installation.setPreferredDate(request.getPreferredDate());
        installation.setPreferredTime(request.getPreferredTime());
        installation.setNotes(request.getInstallationNotes());
        installation.setStatus(Boolean.TRUE.equals(request.getInstallationRequired()) ? InstallationStatus.SCHEDULED : InstallationStatus.NOT_REQUIRED);
        installationRepository.save(installation);
        savedOrder.setInstallation(installation);

        // Record initial payment
        Payment payment = new Payment();
        payment.setOrder(savedOrder);
        payment.setAmount(totalAmount);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        payment.setTransactionReference("DEMO-TXN-" + System.currentTimeMillis());
        paymentRepository.save(payment);

        return convertToDto(savedOrder);
    }

    public List<OrderDto> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OrderDto getOrderByIdOrNumber(String idOrNumber, String userEmail) {
        Optional<Order> orderOpt;
        if (idOrNumber.startsWith("SNR-")) {
            orderOpt = orderRepository.findByOrderNumber(idOrNumber);
        } else {
            try {
                Long id = Long.parseLong(idOrNumber);
                orderOpt = orderRepository.findById(id);
            } catch (NumberFormatException e) {
                orderOpt = orderRepository.findByOrderNumber(idOrNumber);
            }
        }

        Order order = orderOpt.orElseThrow(() -> new ResourceNotFoundException("Order not found: " + idOrNumber));

        return convertToDto(order);
    }

    public Map<String, Object> getOrderTracking(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with number: " + orderNumber));

        Map<String, Object> tracking = new HashMap<>();
        tracking.put("orderNumber", order.getOrderNumber());
        tracking.put("status", order.getStatus());

        List<Map<String, Object>> steps = new ArrayList<>();

        steps.add(Map.of("step", "Order Confirmed", "completed", true));
        steps.add(Map.of("step", "Payment Confirmed", "completed", true));
        steps.add(Map.of("step", "Preparing Order", "completed", order.getStatus() != OrderStatus.PENDING_PAYMENT));
        steps.add(Map.of("step", "Dispatched", "completed", order.getStatus() == OrderStatus.DISPATCHED || order.getStatus() == OrderStatus.INSTALLATION_SCHEDULED || order.getStatus() == OrderStatus.COMPLETED));
        steps.add(Map.of("step", "Installation Scheduled", "completed", order.getStatus() == OrderStatus.INSTALLATION_SCHEDULED || order.getStatus() == OrderStatus.COMPLETED));
        steps.add(Map.of("step", "Installation Completed", "completed", order.getStatus() == OrderStatus.COMPLETED));

        tracking.put("timeline", steps);
        if (order.getInstallation() != null) {
            tracking.put("installationDate", order.getInstallation().getPreferredDate());
            tracking.put("installationTime", order.getInstallation().getPreferredTime());
        }
        return tracking;
    }

    public List<OrderDto> getAllOrdersForAdmin() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));
        order.setStatus(status);
        Order updated = orderRepository.save(order);
        return convertToDto(updated);
    }

    public OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setStatus(order.getStatus());
        dto.setSubtotal(order.getSubtotal());
        dto.setDeliveryCharge(order.getDeliveryCharge());
        dto.setInstallationCharge(order.getInstallationCharge());
        dto.setGstAmount(order.getGstAmount());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setCity(order.getCity());
        dto.setState(order.getState());
        dto.setPinCode(order.getPinCode());
        dto.setCreatedAt(order.getCreatedAt());

        if (order.getItems() != null) {
            List<OrderItemDto> itemDtos = order.getItems().stream().map(item -> {
                OrderItemDto itemDto = new OrderItemDto();
                itemDto.setId(item.getId());
                itemDto.setProductId(item.getProduct() != null ? item.getProduct().getId() : null);
                itemDto.setProductNameSnapshot(item.getProductNameSnapshot());
                itemDto.setQuantity(item.getQuantity());
                itemDto.setPrice(item.getPrice());
                itemDto.setSubtotal(item.getSubtotal());
                return itemDto;
            }).collect(Collectors.toList());
            dto.setItems(itemDtos);
        }

        if (order.getInstallation() != null) {
            Installation inst = order.getInstallation();
            InstallationDto instDto = new InstallationDto();
            instDto.setId(inst.getId());
            instDto.setOrderId(order.getId());
            instDto.setInstallationRequired(inst.getInstallationRequired());
            instDto.setInstallationAddress(inst.getInstallationAddress());
            instDto.setPreferredDate(inst.getPreferredDate());
            instDto.setPreferredTime(inst.getPreferredTime());
            instDto.setStatus(inst.getStatus());
            instDto.setNotes(inst.getNotes());
            dto.setInstallation(instDto);
        }

        return dto;
    }
}
