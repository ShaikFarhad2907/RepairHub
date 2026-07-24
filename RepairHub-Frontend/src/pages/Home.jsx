import ServiceCard from "../components/ServiceCard";
import WhyChoose from "../components/WhyChoose";
import TechnicianCard from "../components/TechnicianCard";
import Counter from "../components/Counter";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

import "./Home.css";

function Home() {
    
    return (
        <>
        <div className="floating-tools">

    <span>🔧</span>
    <span>🛠️</span>
    <span>⚙️</span>
    <span>🔩</span>
    <span>🔨</span>
    <span>🪛</span>
    <span>⚒️</span>
    <span>🔧</span>

</div>
            <Hero />

            <ServiceCard />

            <TechnicianCard />

            <WhyChoose />

            <section
                className="about"
                id="about"
            >
                <div className="about-left">
                    <img
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
                        alt="About RepairHub"
                    />
                </div>

                <div className="about-right">
                    <h2>
                        About RepairHub
                    </h2>

                    <p>
                        RepairHub is a trusted home service
                        platform that connects customers
                        with skilled professionals for
                        electrical work, plumbing,
                        carpentry, AC repair, painting,
                        cleaning, appliance repair, and
                        more.
                    </p>

                    <div className="about-features">
                        <div>
                            ✔ Verified Technicians
                        </div>

                        <div>
                            ✔ Affordable Pricing
                        </div>

                        <div>
                            ✔ Instant Booking
                        </div>

                        <div>
                            ✔ Doorstep Service
                        </div>

                        <div>
                            ✔ Secure Payments
                        </div>

                        <div>
                            ✔ 24/7 Customer Support
                        </div>
                    </div>
                </div>
            </section>

            <Counter />

            <Testimonial />

            <Footer />
        </>
    );
}

export default Home;