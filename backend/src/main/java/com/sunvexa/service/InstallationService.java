package com.sunvexa.service;

import com.sunvexa.dto.InstallationDto;
import com.sunvexa.entity.Installation;
import com.sunvexa.entity.InstallationStatus;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.InstallationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InstallationService {

    private final InstallationRepository installationRepository;

    public InstallationService(InstallationRepository installationRepository) {
        this.installationRepository = installationRepository;
    }

    public InstallationDto getInstallationByOrderId(Long orderId) {
        Installation inst = installationRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Installation info not found for order: " + orderId));
        return convertToDto(inst);
    }

    @Transactional
    public InstallationDto updateInstallationStatus(Long id, InstallationStatus status) {
        Installation inst = installationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Installation not found: " + id));
        inst.setStatus(status);
        Installation updated = installationRepository.save(inst);
        return convertToDto(updated);
    }

    public InstallationDto convertToDto(Installation inst) {
        InstallationDto dto = new InstallationDto();
        dto.setId(inst.getId());
        dto.setOrderId(inst.getOrder().getId());
        dto.setInstallationRequired(inst.getInstallationRequired());
        dto.setInstallationAddress(inst.getInstallationAddress());
        dto.setPreferredDate(inst.getPreferredDate());
        dto.setPreferredTime(inst.getPreferredTime());
        dto.setStatus(inst.getStatus());
        dto.setNotes(inst.getNotes());
        return dto;
    }
}
