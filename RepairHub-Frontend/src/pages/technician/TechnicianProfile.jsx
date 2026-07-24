import { useEffect, useState } from "react";

import api from "../../api/axiosConfig";

import "./TechnicianProfile.css";


function TechnicianProfile() {


    const [profile, setProfile] = useState({

        fullName: "",
        email: "",
        phone: "",
        address: "",
        role: ""

    });


    const [isEditing, setIsEditing] =
        useState(false);


    const [loading, setLoading] =
        useState(true);


    const [saving, setSaving] =
        useState(false);


    const [message, setMessage] =
        useState("");


    const [errorMessage, setErrorMessage] =
        useState("");



    const userId =
        localStorage.getItem("userId");




    useEffect(() => {


        loadProfile();


    }, []);





    const loadProfile = async () => {


        if (!userId) {

            setErrorMessage(
                "User ID not found. Please login again"
            );

            setLoading(false);

            return;
        }



        try {


            const response =
                await api.get(
                    `/users/${userId}`
                );



            setProfile({

                fullName:
                    response.data.fullName || "",


                email:
                    response.data.email || "",


                phone:
                    response.data.phone || "",


                address:
                    response.data.address || "",


                role:
                    response.data.role || "TECHNICIAN"

            });



        }
        catch(error){


            console.log(error);


            setErrorMessage(
                "Unable to load profile"
            );


        }
        finally{


            setLoading(false);


        }


    };







    const handleChange = (e)=>{


        const {name,value} =
            e.target;


        setProfile({

            ...profile,

            [name]:value

        });


    };






    const handleSave = async()=>{


        try{


            setSaving(true);

            setMessage("");

            setErrorMessage("");



            const response =
                await api.put(

                    `/users/${userId}`,

                    {

                        fullName:
                            profile.fullName,


                        phone:
                            profile.phone,


                        address:
                            profile.address

                    }

                );



            setProfile({

                fullName:
                    response.data.fullName || "",


                email:
                    response.data.email || "",


                phone:
                    response.data.phone || "",


                address:
                    response.data.address || "",


                role:
                    response.data.role || "TECHNICIAN"

            });



            localStorage.setItem(

                "name",

                response.data.fullName

            );



            setIsEditing(false);



            setMessage(
                "Profile updated successfully"
            );



        }
        catch(error){


            console.log(error);


            setErrorMessage(
                "Unable to update profile"
            );


        }
        finally{


            setSaving(false);


        }


    };






    if(loading){


        return (

            <div className="technician-profile-page">

                <div className="profile-message-card">

                    <h2>
                        Loading profile...
                    </h2>

                </div>

            </div>

        );


    }






    return (

        <div className="technician-profile-page">


            <div className="profile-container">



                <div className="profile-header">


                    <div className="profile-avatar">


                        {
                            profile.fullName
                            ?
                            profile.fullName
                            .charAt(0)
                            .toUpperCase()

                            :

                            "T"

                        }


                    </div>




                    <div>


                        <h1>
                            Technician Profile
                        </h1>


                        <p>
                            View and update your personal information
                        </p>


                    </div>



                </div>





                {
                    message &&

                    <div className="profile-success-message">

                        {message}

                    </div>

                }





                {
                    errorMessage &&

                    <div className="profile-error-message">

                        {errorMessage}

                    </div>

                }







                <div className="profile-form">



                    <div className="profile-field">


                        <label>
                            Full Name
                        </label>


                        <input

                            type="text"

                            name="fullName"

                            value={
                                profile.fullName
                            }

                            onChange={
                                handleChange
                            }

                            disabled={
                                !isEditing
                            }

                        />


                    </div>







                    <div className="profile-field">


                        <label>
                            Email
                        </label>


                        <input

                            type="email"

                            value={
                                profile.email
                            }

                            disabled

                        />


                    </div>








                    <div className="profile-field">


                        <label>
                            Phone Number
                        </label>


                        <input

                            type="text"

                            name="phone"

                            value={
                                profile.phone
                            }

                            onChange={
                                handleChange
                            }

                            disabled={
                                !isEditing
                            }

                            maxLength="10"

                        />


                    </div>








                    <div className="profile-field">


                        <label>
                            Role
                        </label>


                        <input

                            value={
                                profile.role
                            }

                            disabled

                        />


                    </div>








                    <div className="profile-field profile-address-field">


                        <label>
                            Address
                        </label>


                        <textarea

                            name="address"

                            value={
                                profile.address
                            }

                            onChange={
                                handleChange
                            }

                            disabled={
                                !isEditing
                            }

                        />


                    </div>




                </div>








                <div className="profile-actions">


                    {
                        !isEditing

                        ?

                        <button

                            className="profile-edit-button"

                            onClick={()=>{

                                setIsEditing(true);

                                setMessage("");

                            }}

                        >

                            Edit Profile

                        </button>


                        :


                        <>


                        <button

                            className="profile-save-button"

                            onClick={handleSave}

                            disabled={saving}

                        >

                            {
                                saving
                                ?
                                "Saving..."
                                :
                                "Save Changes"
                            }


                        </button>





                        <button

                            className="profile-cancel-button"

                            onClick={()=>setIsEditing(false)}

                        >

                            Cancel

                        </button>


                        </>


                    }


                </div>




            </div>



        </div>


    );


}



export default TechnicianProfile;