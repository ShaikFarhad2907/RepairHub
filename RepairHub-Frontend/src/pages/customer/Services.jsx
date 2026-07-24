import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./Services.css";

// Import Local Images
import electrician from "../../assets/electrician.jpg";
import plumber from "../../assets/plumber.jpg";
import carpenter from "../../assets/carpenter.jpg";
import acrepair from "../../assets/acrepair.jpg";
import painting from "../../assets/painting.jpg";
import cleaning from "../../assets/cleaning.jpg";
import washingmachine from "../../assets/washingmachine.jpg";
import refrigerator from "../../assets/refrigerator.jpg";
import waterpurifier from "../../assets/waterpurifier.jpg";
import cctv from "../../assets/cctv.jpg";
import pestcontrol from "../../assets/pestcontrol.jpg";
import gardening from "../../assets/gardening.jpg";
import laptoprepair from "../../assets/laptoprepair.jpg";
import mobilerepair from "../../assets/mobilerepair.jpg";
function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const serviceImages = {
        "Electrician": electrician,
        "Plumber": plumber,
        "Carpenter": carpenter,
        "AC Repair": acrepair,
        "Painting": painting,
        "Cleaning": cleaning,
        "Washing Machine": washingmachine,
        "Refrigerator Repair": refrigerator,
        "Water Purifier": waterpurifier,
        "Pest Control": pestcontrol,
        "Laptop Repair": laptoprepair,
        "Mobile Repair": mobilerepair,
    };

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {

        try {

            const response = await api.get("/services");

            setServices(response.data);

        } catch (error) {

            console.log(error);
            alert("Unable to load services");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <div className="loading">
                Loading services...
            </div>
        );
    }

    return (

        <div className="services-page">

            <h1>Our Services</h1>

            <div className="services-grid">

                {services.map((service) => (

                    <div
                        className="service-box"
                        key={service.id}
                    >

                        <img
                            src={
                                serviceImages[service.serviceName] ||
                                electrician
                            }
                            alt={service.serviceName}
                            className="service-image"
                        />

                        <h3>{service.serviceName}</h3>

                        <p className="service-category">
                            {service.category}
                        </p>

                        <p>{service.description}</p>

                        <h2>₹ {service.price}</h2>

                        <button
                            onClick={() =>
                                navigate("/booking", {
                                    state: service
                                })
                            }
                        >
                            Book Service
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Services;