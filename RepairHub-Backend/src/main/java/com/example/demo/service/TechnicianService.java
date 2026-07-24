package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Technician;
import com.example.demo.repository.TechnicianRepository;

@Service
public class TechnicianService {

    @Autowired
    private TechnicianRepository technicianRepository;

    // Add Technician
    public Technician addTechnician(Technician technician) {
        return technicianRepository.save(technician);
    }

    // Get All Technicians
    public List<Technician> getAllTechnicians() {
        return technicianRepository.findAll();
    }

    // Get Technician By ID
    public Technician getTechnicianById(Long id) {
        Optional<Technician> technician = technicianRepository.findById(id);
        return technician.orElse(null);
    }

    // Update Technician
    public Technician updateTechnician(Long id, Technician updatedTechnician) {

        Optional<Technician> optional = technicianRepository.findById(id);

        if (optional.isPresent()) {

            Technician technician = optional.get();

            technician.setName(updatedTechnician.getName());
            technician.setEmail(updatedTechnician.getEmail());
            technician.setPhone(updatedTechnician.getPhone());
            technician.setSpecialization(updatedTechnician.getSpecialization());
            technician.setExperience(updatedTechnician.getExperience());
            technician.setLocation(updatedTechnician.getLocation());
            technician.setAvailability(updatedTechnician.getAvailability());
            technician.setRating(updatedTechnician.getRating());

            return technicianRepository.save(technician);
        }

        return null;
    }

    // Delete Technician
    public String deleteTechnician(Long id) {

        if (technicianRepository.existsById(id)) {

            technicianRepository.deleteById(id);
            return "Technician Deleted Successfully!";
        }

        return "Technician Not Found!";
    }

    // Search Technician by Name
    public List<Technician> searchTechnician(String name) {
        return technicianRepository.findByNameContainingIgnoreCase(name);
    }

    // Get Technicians by Specialization
    public List<Technician> getBySpecialization(String specialization) {
        return technicianRepository.findBySpecializationIgnoreCase(specialization);
    }
    
 // Get Available Technicians

    public List<Technician> getAvailableTechnicians(String specialization) {

        return technicianRepository
                .findBySpecializationIgnoreCaseAndAvailabilityIgnoreCase(
                        specialization,
                        "Available"
                );
    }

}