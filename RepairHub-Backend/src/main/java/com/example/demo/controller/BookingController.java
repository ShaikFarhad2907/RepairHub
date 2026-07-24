package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Booking;
import com.example.demo.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService
    ) {
        this.bookingService =
                bookingService;
    }

    // ==========================
    // Create Booking
    // POST /bookings
    // ==========================
    @PostMapping
    public ResponseEntity<?> addBooking(
            @RequestBody Booking booking
    ) {

        try {

            Booking savedBooking =
                    bookingService.addBooking(
                            booking
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedBooking);

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // All Bookings
    // GET /bookings
    // ==========================
    @GetMapping
    public ResponseEntity<List<Booking>>
    getAllBookings() {

        return ResponseEntity.ok(
                bookingService
                        .getAllBookings()
        );
    }

    // ==========================
    // Booking By ID
    // GET /bookings/{id}
    // ==========================
    
    @GetMapping("/technician/{technicianName}")
    public ResponseEntity<?> getTechnicianBookings(
            @PathVariable String technicianName) {


        List<Booking> bookings =
                bookingService.searchTechnician(
                        technicianName
                );


        return ResponseEntity.ok(bookings);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(
            @PathVariable Long id
    ) {

        try {

            return ResponseEntity.ok(
                    bookingService
                            .getBookingById(id)
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Customer Bookings
    // GET /bookings/customer-email/email
    // ==========================
    @GetMapping(
            "/customer-email/{customerEmail}"
    )
    public ResponseEntity<?>
    getCustomerBookings(
            @PathVariable String customerEmail
    ) {

        try {

            List<Booking> bookings =
                    bookingService
                            .getBookingsByCustomerEmail(
                                    customerEmail
                            );

            return ResponseEntity.ok(
                    bookings
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Update Booking
    // PUT /bookings/{id}
    // ==========================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(
            @PathVariable Long id,
            @RequestBody Booking booking
    ) {

        try {

            Booking updatedBooking =
                    bookingService.updateBooking(
                            id,
                            booking
                    );

            return ResponseEntity.ok(
                    updatedBooking
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Delete Booking
    // DELETE /bookings/{id}
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteBooking(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                bookingService
                        .deleteBooking(id)
        );
    }

    // ==========================
    // Update Booking Status
    // PUT /bookings/status/{id}
    // Body: {"status":"ACCEPTED"}
    // ==========================
   
    // ==========================
    // Assign Technician
    // PUT /bookings/assign/{id}
    // ==========================
    @PutMapping("/assign/{bookingId}")
    public ResponseEntity<?>
    assignTechnician(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> body
    ) {

        try {

            Booking updatedBooking =
                    bookingService
                            .assignTechnician(
                                    bookingId,
                                    body.get(
                                            "technicianName"
                                    )
                            );

            return ResponseEntity.ok(
                    updatedBooking
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Change Technician
    // PUT /bookings/change-technician/{id}
    // ==========================
    @PutMapping(
            "/change-technician/{bookingId}"
    )
    public ResponseEntity<?>
    changeTechnician(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> body
    ) {

        try {

            Booking updatedBooking =
                    bookingService
                            .changeTechnician(
                                    bookingId,
                                    body.get(
                                            "technicianName"
                                    )
                            );

            return ResponseEntity.ok(
                    updatedBooking
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Complete Booking
    // PUT /bookings/complete/{id}
    // ==========================
    @PutMapping("/complete/{bookingId}")
    public ResponseEntity<?>
    completeBooking(
            @PathVariable Long bookingId
    ) {

        try {

            return ResponseEntity.ok(
                    bookingService
                            .completeBooking(
                                    bookingId
                            )
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Select Payment Method
    // PUT /bookings/payment-method/{id}
    // ==========================
    @PutMapping(
            "/payment-method/{bookingId}"
    )
    public ResponseEntity<?>
    selectPaymentMethod(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> body
    ) {

        try {

            return ResponseEntity.ok(
                    bookingService
                            .selectPaymentMethod(
                                    bookingId,
                                    body.get(
                                            "paymentMethod"
                                    )
                            )
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Complete Payment
    // PUT /bookings/payment/{id}
    // ==========================
    @PutMapping("/payment/{bookingId}")
    public ResponseEntity<?>
    completePayment(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> body
    ) {

        try {

            return ResponseEntity.ok(
                    bookingService
                            .completePayment(
                                    bookingId,
                                    body.get(
                                            "paymentMethod"
                                    )
                            )
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }

    // ==========================
    // Update Review Status
    // PUT /bookings/review/{id}
    // ==========================
    @PutMapping("/review/{bookingId}")
    public ResponseEntity<?>
    updateReview(
            @PathVariable Long bookingId
    ) {

        try {

            return ResponseEntity.ok(
                    bookingService
                            .updateReview(
                                    bookingId
                            )
            );

        } catch (
                IllegalArgumentException exception
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }
    }
    
    @PutMapping("/assign/{id}/{technicianName}")
    public ResponseEntity<?> assignTechnician(
            @PathVariable Long id,
            @PathVariable String technicianName) {


        Booking booking =
                bookingService.assignTechnician(
                        id,
                        technicianName
                );


        if(booking == null){

            return ResponseEntity
                    .badRequest()
                    .body("Booking not found");

        }


        return ResponseEntity.ok(booking);
    }
    
    @PutMapping("/status/{id}/{status}")
    public ResponseEntity<?> updateStatus(

            @PathVariable Long id,

            @PathVariable String status

    ){

        try {

            Booking booking =
                    bookingService.updateBookingStatus(
                            id,
                            status
                    );


            return ResponseEntity.ok(booking);


        } catch(Exception e){

            return ResponseEntity
                    .badRequest()
                    .body(
                        e.getMessage()
                    );

        }

    }
    
    @GetMapping("/technician/earnings/{technicianName}")
    public ResponseEntity<?> getTechnicianEarnings(
            @PathVariable String technicianName
    ) {

        double earnings =
                bookingService.getTechnicianEarnings(
                        technicianName
                );

        return ResponseEntity.ok(
                earnings
        );

    }
    
    @PutMapping("/review-status/{id}/{status}")
    public Booking updateReviewStatus(
            @PathVariable Long id,
            @PathVariable String status
    ){

        return bookingService.updateReviewStatus(
                id,
                status
        );

    }
    
}
