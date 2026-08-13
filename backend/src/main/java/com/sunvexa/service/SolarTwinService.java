package com.sunvexa.service;

import com.sunvexa.dto.SolarTwinDto;
import com.sunvexa.entity.SolarTwinConfig;
import com.sunvexa.entity.User;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.SolarTwinRepository;
import com.sunvexa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolarTwinService {

    private final SolarTwinRepository solarTwinRepository;
    private final UserRepository userRepository;

    public SolarTwinService(SolarTwinRepository solarTwinRepository, UserRepository userRepository) {
        this.solarTwinRepository = solarTwinRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public SolarTwinDto saveSolarTwin(SolarTwinDto dto, String userEmail) {
        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        SolarTwinConfig config = new SolarTwinConfig();
        config.setUser(user);
        config.setSystemCapacity(dto.getSystemCapacity());
        config.setPanelCount(dto.getPanelCount());
        config.setInverterCapacity(dto.getInverterCapacity());
        config.setBatteryCapacity(dto.getBatteryCapacity());
        config.setEstimatedGeneration(dto.getEstimatedGeneration());
        config.setEstimatedConsumption(dto.getEstimatedConsumption());

        SolarTwinConfig saved = solarTwinRepository.save(config);
        return convertToDto(saved);
    }

    public List<SolarTwinDto> getUserSolarTwins(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return solarTwinRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SolarTwinDto convertToDto(SolarTwinConfig config) {
        SolarTwinDto dto = new SolarTwinDto();
        dto.setId(config.getId());
        dto.setUserId(config.getUser() != null ? config.getUser().getId() : null);
        dto.setSystemCapacity(config.getSystemCapacity());
        dto.setPanelCount(config.getPanelCount());
        dto.setInverterCapacity(config.getInverterCapacity());
        dto.setBatteryCapacity(config.getBatteryCapacity());
        dto.setEstimatedGeneration(config.getEstimatedGeneration());
        dto.setEstimatedConsumption(config.getEstimatedConsumption());
        dto.setCreatedAt(config.getCreatedAt());
        return dto;
    }
}
