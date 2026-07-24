package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Technician;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {


    // Search technician by name
    List<Technician> findByNameContainingIgnoreCase(String name);


    // Search by specialization
    List<Technician> findBySpecializationIgnoreCase(String specialization);


    // Get available technicians by specialization
    List<Technician> findBySpecializationIgnoreCaseAndAvailabilityIgnoreCase(
            String specialization,
            String availability
    );

}