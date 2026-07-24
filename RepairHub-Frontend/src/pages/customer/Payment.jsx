import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosConfig";
import "./Payment.css";

function Payment() {

    const location = useLocation();
    const navigate = useNavigate();

    const booking = location.state;

    const [paymentMethod, setPaymentMethod] =
        useState(booking?.paymentMethod || "");

    const [upiId, setUpiId] =
        useState("");

    const [card, setCard] =
        useState({
            cardHolder: "",
            cardNumber: "",
            expiry: "",
            cvv: ""
        });

    const [loading, setLoading] =
        useState(false);

    const bookingStatus =
        booking?.status?.toUpperCase() || "";

    const handleCardChange = (event) => {

        const { name, value } =
            event.target;

        let updatedValue = value;

        if (
            name === "cardNumber" ||
            name === "cvv"
        ) {
            updatedValue =
                value.replace(/\D/g, "");
        }

        setCard((previousCard) => ({
            ...previousCard,
            [name]: updatedValue
        }));
    };

    const completePayment = async (event) => {

        event.preventDefault();

        if (!booking?.id) {
            alert("Booking information not found");
            return;
        }

        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }

        if (
            paymentMethod === "CASH" &&
            bookingStatus !== "COMPLETED"
        ) {
            alert(
                "Cash payment can be confirmed only after service completion"
            );
            return;
        }

        if (
            paymentMethod === "UPI" &&
            !upiId.trim()
        ) {
            alert("Please enter your UPI ID");
            return;
        }

        if (
            paymentMethod === "DEBIT_CARD" ||
            paymentMethod === "CREDIT_CARD"
        ) {

            const cleanCardNumber =
                card.cardNumber.replace(/\s/g, "");

            if (
                !card.cardHolder.trim() ||
                !cleanCardNumber ||
                !card.expiry ||
                !card.cvv
            ) {
                alert("Please enter all card details");
                return;
            }

            if (!/^\d{16}$/.test(cleanCardNumber)) {
                alert(
                    "Card number must contain 16 digits"
                );
                return;
            }

            if (!/^\d{3}$/.test(card.cvv)) {
                alert(
                    "CVV must contain 3 digits"
                );
                return;
            }
        }

        try {

            setLoading(true);

            await api.put(
                `/bookings/payment/${booking.id}`,
                {
                    paymentMethod: paymentMethod
                }
            );

            alert("Payment Successful");

            navigate("/", {
                replace: true
            });

        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Payment failed"
            );

        } finally {

            setLoading(false);
        }
    };

    if (!booking) {

        return (

            <div className="payment-page">

                <div className="payment-card">

                    <h2>
                        Booking information not found
                    </h2>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/services")
                        }
                    >
                        View Services
                    </button>

                </div>

            </div>
        );
    }

    return (

        <div className="payment-page">

            <form
                className="payment-card"
                onSubmit={completePayment}
            >

                <h1>Complete Payment</h1>

                <div className="payment-booking-info">

                    <p>
                        <strong>Service:</strong>{" "}
                        {booking.serviceName}
                    </p>

                    <p>
                        <strong>Technician:</strong>{" "}
                        {booking.technicianName ||
                            "Not Assigned"}
                    </p>

                    <p>
                        <strong>Work Status:</strong>{" "}
                        {booking.status}
                    </p>

                    <p>
                        <strong>Payment Method:</strong>{" "}
                        {paymentMethod || "Not Selected"}
                    </p>

                </div>

                {paymentMethod === "CASH" &&
                    bookingStatus !== "COMPLETED" && (

                    <div className="payment-warning">

                        Cash payment becomes available only
                        after the technician completes the
                        service.

                    </div>
                )}

                <h3>Select Payment Method</h3>

                <div className="payment-options">

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="UPI"
                            checked={
                                paymentMethod === "UPI"
                            }
                            onChange={(event) =>
                                setPaymentMethod(
                                    event.target.value
                                )
                            }
                        />

                        UPI

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="DEBIT_CARD"
                            checked={
                                paymentMethod ===
                                "DEBIT_CARD"
                            }
                            onChange={(event) =>
                                setPaymentMethod(
                                    event.target.value
                                )
                            }
                        />

                        Debit Card

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CREDIT_CARD"
                            checked={
                                paymentMethod ===
                                "CREDIT_CARD"
                            }
                            onChange={(event) =>
                                setPaymentMethod(
                                    event.target.value
                                )
                            }
                        />

                        Credit Card

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CASH"
                            checked={
                                paymentMethod === "CASH"
                            }
                            onChange={(event) =>
                                setPaymentMethod(
                                    event.target.value
                                )
                            }
                        />

                        Cash After Service

                    </label>

                </div>

                {paymentMethod === "UPI" && (

                    <div className="payment-fields">

                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(event) =>
                                setUpiId(
                                    event.target.value
                                )
                            }
                            required
                        />

                        <small>
                            Example: name@upi
                        </small>

                    </div>
                )}

                {(
                    paymentMethod === "DEBIT_CARD" ||
                    paymentMethod === "CREDIT_CARD"
                ) && (

                    <div className="payment-fields">

                        <input
                            type="text"
                            name="cardHolder"
                            placeholder="Card Holder Name"
                            value={card.cardHolder}
                            onChange={handleCardChange}
                            required
                        />

                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="16-digit Card Number"
                            value={card.cardNumber}
                            onChange={handleCardChange}
                            maxLength={16}
                            inputMode="numeric"
                            required
                        />

                        <input
                            type="month"
                            name="expiry"
                            value={card.expiry}
                            onChange={handleCardChange}
                            required
                        />

                        <input
                            type="password"
                            name="cvv"
                            placeholder="CVV"
                            value={card.cvv}
                            onChange={handleCardChange}
                            maxLength={3}
                            inputMode="numeric"
                            required
                        />

                    </div>
                )}

                {paymentMethod === "CASH" && (

                    <div className="cash-message">

                        Pay the technician after the service
                        is completed.

                    </div>
                )}

                <button
                    type="submit"
                    disabled={
                        loading ||
                        (
                            paymentMethod === "CASH" &&
                            bookingStatus !== "COMPLETED"
                        )
                    }
                >

                    {loading
                        ? "Processing..."
                        : paymentMethod === "CASH"
                        ? "Confirm Cash Payment"
                        : "Pay Now"}

                </button>

            </form>

        </div>
    );
}

export default Payment;