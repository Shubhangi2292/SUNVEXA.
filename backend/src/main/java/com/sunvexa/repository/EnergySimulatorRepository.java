package com.sunvexa.repository;

import com.sunvexa.entity.EnergySimulatorConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnergySimulatorRepository extends JpaRepository<EnergySimulatorConfig, Long> {
    List<EnergySimulatorConfig> findByUserIdOrderByCreatedAtDesc(Long userId);
}
