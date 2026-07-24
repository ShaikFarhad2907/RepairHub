import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axiosConfig";
import "./MyBookings.css";

function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const customerEmail =
        localStorage.getItem("email");

    const role =
        localStorage
            .getItem("role")
            ?.trim()
            .toUpperCase();

    const loadBookings = useCallback(async () => {

        if (!customerEmail) {
            return;
        }

        try {

            setLoading(true);
            setErrorMessage("");

            const encodedEmail =
                encodeURIComponent(customerEmail);

            const response = await api.get(
                `/bookings/customer-email/${encodedEmail}`
            );

            const bookingData =
                Array.isArray(response.data)
                    ? response.data
                    : [];

            setBookings(bookingData);

        } catch (error) {

            console.error(
                "Failed to load bookings:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load your bookings";

            setErrorMessage(message);
            setBookings([]);

        } finally {

            setLoading(false);
        }

    }, [customerEmail]);

    useEffect(() => {

        const isLoggedIn =
            localStorage.getItem("isLoggedIn") ===
            "true";

        if (!isLoggedIn || !customerEmail) {

            navigate("/login", {
                replace: true
            });

            return;
        }

        if (role !== "CUSTOMER") {

            alert(
                "Only customers can access this page"
            );

            navigate("/", {
                replace: true
            });

            return;
        }

        loadBookings();

    }, [
        customerEmail,
        role,
        navigate,
        loadBookings
    ]);

    const openPayment = (booking) => {

        navigate("/payment", {
            state: booking
        });
    };

    const openReview = (booking) => {

        navigate("/review", {
            state: booking
        });
    };

    const getStatusText = (status) => {

        const currentStatus =
            status
                ?.trim()
                .toUpperCase()
                .replace(" ", "_");

        if (currentStatus === "PENDING") {
            return "Waiting for Technician";
        }

        if (currentStatus === "ACCEPTED") {
            return "Technician Accepted";
        }

        if (currentStatus === "REJECTED") {
            return "Technician Rejected";
        }

        if (currentStatus === "IN_PROGRESS") {
            return "Work In Progress";
        }

        if (currentStatus === "COMPLETED") {
            return "Work Completed";
        }

        return status || "Unknown";
    };

    const formatValue = (
        value,
        defaultValue = "Not Available"
    ) => {

        if (
            value === null ||
            value === undefined ||
            String(value).trim() === ""
        ) {
            return defaultValue;
        }

        return value;
    };

    if (loading) {

        return (

            <div className="customer-bookings-page">

                <h2>
                    Loading bookings...
                </h2>

            </div>
        );
    }

    return (

        <div className="customer-bookings-page">

            <div className="bookings-page-header">

                <div>

                    <h1>
                        My Bookings
                    </h1>

                    <p>
                        View and manage your service bookings
                    </p>

                </div>

                <div className="bookings-header-buttons">

                    <button
                        type="button"
                        onClick={loadBookings}
                    >
                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/services")
                        }
                    >
                        Book New Service
                    </button>

                </div>

            </div>

            {errorMessage && (

                <div className="bookings-error">

                    <p>
                        {errorMessage}
                    </p>

                    <button
                        type="button"
                        onClick={loadBookings}
                    >
                        Try Again
                    </button>

                </div>
            )}

            {!errorMessage &&
            bookings.length === 0 ? (

                <div className="no-bookings">

                    <h3>
                        No bookings found
                    </h3>

                    <p>
                        You have not booked any services yet.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/services")
                        }
                    >
                        Book a Service
                    </button>

                </div>

            ) : (

                <div className="customer-bookings-grid">

                    {bookings.map((booking) => {

                        const status =
                            booking.status
                                ?.trim()
                                .toUpperCase()
                                .replace(" ", "_");

                        const paymentMethod =
                            booking.paymentMethod
                                ?.trim()
                                .toUpperCase()
                                .replace(" ", "_");

                        const paymentStatus =
                            booking.paymentStatus
                                ?.trim()
                                .toUpperCase();

                        const reviewStatus =
                            booking.reviewStatus
                                ?.trim()
                                .toUpperCase();

                        /*
                         * Online payment:
                         * Customer can pay whenever the
                         * booking is still unpaid.
                         */
                        const showOnlinePayment =
                            paymentMethod &&
                            paymentMethod !== "CASH" &&
                            paymentStatus !== "PAID";

                        /*
                         * Cash:
                         * Customer confirms payment only
                         * after service completion.
                         */
                        const showCashPayment =
                            status === "COMPLETED" &&
                            paymentMethod === "CASH" &&
                            paymentStatus !== "PAID";

                        /*
                         * Review:
                         * Only after completed service
                         * and completed payment.
                         */
                        const showReview =
                            status === "COMPLETED" &&
                            paymentStatus === "PAID" &&
                            reviewStatus !== "SUBMITTED";

                        return (

                            <div
                                className="customer-booking-card"
                                key={booking.id}
                            >

                                <div className="booking-card-heading">

                                    <h2>
                                        {formatValue(
                                            booking.serviceName,
                                            "Home Service"
                                        )}
                                    </h2>

                                    <span>
                                        Booking #{booking.id}
                                    </span>

                                </div>

                                <p>

                                    <strong>
                                        Technician:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.technicianName,
                                        "Not Assigned"
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Date:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.bookingDate
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Time:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.bookingTime
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Address:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.address
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Work Status:
                                    </strong>{" "}

                                    {getStatusText(
                                        booking.status
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Payment Method:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.paymentMethod,
                                        "Not Selected"
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Payment Status:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.paymentStatus,
                                        "PENDING"
                                    )}

                                </p>

                                <p>

                                    <strong>
                                        Review Status:
                                    </strong>{" "}

                                    {formatValue(
                                        booking.reviewStatus,
                                        "PENDING"
                                    )}

                                </p>

                                <div className="booking-actions">

                                    {showOnlinePayment && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openPayment(
                                                    booking
                                                )
                                            }
                                        >
                                            Pay Now
                                        </button>
                                    )}

                                    {showCashPayment && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openPayment(
                                                    booking
                                                )
                                            }
                                        >
                                            Confirm Cash Payment
                                        </button>
                                    )}

                                    {showReview && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openReview(
                                                    booking
                                                )
                                            }
                                        >
                                            Submit Review
                                        </button>
                                    )}

                                </div>

                                {paymentStatus === "PAID" && (

                                    <p className="paid-message">
                                        ✅ Payment Completed
                                    </p>
                                )}

                                {reviewStatus ===
                                    "SUBMITTED" && (

                                    <p className="reviewed-message">
                                        ⭐ Review Submitted
                                    </p>
                                )}

                                {status === "REJECTED" && (

                                    <p className="rejected-message">
                                        The technician rejected this request.
                                        The admin can assign another technician.
                                    </p>
                                )}

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default MyBookings;