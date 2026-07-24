import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import api from "../../api/axiosConfig";
import "./CustomerPayments.css";

function CustomerPayments() {

    const navigate = useNavigate();

    const [bookings, setBookings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [errorMessage, setErrorMessage] =
        useState("");

    const customerEmail =
        localStorage.getItem("email");

    const role =
        localStorage
            .getItem("role")
            ?.trim()
            .toUpperCase();

    const loadPayments = useCallback(
        async () => {

            if (!customerEmail) {
                return;
            }

            try {

                setLoading(true);
                setErrorMessage("");

                const encodedEmail =
                    encodeURIComponent(
                        customerEmail
                    );

                const response =
                    await api.get(
                        `/bookings/customer-email/${encodedEmail}`
                    );

                const allBookings =
                    Array.isArray(
                        response.data
                    )
                        ? response.data
                        : [];

                /*
                 * Show bookings that already have
                 * a payment method selected.
                 */
                const paymentBookings =
                    allBookings.filter(
                        (booking) =>
                            booking.paymentMethod &&
                            booking.paymentMethod
                                .trim() !== ""
                    );

                setBookings(
                    paymentBookings
                );

            } catch (error) {

                console.error(
                    "Payment loading error:",
                    error
                );

                setErrorMessage(
                    error.response?.data
                        ?.message ||
                    error.response?.data ||
                    "Unable to load payments"
                );

                setBookings([]);

            } finally {

                setLoading(false);
            }
        },
        [customerEmail]
    );

    useEffect(() => {

        const isLoggedIn =
            localStorage.getItem(
                "isLoggedIn"
            ) === "true";

        if (
            !isLoggedIn ||
            !customerEmail
        ) {

            navigate("/login", {
                replace: true
            });

            return;
        }

        if (role !== "CUSTOMER") {

            alert(
                "Only customers can access payments"
            );

            navigate("/", {
                replace: true
            });

            return;
        }

        loadPayments();

    }, [
        customerEmail,
        role,
        navigate,
        loadPayments
    ]);

    const openPayment = (booking) => {

        navigate("/payment", {
            state: booking
        });
    };

    const formatPaymentMethod = (
        method
    ) => {

        if (!method) {
            return "Not Selected";
        }

        return method
            .replaceAll("_", " ");
    };

    const getPaymentButtonText = (
        booking
    ) => {

        const paymentMethod =
            booking.paymentMethod
                ?.trim()
                .toUpperCase();

        const bookingStatus =
            booking.status
                ?.trim()
                .toUpperCase()
                .replace(" ", "_");

        if (
            paymentMethod === "CASH" &&
            bookingStatus === "COMPLETED"
        ) {
            return "Confirm Cash Payment";
        }

        if (
            paymentMethod === "CASH"
        ) {
            return "Pay After Service";
        }

        return "Pay Now";
    };

    const canMakePayment = (
        booking
    ) => {

        const paymentMethod =
            booking.paymentMethod
                ?.trim()
                .toUpperCase();

        const paymentStatus =
            booking.paymentStatus
                ?.trim()
                .toUpperCase();

        const bookingStatus =
            booking.status
                ?.trim()
                .toUpperCase()
                .replace(" ", "_");

        if (
            paymentStatus === "PAID"
        ) {
            return false;
        }

        if (
            paymentMethod === "CASH"
        ) {
            return (
                bookingStatus ===
                "COMPLETED"
            );
        }

        return true;
    };

    if (loading) {

        return (

            <div className="payments-page">

                <div className="payments-loading">

                    <h2>
                        Loading payments...
                    </h2>

                </div>

            </div>
        );
    }

    return (

        <div className="payments-page">

            <div className="payments-header">

                <div>

                    <h1>
                        My Payments
                    </h1>

                    <p>
                        View and manage your service
                        payments
                    </p>

                </div>

                <button
                    type="button"
                    className="refresh-payment-btn"
                    onClick={loadPayments}
                >
                    Refresh
                </button>

            </div>

            {errorMessage && (

                <div className="payments-error">

                    <p>
                        {errorMessage}
                    </p>

                    <button
                        type="button"
                        onClick={loadPayments}
                    >
                        Try Again
                    </button>

                </div>
            )}

            {!errorMessage &&
            bookings.length === 0 ? (

                <div className="no-payments">

                    <h2>
                        No payment records found
                    </h2>

                    <p>
                        Your payment details will
                        appear here after booking a
                        service.
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

                <div className="payments-grid">

                    {bookings.map(
                        (booking) => {

                            const paymentStatus =
                                booking
                                    .paymentStatus
                                    ?.trim()
                                    .toUpperCase() ||
                                "PENDING";

                            const isPaid =
                                paymentStatus ===
                                "PAID";

                            return (

                                <div
                                    className="payment-card"
                                    key={booking.id}
                                >

                                    <div className="payment-card-top">

                                        <div>

                                            <h2>
                                                {
                                                    booking.serviceName
                                                }
                                            </h2>

                                            <span>
                                                Booking #
                                                {booking.id}
                                            </span>

                                        </div>

                                        <span
                                            className={
                                                isPaid
                                                    ? "payment-badge paid"
                                                    : "payment-badge pending"
                                            }
                                        >
                                            {
                                                paymentStatus
                                            }
                                        </span>

                                    </div>

                                    <div className="payment-details">

                                        <p>

                                            <strong>
                                                Technician:
                                            </strong>{" "}

                                            {booking
                                                .technicianName ||
                                                "Not Assigned"}

                                        </p>

                                        <p>

                                            <strong>
                                                Booking Date:
                                            </strong>{" "}

                                            {booking
                                                .bookingDate ||
                                                "Not Available"}

                                        </p>

                                        <p>

                                            <strong>
                                                Payment Method:
                                            </strong>{" "}

                                            {formatPaymentMethod(
                                                booking
                                                    .paymentMethod
                                            )}

                                        </p>

                                        <p>

                                            <strong>
                                                Service Status:
                                            </strong>{" "}

                                            {booking.status
                                                ?.replaceAll(
                                                    "_",
                                                    " "
                                                ) ||
                                                "PENDING"}

                                        </p>

                                    </div>

                                    {isPaid ? (

                                        <div className="payment-success">

                                            ✅ Payment Completed

                                        </div>

                                    ) : (

                                        <button
                                            type="button"
                                            className="make-payment-btn"
                                            disabled={
                                                !canMakePayment(
                                                    booking
                                                )
                                            }
                                            onClick={() =>
                                                openPayment(
                                                    booking
                                                )
                                            }
                                        >
                                            {getPaymentButtonText(
                                                booking
                                            )}
                                        </button>
                                    )}

                                    {!isPaid &&
                                    booking.paymentMethod
                                        ?.toUpperCase() ===
                                        "CASH" &&
                                    booking.status
                                        ?.toUpperCase()
                                        .replace(
                                            " ",
                                            "_"
                                        ) !==
                                        "COMPLETED" && (

                                        <p className="cash-wait-message">

                                            Cash payment can be
                                            confirmed after the
                                            service is completed.

                                        </p>
                                    )}

                                </div>
                            );
                        }
                    )}

                </div>
            )}

        </div>
    );
}

export default CustomerPayments;