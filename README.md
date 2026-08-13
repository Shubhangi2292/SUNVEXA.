# SUNVEXA — Smarter Solar. Brighter Future.

Next-Generation Clean-Tech E-Commerce & Solar Systems Platform.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, HTML5 Canvas API (240-frame 60 FPS scroll animation engine)
- **Backend**: Java 21, Spring Boot 3.4.2, Spring Security, JWT Authentication, BCrypt, Spring Data JPA, Maven
- **Database**: PostgreSQL 18 (`sunvexa_db`), Flyway DDL Migrations

## Key Features
1. **240-Frame Canvas Scroll Animation**: Smooth 3D rendering synchronized to window scroll position.
2. **AI Solar Copilot**: Interactive solar assistant for capacity, savings, and product recommendations.
3. **24-Hour Energy Simulator**: Hourly load profiling comparing solar generation vs battery storage & grid net-metering.
4. **RoofScan AI**: Rooftop solar potential and irradiance index calculation.
5. **Custom System Builder**: Hardware component assembly with live compatibility checks.
6. **Transparent 6-Step Purchase Flow**: Review ➔ Details ➔ Delivery & Installation (+₹25,000) ➔ Payment ➔ Confirmation ➔ Live Order Tracking.
7. **PostgreSQL Authentication**: Registration and login tied to PostgreSQL `users` table with BCrypt security and JWT Bearer tokens.

## Getting Started

### 1. Frontend
```bash
npm install
npm run dev
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
