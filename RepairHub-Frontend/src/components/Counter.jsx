import { useEffect, useState } from "react";
import "./Counter.css";

function Counter() {

    const [customers, setCustomers] = useState(0);
    const [technicians, setTechnicians] = useState(0);
    const [bookings, setBookings] = useState(0);
    const [cities, setCities] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCustomers(c => c < 1500 ? c + 15 : 1500);
            setTechnicians(t => t < 250 ? t + 3 : 250);
            setBookings(b => b < 5000 ? b + 40 : 5000);
            setCities(c => c < 25 ? c + 1 : 25);

        }, 20);

        return () => clearInterval(timer);

    }, []);

    return (

        <section className="counter">

            <div className="counter-card">

                <h1>{customers}+</h1>

                <p>Happy Customers</p>

            </div>

            <div className="counter-card">

                <h1>{technicians}+</h1>

                <p>Verified Technicians</p>

            </div>

            <div className="counter-card">

                <h1>{bookings}+</h1>

                <p>Completed Bookings</p>

            </div>

            <div className="counter-card">

                <h1>{cities}+</h1>

                <p>Cities Covered</p>

            </div>

        </section>

    );

}

export default Counter;