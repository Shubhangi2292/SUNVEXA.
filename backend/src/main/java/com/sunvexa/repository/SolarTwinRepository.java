package com.sunvexa.repository;

import com.sunvexa.entity.SolarTwinConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SolarTwinRepository extends JpaRepository<SolarTwinConfig, Long> {
    List<SolarTwinConfig> findByUserIdOrderByCreatedAtDesc(Long userId);
}
