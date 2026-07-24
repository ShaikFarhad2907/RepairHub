import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./MyBookings.css";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    const technician =
    localStorage.getItem("name");

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

           const response = await api.get(
    `/bookings/technician/${technician}`
);

setBookings(response.data); 

        } catch (error) {

            console.log(error);

            alert("Unable to load bookings");

        }
    };

    return (

        <div className="my-bookings">

            <h1>My Bookings</h1>

            <table>

                <thead>

                    <tr>

                        <th>Service</th>
                        <th>Technician</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Review</th>

                    </tr>

                </thead>

                <tbody>

                    {bookings.length > 0 ? (

                        bookings.map((booking) => (

                            <tr key={booking.id}>

                                <td>
                                    {booking.serviceName}
                                </td>

                                <td>

                                    {booking.technicianName
                                        ? booking.technicianName
                                        : "Not Assigned"}

                                </td>

                                <td>
                                    {booking.bookingDate}
                                </td>

                                <td>
                                    {booking.bookingTime}
                                </td>

                                <td>

                                    <span
                                        className={`booking-status ${
                                            booking.status
                                                ?.toLowerCase()
                                                .replace(" ", "-")
                                        }`}
                                    >
                                        {booking.status}
                                    </span>

                                </td>

                                <td>

                                    {booking.status === "Completed" &&
                                    booking.paymentStatus === "Pending" ? (

                                        <button
                                            className="payment-button"
                                            onClick={() =>
                                                navigate("/payment", {
                                                    state: booking
                                                })
                                            }
                                        >
                                            Pay Now
                                        </button>

                                    ) : booking.paymentStatus === "Paid" ? (

                                        <span className="paid-status">
                                            Paid
                                        </span>

                                    ) : (

                                        <span className="not-available">
                                            Not Available
                                        </span>
                                    )}

                                </td>

                                <td>

                                    {booking.status === "Completed" &&
                                    booking.paymentStatus === "Paid" &&
                                    booking.reviewStatus === "Pending" ? (

                                        <button
                                            className="review-button"
                                            onClick={() =>
                                                navigate("/review", {
                                                    state: booking
                                                })
                                            }
                                        >
                                            Give Review
                                        </button>

                                    ) : booking.reviewStatus ===
                                      "Submitted" ? (

                                        <span className="reviewed-status">
                                            Reviewed
                                        </span>

                                    ) : (

                                        <span className="not-available">
                                            Not Available
                                        </span>
                                    )}

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="7">

                                No Bookings Found

                            </td>

                        </tr>
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default MyBookings;