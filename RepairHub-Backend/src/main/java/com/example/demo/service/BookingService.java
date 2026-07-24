package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Booking;
import com.example.demo.repository.BookingRepository;

@Service
public class BookingService {


    private final BookingRepository bookingRepository;


    private static final Set<String> ALLOWED_STATUSES =
            Set.of(
                    "PENDING",
                    "ACCEPTED",
                    "REJECTED",
                    "IN_PROGRESS",
                    "COMPLETED"
            );


    private static final Set<String> PAYMENT_METHODS =
            Set.of(
                    "UPI",
                    "DEBIT_CARD",
                    "CREDIT_CARD",
                    "CASH"
            );



    public BookingService(
            BookingRepository bookingRepository
    ) {

        this.bookingRepository =
                bookingRepository;

    }





    // ==========================
    // Add Booking
    // ==========================

    public Booking addBooking(
            Booking booking
    ) {


        if (
                booking.getCustomerEmail() == null ||
                booking.getCustomerEmail()
                        .trim()
                        .isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Customer email is required"
            );

        }



        if (
                booking.getServiceName() == null ||
                booking.getServiceName()
                        .trim()
                        .isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Service name is required"
            );

        }



        booking.setCustomerEmail(
                booking.getCustomerEmail()
                        .trim()
                        .toLowerCase()
        );



        booking.setStatus(
                "PENDING"
        );


        booking.setPaymentStatus(
                "PENDING"
        );


        booking.setReviewStatus(
                "PENDING"
        );



        // ==========================
        // Assign Service Amount
        // ==========================

        if (
                booking.getAmount() <= 0
        ) {


            switch(
                    booking.getServiceName()
                            .trim()
                            .toLowerCase()
            ) {


                case "electrician":

                    booking.setAmount(500);

                    break;



                case "plumber":

                    booking.setAmount(400);

                    break;



                case "ac repair":

                    booking.setAmount(800);

                    break;



                case "cleaning":

                    booking.setAmount(600);

                    break;



                case "pest control":

                    booking.setAmount(700);

                    break;



                case "carpenter":

                    booking.setAmount(550);

                    break;



                case "painting":

                    booking.setAmount(1000);

                    break;



                default:

                    booking.setAmount(300);

                    break;

            }

        }





        String selectedMethod =
                normalizePaymentMethod(
                        booking.getPaymentMethod()
                );



        if(
                !selectedMethod.isEmpty()
        ){

            validatePaymentMethod(
                    selectedMethod
            );


            booking.setPaymentMethod(
                    selectedMethod
            );


        }
        else {

            booking.setPaymentMethod(
                    ""
            );

        }





        if(
                booking.getTechnicianName() == null
        ){

            booking.setTechnicianName(
                    ""
            );

        }





        return bookingRepository.save(
                booking
        );

    }






    // ==========================
    // Get All Bookings
    // ==========================

    public List<Booking> getAllBookings(){

        return bookingRepository.findAll();

    }






    // ==========================
    // Get Booking By ID
    // ==========================

    public Booking getBookingById(
            Long id
    ){

        return bookingRepository
                .findById(id)
                .orElseThrow(
                        () ->
                        new IllegalArgumentException(
                                "Booking not found"
                        )
                );

    }






    // ==========================
    // Customer Booking History
    // ==========================

    public List<Booking>
    getBookingsByCustomerEmail(
            String customerEmail
    ){


        if(
                customerEmail == null ||
                customerEmail.trim().isEmpty()
        ){

            throw new IllegalArgumentException(
                    "Customer email is required"
            );

        }


        return bookingRepository
                .findByCustomerEmailIgnoreCaseOrderByIdDesc(
                        customerEmail.trim()
                );

    }






    // ==========================
    // Update Booking
    // ==========================

    public Booking updateBooking(
            Long id,
            Booking updatedBooking
    ){


        Booking booking =
                getBookingById(id);



        booking.setCustomerName(
                updatedBooking.getCustomerName()
        );


        booking.setCustomerEmail(
                updatedBooking.getCustomerEmail()
        );


        booking.setCustomerPhone(
                updatedBooking.getCustomerPhone()
        );


        booking.setAddress(
                updatedBooking.getAddress()
        );


        booking.setServiceName(
                updatedBooking.getServiceName()
        );


        booking.setBookingDate(
                updatedBooking.getBookingDate()
        );


        booking.setBookingTime(
                updatedBooking.getBookingTime()
        );


        booking.setDescription(
                updatedBooking.getDescription()
        );


        booking.setImage(
                updatedBooking.getImage()
        );


        booking.setAmount(
                updatedBooking.getAmount()
        );


        return bookingRepository.save(
                booking
        );

    }
    // ==========================
    // Delete Booking
    // ==========================

    public String deleteBooking(
            Long id
    ){

        if(
                !bookingRepository.existsById(id)
        ){

            return "Booking Not Found!";

        }


        bookingRepository.deleteById(id);


        return "Booking Deleted Successfully!";

    }






    // ==========================
    // Search Customer
    // ==========================

    public List<Booking> searchCustomer(
            String customerName
    ){

        return bookingRepository
                .findByCustomerNameContainingIgnoreCase(
                        customerName
                );

    }






    // ==========================
    // Search Technician
    // ==========================

    public List<Booking> searchTechnician(
            String technicianName
    ){

        return bookingRepository
                .findByTechnicianNameContainingIgnoreCase(
                        technicianName
                );

    }






    // ==========================
    // Update Booking Status
    // ==========================

    public Booking updateBookingStatus(
            Long bookingId,
            String status
    ){

        Booking booking =
                getBookingById(
                        bookingId
                );


        String normalizedStatus =
                normalizeStatus(
                        status
                );



        if(
                !ALLOWED_STATUSES.contains(
                        normalizedStatus
                )
        ){

            throw new IllegalArgumentException(
                    "Invalid booking status"
            );

        }




        String currentStatus =
                normalizeStatus(
                        booking.getStatus()
                );



        if(
                "COMPLETED".equals(currentStatus)
                ||
                "REJECTED".equals(currentStatus)
        ){

            throw new IllegalArgumentException(
                    "This booking status cannot be changed"
            );

        }



        booking.setStatus(
                normalizedStatus
        );


        return bookingRepository.save(
                booking
        );

    }







    // ==========================
    // Assign Technician
    // ==========================

    public Booking assignTechnician(
            Long id,
            String technicianName
    ){


        Optional<Booking> optionalBooking =
                bookingRepository.findById(id);



        if(optionalBooking.isEmpty()){

            return null;

        }



        Booking booking =
                optionalBooking.get();



        booking.setTechnicianName(
                technicianName
        );



        booking.setStatus(
                "PENDING"
        );



        return bookingRepository.save(
                booking
        );

    }







    // ==========================
    // Change Technician
    // ==========================

    public Booking changeTechnician(
            Long bookingId,
            String technicianName
    ){

        Booking booking =
                getBookingById(
                        bookingId
                );



        booking.setTechnicianName(
                technicianName.trim()
        );


        booking.setStatus(
                "PENDING"
        );



        return bookingRepository.save(
                booking
        );

    }







    // ==========================
    // Complete Booking
    // ==========================

    public Booking completeBooking(
            Long bookingId
    ){

        Booking booking =
                getBookingById(
                        bookingId
                );


        booking.setStatus(
                "COMPLETED"
        );


        return bookingRepository.save(
                booking
        );

    }







    // ==========================
    // Payment Method
    // ==========================

    @Transactional
    public Booking completePayment(
            Long bookingId,
            String paymentMethod
    ){

        Booking booking =
                getBookingById(
                        bookingId
                );



        String method =
                normalizePaymentMethod(
                        paymentMethod
                );



        validatePaymentMethod(
                method
        );



        booking.setPaymentMethod(
                method
        );


        booking.setPaymentStatus(
                "PAID"
        );



        return bookingRepository.save(
                booking
        );

    }







    // ==========================
    // Review
    // ==========================

    public Booking updateReview(
            Long bookingId
    ){

        Booking booking =
                getBookingById(
                        bookingId
                );



        booking.setReviewStatus(
                "SUBMITTED"
        );


        return bookingRepository.save(
                booking
        );

    }







    // ==========================
    // Technician Earnings
    // ==========================

    public double getTechnicianEarnings(
            String technicianName
    ){


        List<Booking> bookings =
                bookingRepository
                .findByTechnicianNameIgnoreCase(
                        technicianName
                );



        return bookings.stream()


                .filter(
                        booking ->
                        "COMPLETED"
                        .equalsIgnoreCase(
                                booking.getStatus()
                        )
                )


                .filter(
                        booking ->
                        "PAID"
                        .equalsIgnoreCase(
                                booking.getPaymentStatus()
                        )
                )


                .mapToDouble(
                        Booking::getAmount
                )


                .sum();

    }







    private void validatePaymentMethod(
            String paymentMethod
    ){

        if(
                !PAYMENT_METHODS.contains(
                        paymentMethod
                )
        ){

            throw new IllegalArgumentException(
                    "Invalid payment method"
            );

        }

    }







    private String normalizeStatus(
            String status
    ){

        if(status == null){

            return "";

        }


        return status
                .trim()
                .toUpperCase()
                .replace(
                        " ",
                        "_"
                );

    }







    private String normalizePaymentMethod(
            String paymentMethod
    ){

        if(paymentMethod == null){

            return "";

        }


        return paymentMethod
                .trim()
                .toUpperCase()
                .replace(
                        " ",
                        "_"
                );

    }




    public Booking selectPaymentMethod(
            Long bookingId,
            String paymentMethod
    ) {


        Booking booking =
                getBookingById(
                        bookingId
                );


        String method =
                normalizePaymentMethod(
                        paymentMethod
                );


        validatePaymentMethod(
                method
        );


        booking.setPaymentMethod(
                method
        );


        return bookingRepository.save(
                booking
        );

    }
    public Booking updateReviewStatus(
            Long id,
            String status
    ){

        Booking booking =
                bookingRepository.findById(id)
                .orElse(null);


        if(booking == null){

            return null;

        }


        booking.setReviewStatus(status);


        return bookingRepository.save(booking);

    }

}