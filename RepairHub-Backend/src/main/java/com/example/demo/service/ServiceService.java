package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.HomeService;
import com.example.demo.repository.HomeServiceRepository;

@Service
public class ServiceService {

    @Autowired
    private HomeServiceRepository homeServiceRepository;

    // Add Service
    public HomeService addService(HomeService service) {
        return homeServiceRepository.save(service);
    }

    // Get All Services
    public List<HomeService> getAllServices() {
        return homeServiceRepository.findAll();
    }

    // Get Service By ID
    public HomeService getServiceById(Long id) {

        Optional<HomeService> service = homeServiceRepository.findById(id);

        return service.orElse(null);
    }

    // Update Service
    public HomeService updateService(Long id, HomeService updatedService) {

        Optional<HomeService> optional = homeServiceRepository.findById(id);

        if (optional.isPresent()) {

            HomeService service = optional.get();

            service.setServiceName(updatedService.getServiceName());
            service.setCategory(updatedService.getCategory());
            service.setDescription(updatedService.getDescription());
            service.setPrice(updatedService.getPrice());
            service.setImageUrl(updatedService.getImageUrl());

            return homeServiceRepository.save(service);
        }

        return null;
    }

    // Delete Service
    public String deleteService(Long id) {

        if (homeServiceRepository.existsById(id)) {

            homeServiceRepository.deleteById(id);

            return "Service Deleted Successfully!";
        }

        return "Service Not Found!";
    }

    // Search Service
    public List<HomeService> searchService(String serviceName) {

        return homeServiceRepository.findByServiceNameContainingIgnoreCase(serviceName);
    }
}