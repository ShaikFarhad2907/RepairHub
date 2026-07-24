import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "./ManageTechnicians.css";


function ManageTechnicians() {

    const [technicians, setTechnicians] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const loadTechnicians = async () => {

        try {

            const response =
                await api.get(
                    "/users/technicians/pending"
                );

            setTechnicians(response.data);


        } catch(error) {

            console.error(error);

            alert(
                "Unable to load technicians"
            );

        } finally {

            setLoading(false);
        }

    };


    useEffect(() => {

        loadTechnicians();

    }, []);



    const approveTechnician = async(id)=>{

        try{

            await api.put(
                `/users/technician/approve/${id}`
            );


            alert(
                "Technician approved successfully"
            );


            loadTechnicians();


        }catch(error){

            console.error(error);

            alert(
                "Approval failed"
            );

        }

    };



    const rejectTechnician = async(id)=>{

        try{

            await api.put(
                `/users/technician/reject/${id}`
            );


            alert(
                "Technician rejected"
            );


            loadTechnicians();


        }catch(error){

            console.error(error);

            alert(
                "Rejection failed"
            );

        }

    };



    if(loading){

        return (

            <div className="manage-technicians-page">

                <h2>
                    Loading technicians...
                </h2>

            </div>

        );

    }



    return (

        <div className="manage-technicians-page">


            <h1>
                Manage Technicians
            </h1>


            <p className="page-description">
                Verify technicians before they can access RepairHub.
            </p>



            {
                technicians.length === 0 ?

                (

                    <div className="empty-technician">

                        <h2>
                            No pending technicians
                        </h2>

                        <p>
                            All technician requests are reviewed.
                        </p>

                    </div>

                )

                :

                (

                <div className="technician-grid">


                {
                    technicians.map((technician)=>(


                        <div
                            className="technician-card"
                            key={technician.id}
                        >


                            <div className="technician-avatar">

                                👨‍🔧

                            </div>


                            <h2>
                                {technician.fullName}
                            </h2>


                            <p>
                                <strong>Email:</strong>
                                {" "}
                                {technician.email}
                            </p>


                            <p>
                                <strong>Phone:</strong>
                                {" "}
                                {technician.phone}
                            </p>


                            <p>
                                <strong>Address:</strong>
                                {" "}
                                {technician.address}
                            </p>


                            <span className="pending-status">
                                PENDING
                            </span>


                            <div className="technician-actions">


                                <button
                                    className="approve-btn"
                                    onClick={() =>
                                        approveTechnician(
                                            technician.id
                                        )
                                    }
                                >
                                    Approve
                                </button>



                                <button
                                    className="reject-btn"
                                    onClick={() =>
                                        rejectTechnician(
                                            technician.id
                                        )
                                    }
                                >
                                    Reject
                                </button>


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


export default ManageTechnicians;