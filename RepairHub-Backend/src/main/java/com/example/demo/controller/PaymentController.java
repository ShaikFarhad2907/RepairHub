package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Payment;
import com.example.demo.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable Long id,
                                 @RequestBody Payment payment) {
        return paymentService.updatePayment(id, payment);
    }

    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {
        return paymentService.deletePayment(id);
    }

    @GetMapping("/booking/{bookingId}")
    public List<Payment> getPaymentByBooking(@PathVariable Long bookingId) {
        return paymentService.getPaymentByBooking(bookingId);
    }

    @GetMapping("/status/{status}")
    public List<Payment> getPaymentByStatus(@PathVariable String status) {
        return paymentService.getPaymentByStatus(status);
    }
}