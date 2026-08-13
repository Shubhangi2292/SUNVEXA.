package com.sunvexa.service;

import com.sunvexa.dto.UserDto;
import com.sunvexa.entity.User;
import com.sunvexa.exception.ResourceNotFoundException;
import com.sunvexa.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public UserDto getUserProfile(String email) {
        User user = getUserByEmail(email);
        return convertToDto(user);
    }

    @Transactional
    public UserDto updateUserProfile(String email, UserDto updateDto) {
        User user = getUserByEmail(email);
        if (updateDto.getFullName() != null) user.setFullName(updateDto.getFullName());
        if (updateDto.getPhone() != null) user.setPhone(updateDto.getPhone());
        if (updateDto.getAddress() != null) user.setAddress(updateDto.getAddress());
        if (updateDto.getCity() != null) user.setCity(updateDto.getCity());
        if (updateDto.getState() != null) user.setState(updateDto.getState());
        if (updateDto.getPinCode() != null) user.setPinCode(updateDto.getPinCode());

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    public UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setPinCode(user.getPinCode());
        return dto;
    }
}
