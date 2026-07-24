import {
    useEffect,
    useState
} from "react";

import api from "../../api/axiosConfig";

import "./Earnings.css";


function Earnings() {


    const [totalEarnings, setTotalEarnings] =
        useState(0);


    const [completedBookings, setCompletedBookings] =
        useState([]);


    const [loading, setLoading] =
        useState(true);



    const technician =
        localStorage.getItem("name") || "";





    useEffect(() => {


        loadEarnings();


    }, []);







    const loadEarnings = async () => {


        try {


            console.log(
                "Technician:",
                technician
            );



            if(!technician){

                console.log(
                    "Technician name missing"
                );

                return;

            }





            // =========================
            // Get Total Earnings
            // =========================


            const earningResponse =
                await api.get(

                    `/bookings/technician/earnings/${encodeURIComponent(
                        technician
                    )}`

                );



            console.log(
                "Earnings Response:",
                earningResponse.data
            );



            setTotalEarnings(

                Number(
                    earningResponse.data || 0
                )

            );







            // =========================
            // Get Technician Bookings
            // =========================


            const bookingResponse =
                await api.get(

                    `/bookings/technician/${encodeURIComponent(
                        technician
                    )}`

                );



            console.log(
                "Bookings:",
                bookingResponse.data
            );






            const completed =

                bookingResponse.data.filter(

                    (booking) =>


                        booking.status
                        ?.toUpperCase()
                        ===
                        "COMPLETED"


                        &&


                        booking.paymentStatus
                        ?.toUpperCase()
                        ===
                        "PAID"


                );





            setCompletedBookings(
                completed
            );



        }


        catch(error){


            console.error(
                "Earnings Error:",
                error
            );


        }


        finally{


            setLoading(false);


        }


    };







    if(loading){


        return (

            <div className="earnings-page">


                <h2>
                    Loading earnings...
                </h2>


            </div>

        );

    }







    return (


        <div className="earnings-page">





            <div className="earnings-header">


                <h1>
                    💰 My Earnings
                </h1>


                <p>
                    Track your completed service earnings
                </p>


            </div>







            <div className="earnings-summary">





                <div className="earning-card">


                    <h3>
                        Total Earnings
                    </h3>


                    <h1>
                        ₹ {totalEarnings}
                    </h1>


                </div>






                <div className="earning-card">


                    <h3>
                        Completed Jobs
                    </h3>


                    <h1>
                        {completedBookings.length}
                    </h1>


                </div>






                <div className="earning-card">


                    <h3>
                        Paid Services
                    </h3>


                    <h1>
                        {completedBookings.length}
                    </h1>


                </div>





            </div>








            <h2 className="history-title">

                Payment History

            </h2>








            {

            completedBookings.length === 0 ?


            (

                <div className="empty-earnings">


                    <h2>
                        No earnings yet
                    </h2>


                    <p>
                        Completed paid services will appear here.
                    </p>


                </div>

            )



            :



            (

            <div className="earnings-grid">



            {

            completedBookings.map(

                (booking)=>(


                <div

                    className="earning-history-card"

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
                            Amount:
                        </strong>

                        {" ₹"}

                        {booking.amount}

                    </p>







                    <p>

                        <strong>
                            Date:
                        </strong>

                        {" "}

                        {booking.bookingDate}

                    </p>







                    <span>

                        PAID

                    </span>





                </div>


                )

            )

            }





            </div>

            )


            }




        </div>


    );


}


export default Earnings;