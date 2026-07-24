package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Booking;

@Repository
public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    // Search customers by partial name
    List<Booking>
    findByCustomerNameContainingIgnoreCase(
            String customerName
    );

    // Search technician by partial name
    List<Booking>
    findByTechnicianNameContainingIgnoreCase(
            String technicianName
    );

    // Find bookings by status
    List<Booking>
    findByStatusIgnoreCase(
            String status
    );

    /*
     * Customer booking history.
     * Email is used because it is more reliable
     * than using the customer's name.
     */
    List<Booking>
    findByCustomerEmailIgnoreCaseOrderByIdDesc(
            String customerEmail
    );

    // All jobs assigned to technician
    List<Booking>
    findByTechnicianNameIgnoreCaseOrderByIdDesc(
            String technicianName
    );

    // Technician jobs by status
    List<Booking>
    findByTechnicianNameIgnoreCaseAndStatusIgnoreCase(
            String technicianName,
            String status
    );

    // Find bookings by payment status
    List<Booking>
    findByPaymentStatusIgnoreCase(
            String paymentStatus
    );

    // Find bookings by review status
    List<Booking>
    findByReviewStatusIgnoreCase(
            String reviewStatus
    );

    // Find bookings by service
    List<Booking>
    findByServiceNameIgnoreCase(
            String serviceName
    );
    
    List<Booking> findByTechnicianNameIgnoreCase(
            String technicianName
    );
}