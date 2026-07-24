import "./TechnicianCard.css";

import electrician from "../assets/electrician.jpg";
import plumber from "../assets/plumber.jpg";
import carpenter from "../assets/carpenter.jpg";
import acrepair from "../assets/acrepair.jpg";

function TechnicianCard() {

    const technicians = [

        {
            id:1,
            image:electrician,
            name:"Ravi Kumar",
            service:"Electrician",
            experience:"8 Years",
            rating:"⭐ 4.9"
        },

        {
            id:2,
            image:plumber,
            name:"Arjun Reddy",
            service:"Plumber",
            experience:"6 Years",
            rating:"⭐ 4.8"
        },

        {
            id:3,
            image:carpenter,
            name:"Rahul Sharma",
            service:"Carpenter",
            experience:"10 Years",
            rating:"⭐ 4.9"
        },

        {
            id:4,
            image:acrepair,
            name:"Vikram Singh",
            service:"AC Technician",
            experience:"7 Years",
            rating:"⭐ 4.8"
        }

    ];

    return (

        <section className="technician-section">

            <h2>Our Top Technicians</h2>

            <div className="technician-grid">

                {

                    technicians.map((tech)=>(

                        <div
                            className="technician-card"
                            key={tech.id}
                        >

                            <img
                                src={tech.image}
                                alt={tech.name}
                            />

                            <h3>{tech.name}</h3>

                            <p>{tech.service}</p>

                            <span>{tech.experience}</span>

                            <h4>{tech.rating}</h4>

                            <button>

                                View Profile

                            </button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default TechnicianCard;