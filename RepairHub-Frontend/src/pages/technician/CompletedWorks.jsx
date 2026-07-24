import {
    useEffect,
    useState
} from "react";

import api from "../../api/axiosConfig";

import "./CompletedWorks.css";


function CompletedWorks() {


    const [completedWorks, setCompletedWorks] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const technician =
        localStorage.getItem("name");



    useEffect(() => {

        loadCompletedWorks();

    }, []);



    const loadCompletedWorks = async () => {


        try {


            const response =
                await api.get(
                    `/bookings/technician/${encodeURIComponent(
                        technician
                    )}`
                );



            const completed =
                response.data.filter(
                    (booking) =>
                        booking.status === "COMPLETED"
                );



            setCompletedWorks(
                completed
            );



        } catch(error) {


            console.log(error);


            alert(
                "Unable to load completed works"
            );


        } finally {


            setLoading(false);

        }

    };



    if(loading){


        return (

            <div className="completed-page">

                <h2>
                    Loading completed works...
                </h2>

            </div>

        );

    }



    return (

        <div className="completed-page">


            <div className="completed-header">

                <h1>
                    Completed Works
                </h1>

                <p>
                    View all services completed by you
                </p>

            </div>




            {
                completedWorks.length === 0 ?


                (

                    <div className="empty-completed">

                        <h2>
                            No Completed Works
                        </h2>

                        <p>
                            Completed services will appear here.
                        </p>

                    </div>

                )


                :

                (


                <div className="completed-grid">


                {
                    completedWorks.map(
                        (booking)=>(


                        <div
                            className="completed-card"
                            key={booking.id}
                        >


                            <div className="completed-title">


                                <h2>
                                    {booking.serviceName}
                                </h2>


                                <span>
                                    COMPLETED
                                </span>


                            </div>



                            <div className="completed-details">


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
                                        Address:
                                    </strong>

                                    {" "}

                                    {booking.address}

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
                                        Problem:
                                    </strong>

                                    {" "}

                                    {booking.description}

                                </p>



                                <p>

                                    <strong>
                                        Payment:
                                    </strong>

                                    {" "}

                                    {booking.paymentStatus}

                                </p>


                            </div>



                        </div>


                    ))
                }


                </div>


                )

            }



        </div>

    );

}


export default CompletedWorks;