package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.HomeService;
import com.example.demo.service.ServiceService;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    // Add Service
    @PostMapping
    public HomeService addService(@RequestBody HomeService service) {

        return serviceService.addService(service);
    }

    // Get All Services
    @GetMapping
    public List<HomeService> getAllServices() {

        return serviceService.getAllServices();
    }

    // Get Service By ID
    @GetMapping("/{id}")
    public HomeService getServiceById(@PathVariable Long id) {

        return serviceService.getServiceById(id);
    }

    // Update Service
    @PutMapping("/{id}")
    public HomeService updateService(@PathVariable Long id,
                                     @RequestBody HomeService service) {

        return serviceService.updateService(id, service);
    }

    // Delete Service
    @DeleteMapping("/{id}")
    public String deleteService(@PathVariable Long id) {

        return serviceService.deleteService(id);
    }

    // Search Service
    @GetMapping("/search/{serviceName}")
    public List<HomeService> searchService(@PathVariable String serviceName) {

        return serviceService.searchService(serviceName);
    }
}