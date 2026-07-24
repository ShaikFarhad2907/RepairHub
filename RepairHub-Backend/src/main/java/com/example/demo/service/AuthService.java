package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Register customer
    public String register(RegisterRequest request) {

        String email = request.getEmail().trim();

        if (userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setRole("CUSTOMER");
        user.setAddress(request.getAddress());
        user.setAccountStatus("VERIFIED");

        userRepository.save(user);

        return "Registration Successful!";
    }
    
 // Register Technician
    public String registerTechnician(RegisterRequest request) {

        String email = request.getEmail().trim();

        if (userRepository.existsByEmail(email)) {

            return "Email already exists!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setAddress(request.getAddress());

        user.setRole("TECHNICIAN");

        // Admin approval required
        user.setAccountStatus("PENDING");

        userRepository.save(user);

        return "Technician registration successful. Waiting for admin approval.";
    }

    // Login customer, technician or admin
    public User login(LoginRequest request) {

        String email = request.getEmail().trim();

        Optional<User> optionalUser =
                userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();

        if (
            user.getPassword() == null ||
            !user.getPassword().equals(request.getPassword())
        ) {
            return null;
        }
     // Technician approval check
        if (
            "TECHNICIAN".equalsIgnoreCase(user.getRole()) &&
            !"VERIFIED".equalsIgnoreCase(user.getAccountStatus())
        ) {

            return null;
        }


        

        return user;
    }
    
}