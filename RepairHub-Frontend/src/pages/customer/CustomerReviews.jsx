import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import api from "../../api/axiosConfig";
import "./CustomerReviews.css";

function CustomerReviews() {

    const navigate = useNavigate();

    const [bookings, setBookings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const customerEmail =
        localStorage.getItem("email");

    const loadReviews = useCallback(async () => {

        try {

            const response = await api.get(
                `/bookings/customer-email/${encodeURIComponent(customerEmail)}`
            );

            const data =
                Array.isArray(response.data)
                    ? response.data
                    : [];

            setBookings(data);

        } catch (error) {

            console.error(error);

            alert(
                "Unable to load reviews"
            );

        } finally {

            setLoading(false);
        }

    }, [customerEmail]);

    useEffect(() => {

        loadReviews();

    }, [loadReviews]);

    const writeReview = (booking) => {

        navigate("/review", {
            state: booking
        });

    };

    if (loading) {

        return <h2>Loading...</h2>;
    }

    return (

        <div className="reviews-page">

            <h1>My Reviews</h1>

            <div className="reviews-grid">

                {bookings.map((booking) => {

                    const canReview =

                        booking.status ===
                            "COMPLETED" &&

                        booking.paymentStatus ===
                            "PAID" &&

                        booking.reviewStatus !==
                            "SUBMITTED";

                    return (

                        <div
                            className="review-card"
                            key={booking.id}
                        >

                            <h2>
                                {booking.serviceName}
                            </h2>

                            <p>

                                <strong>
                                    Technician:
                                </strong>{" "}

                                {booking.technicianName ||
                                    "Not Assigned"}

                            </p>

                            <p>

                                <strong>
                                    Booking Date:
                                </strong>{" "}

                                {booking.bookingDate}

                            </p>

                            <p>

                                <strong>
                                    Review Status:
                                </strong>{" "}

                                {booking.reviewStatus}

                            </p>

                            {canReview && (

                                <button
                                    onClick={() =>
                                        writeReview(
                                            booking
                                        )
                                    }
                                >

                                    Write Review

                                </button>

                            )}

                            {booking.reviewStatus ===
                                "SUBMITTED" && (

                                <div className="review-success">

                                    ⭐ Review Submitted

                                </div>

                            )}

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default CustomerReviews;