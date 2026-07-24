import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "./ViewBookings.css";


function ViewBookings(){

    const [bookings,setBookings] =
        useState([]);

    const [technicians,setTechnicians] =
        useState([]);


    const loadData = async()=>{

        try{

            const bookingResponse =
                await api.get("/bookings");


            const technicianResponse =
                await api.get("/users/technicians");


            setBookings(
                bookingResponse.data
            );


            setTechnicians(
                technicianResponse.data
            );


        }catch(error){

            console.log(error);

            alert(
                "Unable to load bookings"
            );

        }

    };



    useEffect(()=>{

        loadData();

    },[]);



    const assignTechnician = async(
        bookingId,
        technicianName
    )=>{


        if(!technicianName){

            alert(
                "Please select technician"
            );

            return;
        }


        try{


            await api.put(
 `/bookings/assign/${bookingId}/${encodeURIComponent(technicianName)}`
);


            alert(
                "Technician assigned successfully"
            );


            loadData();


        }catch(error){

            console.log(error);

            alert(
                "Assignment failed"
            );

        }

    };



    return(

        <div className="view-bookings-page">


            <h1>
                Manage Bookings
            </h1>


            <div className="admin-booking-grid">


            {
                bookings.map((booking)=>(


                    <div
                    className="admin-booking-card"
                    key={booking.id}
                    >


                        <h2>
                            {booking.serviceName}
                        </h2>


                        <p>
                            <strong>
                            Customer:
                            </strong>
                            {" "}
                            {booking.customerName}
                        </p>


                        <p>
                            <strong>
                            Phone:
                            </strong>
                            {" "}
                            {booking.customerPhone}
                        </p>


                        <p>
                            <strong>
                            Date:
                            </strong>
                            {" "}
                            {booking.bookingDate}
                        </p>


                        <p>
                            <strong>
                            Time:
                            </strong>
                            {" "}
                            {booking.bookingTime}
                        </p>


                        <p>
                            <strong>
                            Status:
                            </strong>
                            {" "}
                            {booking.status}
                        </p>



                        <p>
                            <strong>
                            Technician:
                            </strong>

                            {" "}

                            {
                                booking.technicianName
                                ?
                                booking.technicianName
                                :
                                "Not Assigned"
                            }

                        </p>



                        {
                            !booking.technicianName && (

                            <div className="assign-section">


                                <select
                                id={`tech-${booking.id}`}
                                >

                                    <option value="">
                                        Select Technician
                                    </option>


                                    {
                                        technicians.map(
                                            (tech)=>(

                                            <option
                                            key={tech.id}
                                            value={tech.fullName}
                                            >

                                                {tech.fullName}

                                            </option>

                                        ))
                                    }


                                </select>



                                <button
                                onClick={()=>{

                                    const select =
                                    document.getElementById(
                                        `tech-${booking.id}`
                                    );


                                    assignTechnician(
                                        booking.id,
                                        select.value
                                    );

                                }}
                                >

                                    Assign

                                </button>


                            </div>

                            )

                        }


                    </div>


                ))

            }


            </div>


        </div>

    );

}


export default ViewBookings;