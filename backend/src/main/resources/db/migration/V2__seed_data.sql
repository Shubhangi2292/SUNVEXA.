-- SUNVEXA Seed Data (Flyway V2 Migration)

-- Admin & Customer Accounts (BCrypt encoded password 'password123')
INSERT INTO users (full_name, email, phone, password_hash, role, address, city, state, pin_code)
VALUES 
('SUNVEXA Admin', 'admin@sunvexa.com', '+1 (800) 555-SUNVEXA', '$2a$10$7R.x6wFpD2w7l.YkX1zDzeS4Yt5Q4M3L2K1J0I9H8G7F6E5D4C3B2', 'ADMIN', 'Palo Alto Headquarters', 'Palo Alto', 'California', '94301'),
('Rajesh Sharma', 'rajesh.sharma@example.com', '+91 98765 43210', '$2a$10$7R.x6wFpD2w7l.YkX1zDzeS4Yt5Q4M3L2K1J0I9H8G7F6E5D4C3B2', 'CUSTOMER', 'Flat 402, Green Valley', 'Mumbai', 'Maharashtra', '400001')
ON CONFLICT (email) DO NOTHING;

-- SUNVEXA SOLAR PRODUCTS CATALOG (Demo Inventory)
INSERT INTO products (name, category, description, price, stock_quantity, power, efficiency, warranty_years, product_type, image_url, badge, active)
VALUES
('SUNVEXA Apex 550W Monocrystalline PERC Panel', 'SOLAR_PANEL', 'Tier-1 ultra-high efficiency monocrystalline PERC solar panel engineered with anti-reflective glass for maximum yield under diffuse sunlight conditions.', 18500.00, 100, '550W', '22.8%', 25, 'Monocrystalline', '/assets/panels/monocrystalline.png', 'Best Seller', true),

('SUNVEXA UltraSolar 530W Polycrystalline Panel', 'SOLAR_PANEL', 'Heavy-duty cost-efficient polycrystalline solar panel designed for high-ambient thermal tolerance and harsh weather resistance.', 14200.00, 80, '530W', '20.4%', 25, 'Polycrystalline', '/assets/panels/polycrystalline.png', 'High Value', true),

('SUNVEXA SmartGrid 6kW Hybrid Solar Inverter', 'SOLAR_PANEL', 'Pure sine wave hybrid inverter with dual MPPT trackers, Wi-Fi real-time monitoring, and automatic grid-interactive transfer.', 48900.00, 45, '6000W', '98.2%', 10, 'Inverter', 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?q=80&w=800&auto=format&fit=crop', 'Smart Grid', true),

('SUNVEXA WallVault 10.2kWh LiFePO4 Battery Bank', 'BATTERY', 'Modular Lithium Iron Phosphate (LiFePO4) home battery storage with 6,000+ lifecycle guarantees and integrated Battery Management System (BMS).', 145000.00, 30, '10.2 kWh', '95.5%', 10, 'Battery', 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop', 'Next-Gen Storage', true),

('SUNVEXA RoofMount Pro Aluminum Railing System', 'MOUNTING_SYSTEM', 'Anodized corrosion-resistant aluminum rooftop racking kit engineered for wind speeds up to 180 km/h.', 12500.00, 150, 'Universal', 'N/A', 15, 'Mounting System', 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop', 'Weatherproof', true),

('SUNVEXA Smart Energy Meter & Wi-Fi Gateway', 'ACCESSORY', 'Real-time bidirectional net-metering monitor with iOS and Android mobile app integration.', 8500.00, 200, 'Bidirectional', '99.1%', 5, 'Accessory', 'https://images.unsplash.com/photo-1584279893976-1e66c9ff99a5?q=80&w=800&auto=format&fit=crop', 'IoT Enabled', true);
