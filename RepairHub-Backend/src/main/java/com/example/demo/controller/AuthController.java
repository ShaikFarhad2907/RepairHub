package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.service.AuthService;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.User;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String registerUser(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }
    
    @PostMapping("/technician-register")
    public String registerTechnician(
            @RequestBody RegisterRequest request) {

        return authService.registerTechnician(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest request) {

        User user = authService.login(request);

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body(Map.of(
                            "message",
                            "Invalid email, password or role"
                    ));
        }

        return ResponseEntity.ok(user);
    }
    
    
}