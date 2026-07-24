package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Review;
import com.example.demo.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        return review.orElse(null);
    }

    public Review updateReview(Long id, Review updatedReview) {

        Optional<Review> optional = reviewRepository.findById(id);

        if (optional.isPresent()) {

            Review review = optional.get();

            review.setCustomerName(updatedReview.getCustomerName());
            review.setServiceName(updatedReview.getServiceName());
            review.setTechnicianName(updatedReview.getTechnicianName());
            review.setRating(updatedReview.getRating());
            review.setReview(updatedReview.getReview());

            return reviewRepository.save(review);
        }

        return null;
    }

    public String deleteReview(Long id) {

        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return "Review Deleted Successfully!";
        }

        return "Review Not Found!";
    }

    public List<Review> searchByService(String serviceName) {
        return reviewRepository.findByServiceNameContainingIgnoreCase(serviceName);
    }

    public List<Review> searchByRating(int rating) {
        return reviewRepository.findByRating(rating);
    }
}