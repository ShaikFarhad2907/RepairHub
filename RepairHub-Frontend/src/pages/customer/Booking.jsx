import { useState } from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

import api from "../../api/axiosConfig";
import "./Booking.css";

function Booking() {

    const navigate = useNavigate();
    const location = useLocation();

    const service = location.state;

    const [booking, setBooking] = useState({

        customerName:
            localStorage.getItem("name") || "",

        customerEmail:
            localStorage.getItem("email") || "",

        customerPhone:
            localStorage.getItem("phone") || "",

        address:
            localStorage.getItem("address") || "",

        serviceName:
            service?.serviceName || "",

        bookingDate: "",
        bookingTime: "",
        description: "",
        image: "",
        technicianName: "",

        status: "PENDING",
        paymentMethod: "",
        paymentStatus: "PENDING",
        reviewStatus: "PENDING"

    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (event) => {

        const { name, value } =
            event.target;

        setBooking((previousBooking) => ({

            ...previousBooking,
            [name]: value

        }));
    };

    const handleImage = (event) => {

        const selectedFile =
            event.target.files[0];

        setBooking((previousBooking) => ({

            ...previousBooking,
            image: selectedFile?.name || ""

        }));
    };

    const confirmBooking = async (event) => {

        event.preventDefault();

        if (!booking.paymentMethod) {

            alert(
                "Please select a payment method"
            );

            return;
        }

        try {

            setLoading(true);

            /*
             * First create the booking.
             */
            const response = await api.post(
                "/bookings",
                booking
            );

            /*
             * Use the booking returned by the backend.
             * It contains the generated booking ID.
             */
            const createdBooking =
                response.data;

            /*
             * Online payment:
             * customer pays immediately.
             */
            if (
                booking.paymentMethod === "UPI" ||
                booking.paymentMethod ===
                    "DEBIT_CARD" ||
                booking.paymentMethod ===
                    "CREDIT_CARD"
            ) {

                navigate("/payment", {

                    state: createdBooking

                });

                return;
            }

            /*
             * Cash payment:
             * customer pays only after
             * technician completes the service.
             */
            if (
                booking.paymentMethod === "CASH"
            ) {

                await api.put(
                    `/bookings/payment-method/${createdBooking.id}`,
                    {
                        paymentMethod: "CASH"
                    }
                );

                alert(
                    "Booking placed successfully. Pay cash after service completion."
                );

                navigate("/", {
                    replace: true
                });
            }

        } catch (error) {

            console.error(
                "Booking error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Booking failed"
            );

        } finally {

            setLoading(false);
        }
    };

    if (!service) {

        return (

            <div className="booking-page">

                <div className="booking-right">

                    <h2>
                        Service information not found
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

        <div className="booking-page">

            <div className="booking-left">

             <img
    src={service.image || "/images/default-service.png"}
    alt={service.serviceName}
/>

                <h2>
                    {service.serviceName}
                </h2>

                <h3>
                    {service.price}
                </h3>

                <p>
                    {service.rating}
                </p>

                <p>
                    {service.duration}
                </p>

            </div>

            <div className="booking-right">

                <form onSubmit={confirmBooking}>

                    <h2>Book Service</h2>

                    <input
                        type="text"
                        name="customerName"
                        value={booking.customerName}
                        readOnly
                    />

                    <input
                        type="email"
                        name="customerEmail"
                        value={booking.customerEmail}
                        readOnly
                    />

                    <input
                        type="text"
                        name="customerPhone"
                        placeholder="Phone Number"
                        value={booking.customerPhone}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={booking.address}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        value={booking.serviceName}
                        readOnly
                    />

                    <textarea
                        name="description"
                        placeholder="Describe the problem"
                        value={booking.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                    <input
    type="date"
    name="bookingDate"
    value={booking.bookingDate}
    min={
        new Date()
        .toISOString()
        .split("T")[0]
    }
    onChange={handleChange}
    required
/>
                    <input
                        type="time"
                        name="bookingTime"
                        value={booking.bookingTime}
                        onChange={handleChange}
                        required
                    />

                    <h3>Select Payment Method</h3>

                    <div className="booking-payment-options">

                        <label>

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="UPI"
                                checked={
                                    booking.paymentMethod ===
                                    "UPI"
                                }
                                onChange={handleChange}
                            />

                            UPI

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="DEBIT_CARD"
                                checked={
                                    booking.paymentMethod ===
                                    "DEBIT_CARD"
                                }
                                onChange={handleChange}
                            />

                            Debit Card

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="CREDIT_CARD"
                                checked={
                                    booking.paymentMethod ===
                                    "CREDIT_CARD"
                                }
                                onChange={handleChange}
                            />

                            Credit Card

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="CASH"
                                checked={
                                    booking.paymentMethod ===
                                    "CASH"
                                }
                                onChange={handleChange}
                            />

                            Cash After Service

                        </label>

                    </div>

                    {booking.paymentMethod ===
                        "CASH" && (

                        <p className="cash-note">

                            You can pay cash only after
                            the technician completes the
                            service.

                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Booking..."
                            : booking.paymentMethod ===
                              "CASH"
                            ? "Confirm Booking"
                            : "Proceed To Payment"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default Booking;