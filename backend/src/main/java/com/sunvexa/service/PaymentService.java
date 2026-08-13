package com.sunvexa.service;

import com.sunvexa.dto.PaymentDto;
import com.sunvexa.dto.ProcessPaymentRequest;
import com.sunvexa.entity.Order;
import com.sunvexa.entity.OrderStatus;
import com.sunvexa.entity.Payment;
import com.sunvexa.entity.PaymentMethod;
import com.sunvexa.entity.PaymentStatus;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.OrderRepository;
import com.sunvexa.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public PaymentDto processDemoPayment(ProcessPaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + request.getOrderId()));

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(request.getAmount());
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        payment.setTransactionReference("DEMO-TXN-" + UUID_SHORT());

        Payment saved = paymentRepository.save(payment);

        order.setStatus(OrderStatus.PAYMENT_CONFIRMED);
        orderRepository.save(order);

        return convertToDto(saved);
    }

    private String UUID_SHORT() {
        return String.valueOf(System.currentTimeMillis() % 100000000);
    }

    public PaymentDto convertToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setOrderId(payment.getOrder().getId());
        dto.setAmount(payment.getAmount());
        dto.setStatus(payment.getStatus());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setTransactionReference(payment.getTransactionReference());
        dto.setCreatedAt(payment.getCreatedAt());
        return dto;
    }
}
