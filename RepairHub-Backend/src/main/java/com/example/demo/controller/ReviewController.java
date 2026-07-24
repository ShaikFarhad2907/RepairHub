package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Review;
import com.example.demo.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id,
                               @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        return reviewService.deleteReview(id);
    }

    @GetMapping("/service/{serviceName}")
    public List<Review> searchByService(@PathVariable String serviceName) {
        return reviewService.searchByService(serviceName);
    }

    @GetMapping("/rating/{rating}")
    public List<Review> searchByRating(@PathVariable int rating) {
        return reviewService.searchByRating(rating);
    }
}