import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "./TechnicianDashboard.css";


function TechnicianDashboard() {


    const navigate = useNavigate();


    const [pendingBookings, setPendingBookings] =
        useState([]);


    const [assignedBookings, setAssignedBookings] =
        useState([]);



    const [earnings, setEarnings] =
        useState(0);




    const technician =
        localStorage.getItem("name") || "";





    useEffect(() => {

        loadBookings();

        loadEarnings();

    }, []);








    const loadBookings = async () => {


        try {


            const response =
                await api.get("/bookings");


            const allBookings =
                response.data;





            const technicianPendingBookings =
                allBookings.filter((booking) =>


                    booking.technicianName
                        ?.trim()
                        .toLowerCase()
                    ===
                    technician
                        ?.trim()
                        .toLowerCase()


                    &&


                    booking.status
                        ?.toUpperCase()
                    ===
                    "PENDING"


                );







            const technicianAssignedBookings =
                allBookings.filter((booking) =>


                    booking.technicianName
                        ?.trim()
                        .toLowerCase()
                    ===
                    technician
                        ?.trim()
                        .toLowerCase()



                    &&



                    booking.status
                        ?.toUpperCase()
                    !==
                    "PENDING"



                    &&



                    booking.status
                        ?.toUpperCase()
                    !==
                    "REJECTED"



                );







            setPendingBookings(
                technicianPendingBookings
            );



            setAssignedBookings(
                technicianAssignedBookings
            );




        }
        catch(error){


            console.log(error);


            alert(
                "Unable to load technician bookings"
            );


        }


    };









    const loadEarnings = async () => {


        try {


            const response =
                await api.get(
                    `/bookings/technician/earnings/${technician}`
                );


            setEarnings(
                response.data
            );


        }
        catch(error){


            console.log(
                "Earnings error:",
                error
            );


        }


    };









    const updateStatus = async(
        bookingId,
        status
    )=>{


        try{


            console.log(
                "Updating status:",
                bookingId,
                status
            );



            await api.put(

                `/bookings/status/${bookingId}/${status}`

            );



            alert(
                `Booking ${status}`
            );



            await loadBookings();

            await loadEarnings();



        }

        catch(error){


            console.log(
                error.response?.data
            );


            alert(
                error.response?.data ||
                "Unable to update booking status"
            );


        }


    };








    const acceptBooking = (bookingId)=>{


        updateStatus(
            bookingId,
            "ACCEPTED"
        );


    };





    const rejectBooking = (bookingId)=>{


        updateStatus(
            bookingId,
            "REJECTED"
        );


    };





    const startWork = (bookingId)=>{


        updateStatus(
            bookingId,
            "IN_PROGRESS"
        );


    };





    const completeWork = (bookingId)=>{


        updateStatus(
            bookingId,
            "COMPLETED"
        );


    };






    const today =
        new Date()
        .toISOString()
        .split("T")[0];






    const todayJobs =

        assignedBookings.filter(

            (booking)=>

                booking.bookingDate === today

        ).length;






    const completedJobs =

        assignedBookings.filter(

            (booking)=>

                booking.status
                ?.toUpperCase()
                ===
                "COMPLETED"

        ).length;

            return (

        <div className="technician-dashboard">


            <h1>
                Technician Dashboard
            </h1>



            <p className="welcome-technician">

                Welcome, {technician}

            </p>





            <div className="dashboard-grid">



                <Link

                    to="/technician/bookings"

                    className="dashboard-box"

                >

                    <h2>
                        📋 My Bookings
                    </h2>


                    <h1>
                        {assignedBookings.length}
                    </h1>


                    <p>
                        View assigned bookings
                    </p>


                </Link>







                <div className="dashboard-box">


                    <h2>
                        📅 Today's Jobs
                    </h2>


                    <h1>
                        {todayJobs}
                    </h1>


                    <p>
                        Jobs scheduled today
                    </p>


                </div>








                <div

                    className="dashboard-box completed-box"

                    onClick={() =>
                        navigate(
                            "/technician/completed"
                        )
                    }

                >


                    <h2>
                        ✅ Completed Jobs
                    </h2>


                    <h1>
                        {completedJobs}
                    </h1>


                    <p>
                        View completed services
                    </p>


                </div>









                <div className="dashboard-box">


                    <h2>
                        ⏳ Pending Requests
                    </h2>


                    <h1>
                        {pendingBookings.length}
                    </h1>


                    <p>
                        Waiting for response
                    </p>


                </div>







                <Link

    to="/technician/earnings"

    className="dashboard-box"

>


    <h2>
        💰 Earnings
    </h2>


    <h1>
        ₹{earnings}
    </h1>


    <p>
        View earnings history
    </p>


</Link>





            </div>









            <div className="today-bookings">


                <h2>
                    New Booking Requests
                </h2>




                <table>


                    <thead>

                        <tr>

                            <th>Customer</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>




                    <tbody>


                    {

                    pendingBookings.length > 0 ?


                    pendingBookings.map((booking)=>(


                        <tr key={booking.id}>


                            <td>
                                {booking.customerName}
                            </td>


                            <td>
                                {booking.serviceName}
                            </td>


                            <td>
                                {booking.bookingDate}
                            </td>


                            <td>
                                {booking.bookingTime}
                            </td>


                            <td>
                                {booking.address}
                            </td>



                            <td>

                                <span className="status-pending">

                                    PENDING

                                </span>

                            </td>





                            <td>


                                <button

                                    className="accept-btn"

                                    onClick={() =>
                                        acceptBooking(
                                            booking.id
                                        )
                                    }

                                >

                                    Accept

                                </button>




                                <button

                                    className="reject-btn"

                                    onClick={() =>
                                        rejectBooking(
                                            booking.id
                                        )
                                    }

                                >

                                    Reject

                                </button>


                            </td>



                        </tr>


                    ))


                    :


                    <tr>

                        <td colSpan="7">

                            No Pending Booking Requests

                        </td>

                    </tr>


                    }



                    </tbody>


                </table>



            </div>









            <div className="today-bookings">


                <h2>
                    Accepted and Ongoing Jobs
                </h2>




                <table>


                    <thead>


                        <tr>

                            <th>Customer</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>


                    </thead>




                    <tbody>


                    {


                    assignedBookings.length > 0 ?


                    assignedBookings.map((booking)=>(


                        <tr key={booking.id}>


                            <td>
                                {booking.customerName}
                            </td>


                            <td>
                                {booking.serviceName}
                            </td>


                            <td>
                                {booking.bookingDate}
                            </td>


                            <td>
                                {booking.bookingTime}
                            </td>




                            <td>

                                {booking.status}

                            </td>




                            <td>


                            {

                            booking.status === "ACCEPTED"

                            &&

                            (

                                <button

                                className="start-btn"

                                onClick={() =>
                                    startWork(
                                        booking.id
                                    )
                                }

                                >

                                    Start Work

                                </button>

                            )

                            }







                            {

                            booking.status === "IN_PROGRESS"

                            &&

                            (

                                <button

                                className="complete-btn"

                                onClick={() =>
                                    completeWork(
                                        booking.id
                                    )
                                }

                                >

                                    Complete Work

                                </button>

                            )

                            }







                            {

                            booking.status === "COMPLETED"

                            &&

                            (

                                <span className="completed-text">

                                    Completed

                                </span>

                            )

                            }



                            </td>



                        </tr>


                    ))



                    :



                    <tr>

                        <td colSpan="6">

                            No Assigned Jobs

                        </td>

                    </tr>


                    }



                    </tbody>


                </table>


            </div>





        </div>

    );


}


export default TechnicianDashboard;