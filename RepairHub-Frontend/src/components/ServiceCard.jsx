import "./ServiceCard.css";
import { useNavigate } from "react-router-dom";

import electrician from "../assets/electrician.jpg";
import plumber from "../assets/plumber.jpg";
import carpenter from "../assets/carpenter.jpg";
import acrepair from "../assets/acrepair.jpg";
import painting from "../assets/painting.jpg";
import cleaning from "../assets/cleaning.jpg";
import washingmachine from "../assets/washingmachine.jpg";
import refrigerator from "../assets/refrigerator.jpg";
import waterpurifier from "../assets/waterpurifier.jpg";
//import cctv from "../assets/cctv.jpg";
import pestcontrol from "../assets/pestcontrol.jpg";
//import gardening from "../assets/gardening.jpg";
import laptoprepair from "../assets/laptoprepair.jpg";
import mobilerepair from "../assets/mobilerepair.jpg";

function ServiceCard() {

    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            image: electrician,
            serviceName: "Electrician",
            price: "₹299",
            rating: "⭐ 4.8",
            duration: "30 mins"
        },
        {
            id: 2,
            image: plumber,
            serviceName: "Plumber",
            price: "₹249",
            rating: "⭐ 4.7",
            duration: "45 mins"
        },
        {
            id: 3,
            image: carpenter,
            serviceName: "Carpenter",
            price: "₹399",
            rating: "⭐ 4.9",
            duration: "1 Hour"
        },
        {
            id: 4,
            image: acrepair,
            serviceName: "AC Repair",
            price: "₹599",
            rating: "⭐ 4.9",
            duration: "2 Hours"
        },
        {
            id: 5,
            image: painting,
            serviceName: "Painting",
            price: "₹999",
            rating: "⭐ 4.8",
            duration: "1 Day"
        },
        {
            id: 6,
            image: cleaning,
            serviceName: "Cleaning",
            price: "₹699",
            rating: "⭐ 4.8",
            duration: "3 Hours"
        },
        
        {
            id: 7,
            image: refrigerator,
            serviceName: "Refrigerator Repair",
            price: "₹549",
            rating: "⭐ 4.8",
            duration: "1 Hour"
        },
        {
            id: 8,
            image: washingmachine,
            serviceName: "Washing Machine",
            price: "₹499",
            rating: "⭐ 4.7",
            duration: "1 Hour"
        },
        {
            id: 9,
            image: waterpurifier,
            serviceName: "Water Purifier",
            price: "₹349",
            rating: "⭐ 4.9",
            duration: "45 mins"
        },
        
        {
            id: 10,
            image: pestcontrol,
            serviceName: "Pest Control",
            price: "₹899",
            rating: "⭐ 4.7",
            duration: "2 Hours"
        },
        {
    id: 11,
    image: laptoprepair,
    serviceName: "Laptop Repair",
    price: "₹699",
    rating: "⭐ 4.8",
    duration: "1 Hour"
},
{
    id: 12,
    image: mobilerepair,
    serviceName: "Mobile Repair",
    price: "₹499",
    rating: "⭐ 4.9",
    duration: "45 mins"
},
        
    ];

    return (
        <section className="services" id="services">

            <h2>Popular Home Services</h2>

            <div className="service-container">

                {services.map((service) => (

                    <div
                        className="service-card"
                        key={service.id}
                    >

                        <img
                            src={service.image}
                            alt={service.serviceName}
                            className="service-image"
                        />

                        <div className="service-info">

                            <h3>{service.serviceName}</h3>

                            <p>{service.rating}</p>

                            <p>{service.duration}</p>

                            <h4>{service.price}</h4>

                            <button
                                onClick={() =>
                                    navigate("/booking", {
                                        state: service
                                    })
                                }
                            >
                                Book Now
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default ServiceCard;