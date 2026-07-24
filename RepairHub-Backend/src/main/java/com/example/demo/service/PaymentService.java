package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Payment;
import com.example.demo.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        return payment.orElse(null);
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {

        Optional<Payment> optional = paymentRepository.findById(id);

        if (optional.isPresent()) {

            Payment payment = optional.get();

            payment.setBookingId(updatedPayment.getBookingId());
            payment.setCustomerName(updatedPayment.getCustomerName());
            payment.setAmount(updatedPayment.getAmount());
            payment.setPaymentMethod(updatedPayment.getPaymentMethod());
            payment.setPaymentDate(updatedPayment.getPaymentDate());
            payment.setPaymentStatus(updatedPayment.getPaymentStatus());

            return paymentRepository.save(payment);
        }

        return null;
    }

    public String deletePayment(Long id) {

        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return "Payment Deleted Successfully!";
        }

        return "Payment Not Found!";
    }

    public List<Payment> getPaymentByBooking(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    public List<Payment> getPaymentByStatus(String status) {
        return paymentRepository.findByPaymentStatusIgnoreCase(status);
    }

}