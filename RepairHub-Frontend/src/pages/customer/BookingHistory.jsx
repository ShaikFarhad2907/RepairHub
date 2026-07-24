import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axiosConfig";
import "./BookingHistory.css";

function BookingHistory() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const customerEmail = localStorage.getItem("email");

   const loadBookingHistory = useCallback(async () => {
    if (!customerEmail) {
        setErrorMessage("Customer email not found. Please login again.");
        setLoading(false);
        return;
    }

    try {
        setLoading(true);
        setErrorMessage("");

        const encodedEmail = encodeURIComponent(customerEmail);

        const response = await api.get(
            `/bookings/customer-email/${encodedEmail}`
        );

        const allBookings = Array.isArray(response.data)
            ? response.data
            : [];

        console.log("All customer bookings:", allBookings);

        const historyBookings = allBookings.filter((booking) => {
            const status = String(booking.status || "")
                .trim()
                .toUpperCase()
                .replaceAll("-", "_")
                .replaceAll(" ", "_");

            return status === "COMPLETED" || status === "CANCELLED";
        });

        console.log("History bookings:", historyBookings);

        setBookings(historyBookings);
    } catch (error) {
        console.error("Booking history error:", error);

        setErrorMessage(
            error.response?.data?.message ||
                error.response?.data ||
                "Unable to load booking history"
        );

        setBookings([]);
    } finally {
        setLoading(false);
    }
}, [customerEmail]);

    useEffect(() => {
        const isLoggedIn =
            localStorage.getItem("isLoggedIn") === "true";

        const role = localStorage
            .getItem("role")
            ?.trim()
            .toUpperCase();

        if (!isLoggedIn || !customerEmail) {
            navigate("/login", {
                replace: true
            });

            return;
        }

        if (role !== "CUSTOMER") {
            navigate("/", {
                replace: true
            });

            return;
        }

        loadBookingHistory();
    }, [customerEmail, loadBookingHistory, navigate]);

    const formatStatus = (status) => {
        if (!status) {
            return "Not Available";
        }

        return status.replaceAll("_", " ");
    };

    const formatPaymentMethod = (paymentMethod) => {
        if (!paymentMethod) {
            return "Not Selected";
        }

        return paymentMethod.replaceAll("_", " ");
    };

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Not Available";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return dateValue;
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const openReviewPage = (booking) => {
        navigate("/review", {
            state: booking
        });
    };

    const canWriteReview = (booking) => {
        const bookingStatus = booking.status
            ?.trim()
            .toUpperCase()
            .replaceAll(" ", "_");

        const paymentStatus = booking.paymentStatus
            ?.trim()
            .toUpperCase();

        const reviewStatus = booking.reviewStatus
            ?.trim()
            .toUpperCase();

        return (
            bookingStatus === "COMPLETED" &&
            paymentStatus === "PAID" &&
            reviewStatus !== "SUBMITTED"
        );
    };

    if (loading) {
        return (
            <div className="history-page">
                <div className="history-message-card">
                    <h2>Loading booking history...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="history-page">
            <div className="history-header">
                <div>
                    <h1>Booking History</h1>

                    <p>
                        View your completed and cancelled service bookings.
                    </p>
                </div>

                <button
                    type="button"
                    className="history-refresh-button"
                    onClick={loadBookingHistory}
                >
                    Refresh
                </button>
            </div>

            {errorMessage && (
                <div className="history-message-card history-error">
                    <h2>Unable to load history</h2>

                    <p>{errorMessage}</p>

                    <button
                        type="button"
                        onClick={loadBookingHistory}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!errorMessage && bookings.length === 0 && (
                <div className="history-message-card">
                    <h2>No booking history found</h2>

                    <p>
                        Completed and cancelled bookings will appear here.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/services")}
                    >
                        Book a Service
                    </button>
                </div>
            )}

            {!errorMessage && bookings.length > 0 && (
                <div className="history-grid">
                    {bookings.map((booking) => {
                        const normalizedStatus = booking.status
                            ?.trim()
                            .toUpperCase()
                            .replaceAll(" ", "_");

                        const isCompleted =
                            normalizedStatus === "COMPLETED";

                        const paymentStatus =
                            booking.paymentStatus
                                ?.trim()
                                .toUpperCase() || "PENDING";

                        return (
                            <div
                                className="history-card"
                                key={booking.id}
                            >
                                <div className="history-card-header">
                                    <div>
                                        <h2>
                                            {booking.serviceName ||
                                                "Service Booking"}
                                        </h2>

                                        <span>
                                            Booking #{booking.id}
                                        </span>
                                    </div>

                                    <span
                                        className={`history-status ${
                                            isCompleted
                                                ? "completed"
                                                : "cancelled"
                                        }`}
                                    >
                                        {formatStatus(booking.status)}
                                    </span>
                                </div>

                                <div className="history-details">
                                    <p>
                                        <strong>Customer:</strong>{" "}
                                        {booking.customerName ||
                                            "Not Available"}
                                    </p>

                                    <p>
                                        <strong>Technician:</strong>{" "}
                                        {booking.technicianName ||
                                            "Not Assigned"}
                                    </p>

                                    <p>
                                        <strong>Booking Date:</strong>{" "}
                                        {formatDate(booking.bookingDate)}
                                    </p>

                                    <p>
                                        <strong>Service Address:</strong>{" "}
                                        {booking.address ||
                                            "Not Available"}
                                    </p>

                                    <p>
                                        <strong>Payment Method:</strong>{" "}
                                        {formatPaymentMethod(
                                            booking.paymentMethod
                                        )}
                                    </p>

                                    <p>
                                        <strong>Payment Status:</strong>{" "}
                                        <span
                                            className={`history-payment-status ${
                                                paymentStatus === "PAID"
                                                    ? "paid"
                                                    : "pending"
                                            }`}
                                        >
                                            {paymentStatus}
                                        </span>
                                    </p>
                                </div>

                                {booking.description && (
                                    <div className="history-description">
                                        <strong>Problem Description</strong>

                                        <p>{booking.description}</p>
                                    </div>
                                )}

                                {booking.reviewStatus === "SUBMITTED" && (
                                    <div className="history-review-submitted">
                                        ⭐ Review Submitted
                                    </div>
                                )}

                                {canWriteReview(booking) && (
                                    <button
                                        type="button"
                                        className="history-review-button"
                                        onClick={() =>
                                            openReviewPage(booking)
                                        }
                                    >
                                        Write Review
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BookingHistory;