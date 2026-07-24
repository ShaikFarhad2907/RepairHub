package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.HomeServiceRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.TechnicianRepository;
import com.example.demo.repository.UserRepository;

@RestController
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HomeServiceRepository homeServiceRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping("/dashboard")
    public Map<String, Long> getDashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("Total Users", userRepository.count());
        dashboard.put("Total Services", homeServiceRepository.count());
        dashboard.put("Total Technicians", technicianRepository.count());
        dashboard.put("Total Bookings", bookingRepository.count());
        dashboard.put("Total Payments", paymentRepository.count());

        return dashboard;
    }
}