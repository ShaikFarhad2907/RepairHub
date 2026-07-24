import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";



import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
function Navbar() {


    const navigate = useNavigate();

    const location = useLocation();

    const dropdownRef = useRef(null);


    const [open, setOpen] =
        useState(false);
    
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLoggedIn =
        localStorage.getItem("isLoggedIn")
        === "true";


    const name =
        localStorage.getItem("name")
        || "User";


    const email =
        localStorage.getItem("email")
        || "";


    const role =
        localStorage
        .getItem("role")
        ?.trim()
        .toUpperCase();



    const closeMenu = () => {

        setOpen(false);

    };



    const logout = () => {


        localStorage.clear();


        setOpen(false);


       toast.success(
"Logged Out Successfully"
);


        navigate(
            "/",
            {
                replace:true
            }
        );


        window.location.reload();

    };




    useEffect(()=>{


        const closeDropdown =
        (event)=>{


            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target
                )
            ){

                setOpen(false);

            }

        };



        document.addEventListener(
            "mousedown",
            closeDropdown
        );



        return ()=>{


            document.removeEventListener(
                "mousedown",
                closeDropdown
            );


        };


    },[]);

useEffect(() => {
    setMobileMenuOpen(false);
}, [location.pathname]);


    return (

        <nav className="navbar">

           {
    location.pathname !== "/" && (

        <button
            className="back-btn"
            onClick={() => navigate(-1)}
        >
        🔙
        </button>

    )
}
           

<div className="logo">

    <Link to="/">
        🏠 RepairHub
    </Link>

</div>


<div
className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
    <span></span>
    <span></span>
    <span></span>
</div>


<ul className="nav-links">

    <li>
        <Link to="/">
            Home
        </Link>
    </li>

    <li>
        <Link to="/services">
            Services
        </Link>
    </li>

    <li>
        <a href="/#about">
            About
        </a>
    </li>

    <li>
        <Link to="/contact">
            Contact
        </Link>
    </li>

</ul>


            {
                isLoggedIn ?


                (

                <div
                    className="profile-menu"
                    ref={dropdownRef}
                >


                    <button
                        className="profile-btn"
                        onClick={() =>
                            setOpen(
                                previous =>
                                !previous
                            )
                        }
                    >


                        <span className="profile-circle">

                            {
                                name
                                .charAt(0)
                                .toUpperCase()
                            }

                        </span>


                        <span>
                            Hi, {name}
                        </span>


                        <span>
                            ▼
                        </span>


                    </button>





                    {
                        open && (


                        <div className="dropdown">



                            <div className="dropdown-header">


                                <div className="large-profile-circle">

                                    {
                                        name
                                        .charAt(0)
                                        .toUpperCase()
                                    }

                                </div>



                                <div>

                                    <strong>
                                        {name}
                                    </strong>


                                    <small>
                                        {email}
                                    </small>


                                    <small>
                                        {role}
                                    </small>


                                </div>


                            </div>






                            {
                                role === "CUSTOMER" &&

                                (

                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                >
                                    👤 My Profile
                                </Link>

                                )

                            }





                            {
                                role === "TECHNICIAN" &&

                                (

                                <Link
                                    to="/technician/profile"
                                    onClick={closeMenu}
                                >
                                    👤 My Profile
                                </Link>

                                )

                            }






                            {
                            role === "CUSTOMER" &&

                            <>


                                <Link
                                    to="/mybookings"
                                    onClick={closeMenu}
                                >
                                    📋 My Bookings
                                </Link>



                                <Link
                                    to="/history"
                                    onClick={closeMenu}
                                >
                                    🕘 Booking History
                                </Link>



                                <Link
                                    to="/payments"
                                    onClick={closeMenu}
                                >
                                    💳 Payments
                                </Link>



                                <Link
                                    to="/reviews"
                                    onClick={closeMenu}
                                >
                                    ⭐ My Reviews
                                </Link>



                                <Link
                                    to="/services"
                                    onClick={closeMenu}
                                >
                                    🛠 Book a Service
                                </Link>


                            </>

                            }





                            {
                            role === "TECHNICIAN" &&

                            <>


                                <Link
                                    to="/technician"
                                    onClick={closeMenu}
                                >
                                    🛠 Technician Dashboard
                                </Link>



                                <Link
                                    to="/technician/bookings"
                                    onClick={closeMenu}
                                >
                                    📋 My Assigned Jobs
                                </Link>



                                <Link
                                    to="/technician/completed"
                                    onClick={closeMenu}
                                >
                                    ✅ Completed Jobs
                                </Link>



                                <Link
                                    to="/technician/earnings"
                                    onClick={closeMenu}
                                >
                                    💰 Earnings
                                </Link>



                            </>

                            }





                            {
                            role === "ADMIN" &&

                            <>


                                <Link
                                    to="/admin"
                                    onClick={closeMenu}
                                >
                                    ⚙️ Admin Dashboard
                                </Link>



                                <Link
                                    to="/admin/services"
                                    onClick={closeMenu}
                                >
                                    🧰 Manage Services
                                </Link>



                                <Link
                                    to="/admin/technicians"
                                    onClick={closeMenu}
                                >
                                    👨‍🔧 Manage Technicians
                                </Link>



                                <Link
                                    to="/admin/bookings"
                                    onClick={closeMenu}
                                >
                                    📋 Manage Bookings
                                </Link>



                                <Link
                                    to="/admin/analytics"
                                    onClick={closeMenu}
                                >
                                    📊 Analytics
                                </Link>


                            </>

                            }





                            <button
                                className="logout-dropdown-btn"
                                onClick={logout}
                            >

                                🚪 Logout

                            </button>



                        </div>


                        )

                    }



                </div>


                )



                :



                (

                <div className="nav-buttons">


                    <Link to="/login">

                        <button className="login-btn">

                            Login

                        </button>

                    </Link>



                    <div className="register-dropdown">


                        <button className="register-btn">

                            Register

                        </button>



                        <div className="register-menu">


                            <Link to="/register">

                                👤 Customer

                            </Link>



                            <Link to="/technician/register">

                                🛠 Technician

                            </Link>


                        </div>


                    </div>


                </div>

                )

            }

            {mobileMenuOpen && (
    <div
        className="mobile-overlay"
        onClick={() => setMobileMenuOpen(false)}
    />
)}

<div
    className={`mobile-drawer ${
        mobileMenuOpen ? "show" : ""
    }`}
>
    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
        Home
    </Link>

    <Link
        to="/services"
        onClick={() => setMobileMenuOpen(false)}
    >
        Services
    </Link>

    <a
        href="/#about"
        onClick={() => setMobileMenuOpen(false)}
    >
        About
    </a>

    <Link
        to="/contact"
        onClick={() => setMobileMenuOpen(false)}
    >
        Contact
    </Link>

    <hr />

    {!isLoggedIn && (
        <>
            <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
            >
                Login
            </Link>

            <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
            >
                Customer Register
            </Link>

            <Link
                to="/technician/register"
                onClick={() => setMobileMenuOpen(false)}
            >
                Technician Register
            </Link>
        </>
    )}

    {isLoggedIn && role === "CUSTOMER" && (
        <>
            <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
            >
                My Profile
            </Link>

            <Link
                to="/mybookings"
                onClick={() => setMobileMenuOpen(false)}
            >
                My Bookings
            </Link>

            <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
            >
                Booking History
            </Link>

            <button onClick={logout}>
                Logout
            </button>
        </>
    )}

    {isLoggedIn && role === "TECHNICIAN" && (
        <>
            <Link
                to="/technician"
                onClick={() => setMobileMenuOpen(false)}
            >
                Dashboard
            </Link>

            <Link
                to="/technician/bookings"
                onClick={() => setMobileMenuOpen(false)}
            >
                Assigned Jobs
            </Link>

            <button onClick={logout}>
                Logout
            </button>
        </>
    )}

    {isLoggedIn && role === "ADMIN" && (
        <>
            <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
            >
                Admin Dashboard
            </Link>

            <Link
                to="/admin/services"
                onClick={() => setMobileMenuOpen(false)}
            >
                Manage Services
            </Link>

            <button onClick={logout}>
                Logout
            </button>
        </>
    )}
</div>
        </nav>

    );

}


export default Navbar;