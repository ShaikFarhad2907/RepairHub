package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Technician;
import com.example.demo.service.TechnicianService;

@RestController
@RequestMapping("/technicians")
@CrossOrigin(origins = "*")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;

    // Add Technician
    @PostMapping
    public Technician addTechnician(@RequestBody Technician technician) {
        return technicianService.addTechnician(technician);
    }

    // Get All Technicians
    @GetMapping
    public List<Technician> getAllTechnicians() {
        return technicianService.getAllTechnicians();
    }

    // Get Technician By ID
    @GetMapping("/{id}")
    public Technician getTechnicianById(@PathVariable Long id) {
        return technicianService.getTechnicianById(id);
    }

    // Update Technician
    @PutMapping("/{id}")
    public Technician updateTechnician(@PathVariable Long id,
                                       @RequestBody Technician technician) {
        return technicianService.updateTechnician(id, technician);
    }

    // Delete Technician
    @DeleteMapping("/{id}")
    public String deleteTechnician(@PathVariable Long id) {
        return technicianService.deleteTechnician(id);
    }

    // Search Technician by Name
    @GetMapping("/search/{name}")
    public List<Technician> searchTechnician(@PathVariable String name) {
        return technicianService.searchTechnician(name);
    }

    // Get Technicians by Specialization
    @GetMapping("/specialization/{specialization}")
    public List<Technician> getBySpecialization(@PathVariable String specialization) {
        return technicianService.getBySpecialization(specialization);
    }
    
 // Get available technicians

    @GetMapping("/available/{specialization}")
    public List<Technician> getAvailableTechnicians(
            @PathVariable String specialization){

        return technicianService
                .getAvailableTechnicians(specialization);
    }
}