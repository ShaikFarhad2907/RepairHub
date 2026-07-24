package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String customerEmail;

    private String customerPhone;

    private String address;

    private String serviceName;
    private double amount;

    // Technician who accepts the booking
    private String technicianName;

    private String bookingDate;

    private String bookingTime;
    
 // UPI / CREDIT_CARD / DEBIT_CARD / CASH
    private String paymentMethod;
    
    
    public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	// Problem description
    @Column(length = 1000)
    private String description;

    // Damage photo path
    private String image;

    // Pending / Accepted / Rejected / In Progress / Completed
    private String status;

    // Pending / Paid
    private String paymentStatus;

    // Pending / Submitted
    private String reviewStatus;

    public Booking() {
    }

    public Booking(Long id, String customerName, String customerEmail,
                   String customerPhone, String address,
                   String serviceName, String technicianName,
                   String bookingDate, String bookingTime,
                   String description, String image,
                   String status, String paymentStatus,
                   String reviewStatus) {

        this.id = id;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.address = address;
        this.serviceName = serviceName;
        this.technicianName = technicianName;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.description = description;
        this.image = image;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.reviewStatus = reviewStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getTechnicianName() {
        return technicianName;
    }

    public void setTechnicianName(String technicianName) {
        this.technicianName = technicianName;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(String bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(String reviewStatus) {
        this.reviewStatus = reviewStatus;
    }
    public double getAmount() {
        return amount;
    }


    public void setAmount(double amount) {
        this.amount = amount;
    }

}