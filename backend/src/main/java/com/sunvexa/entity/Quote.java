package com.sunvexa.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "quotes")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(name = "property_type", nullable = false)
    private String propertyType;

    private String location;

    @Column(name = "monthly_electricity_bill")
    private String monthlyElectricityBill;

    @Column(name = "roof_area")
    private String roofArea;

    @Column(name = "preferred_system_size")
    private String preferredSystemSize;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuoteStatus status = QuoteStatus.NEW;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMonthlyElectricityBill() { return monthlyElectricityBill; }
    public void setMonthlyElectricityBill(String monthlyElectricityBill) { this.monthlyElectricityBill = monthlyElectricityBill; }

    public String getRoofArea() { return roofArea; }
    public void setRoofArea(String roofArea) { this.roofArea = roofArea; }

    public String getPreferredSystemSize() { return preferredSystemSize; }
    public void setPreferredSystemSize(String preferredSystemSize) { this.preferredSystemSize = preferredSystemSize; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public QuoteStatus getStatus() { return status; }
    public void setStatus(QuoteStatus status) { this.status = status; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
}
