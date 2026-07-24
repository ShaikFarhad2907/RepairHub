import "./WhyChoose.css";
import { FaShieldAlt, FaClock, FaUserCheck, FaHeadset } from "react-icons/fa";

function WhyChoose() {

    const features = [

        {
            icon:<FaShieldAlt/>,
            title:"Verified Professionals",
            desc:"All technicians are background verified."
        },

        {
            icon:<FaClock/>,
            title:"On Time Service",
            desc:"Fast and reliable doorstep service."
        },

        {
            icon:<FaUserCheck/>,
            title:"Affordable Pricing",
            desc:"Transparent pricing with no hidden charges."
        },

        {
            icon:<FaHeadset/>,
            title:"24/7 Support",
            desc:"Dedicated customer support anytime."
        }

    ];

    return (

        <section className="why-section">

            <h2>Why Choose RepairHub?</h2>

            <div className="why-grid">

                {

                    features.map((item,index)=>(

                        <div
                            className="why-card"
                            key={index}
                        >

                            <div className="why-icon">

                                {item.icon}

                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.desc}</p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default WhyChoose;