import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./TechnicianRegister.css";

function TechnicianRegister(){

    const navigate = useNavigate();

    const [technician,setTechnician] = useState({
        fullName:"",
        email:"",
        phone:"",
        password:"",
        address:""
    });


    const handleChange = (e)=>{

        setTechnician({
            ...technician,
            [e.target.name]:e.target.value
        });

    };


    const registerTechnician = async(e)=>{

        e.preventDefault();

        try{

            const response =
            await api.post(
                "/auth/technician-register",
                technician
            );


            alert(response.data);

            navigate("/login");


        }catch(error){

            console.log(error);

            alert(
                error.response?.data ||
                "Registration failed"
            );

        }

    };


    return(

        <div className="technician-register-page">

            <form
                className="technician-register-card"
                onSubmit={registerTechnician}
            >

                <h1>
                    Technician Registration
                </h1>

                <p>
                    Join RepairHub and provide services
                </p>


                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={technician.fullName}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={technician.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={technician.phone}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={technician.password}
                    onChange={handleChange}
                    required
                />


                <textarea
                    name="address"
                    placeholder="Address"
                    value={technician.address}
                    onChange={handleChange}
                    required
                />


                <button type="submit">
                    Register as Technician
                </button>


            </form>

        </div>

    );

}

export default TechnicianRegister;