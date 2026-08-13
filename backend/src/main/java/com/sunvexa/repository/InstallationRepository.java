package com.sunvexa.repository;

import com.sunvexa.entity.Installation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InstallationRepository extends JpaRepository<Installation, Long> {
    Optional<Installation> findByOrderId(Long orderId);
}
