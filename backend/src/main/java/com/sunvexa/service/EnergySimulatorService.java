package com.sunvexa.service;

import com.sunvexa.dto.EnergySimDto;
import com.sunvexa.entity.EnergySimulatorConfig;
import com.sunvexa.entity.User;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.EnergySimulatorRepository;
import com.sunvexa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnergySimulatorService {

    private final EnergySimulatorRepository energySimulatorRepository;
    private final UserRepository userRepository;

    public EnergySimulatorService(EnergySimulatorRepository energySimulatorRepository, UserRepository userRepository) {
        this.energySimulatorRepository = energySimulatorRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public EnergySimDto saveEnergySimulation(EnergySimDto dto, String userEmail) {
        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        EnergySimulatorConfig config = new EnergySimulatorConfig();
        config.setUser(user);
        config.setSystemSize(dto.getSystemSize());
        config.setBatteryCapacity(dto.getBatteryCapacity());
        config.setEstimatedConsumptionProfile(dto.getEstimatedConsumptionProfile());
        config.setSimulationParameters(dto.getSimulationParameters());

        EnergySimulatorConfig saved = energySimulatorRepository.save(config);
        return convertToDto(saved);
    }

    public List<EnergySimDto> getUserSimulations(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return energySimulatorRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public EnergySimDto convertToDto(EnergySimulatorConfig config) {
        EnergySimDto dto = new EnergySimDto();
        dto.setId(config.getId());
        dto.setUserId(config.getUser() != null ? config.getUser().getId() : null);
        dto.setSystemSize(config.getSystemSize());
        dto.setBatteryCapacity(config.getBatteryCapacity());
        dto.setEstimatedConsumptionProfile(config.getEstimatedConsumptionProfile());
        dto.setSimulationParameters(config.getSimulationParameters());
        dto.setCreatedAt(config.getCreatedAt());
        return dto;
    }
}
