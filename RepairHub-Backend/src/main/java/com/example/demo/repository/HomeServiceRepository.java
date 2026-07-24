package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.HomeService;

@Repository
public interface HomeServiceRepository extends JpaRepository<HomeService, Long> {

    List<HomeService> findByServiceNameContainingIgnoreCase(String serviceName);

}