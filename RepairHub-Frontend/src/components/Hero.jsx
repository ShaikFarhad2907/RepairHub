import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import electrician from "../assets/electrician.jpg";
import plumber from "../assets/plumber.jpg";
import carpenter from "../assets/carpenter.jpg";
import acrepair from "../assets/acrepair.jpg";
import painting from "../assets/painting.jpg";
import cleaning from "../assets/cleaning.jpg";

import "./Hero.css";

function Hero() {

    const navigate = useNavigate();

    const slides = [

        {
            image: electrician,
            title: "Professional Electrician",
            subtitle: "Expert electrical repair and installation at your doorstep."
        },

        {
            image: plumber,
            title: "Expert Plumbing",
            subtitle: "Leak repairs, fittings and all plumbing solutions."
        },

        {
            image: carpenter,
            title: "Trusted Carpenter",
            subtitle: "Furniture repair and wood work by professionals."
        },

        {
            image: acrepair,
            title: "AC Repair",
            subtitle: "Installation, servicing and maintenance."
        },

        {
            image: painting,
            title: "House Painting",
            subtitle: "Premium interior and exterior painting."
        },

        {
            image: cleaning,
            title: "Home Cleaning",
            subtitle: "Deep cleaning with trained professionals."
        }

    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrent((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    return (

        <section className="hero">

            <div className="hero-left">

                <h1>

                    Book Trusted
                    <br />
                    Home Services

                </h1>

                <p>

                    Professional technicians for every
                    home service with affordable pricing
                    and fast doorstep support.

                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/services")}
                    >
                        Book Service
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/services")}
                    >
                        Explore
                    </button>

                </div>

            </div>

            <div className="hero-right">

                <img
                    src={slides[current].image}
                    alt={slides[current].title}
                />

                <div className="hero-content">

                    <h3>{slides[current].title}</h3>

                    <p>{slides[current].subtitle}</p>

                </div>

            </div>

        </section>

    );

}

export default Hero;