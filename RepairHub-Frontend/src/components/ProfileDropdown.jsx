import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileDropdown.css";

function ProfileDropdown() {

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const [open, setOpen] = useState(false);

    const name = localStorage.getItem("name") || "Customer";

    const logout = () => {

        localStorage.clear();

        setOpen(false);

        navigate("/");
    };

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };

    }, []);

    return (

        <div
            className="profile-dropdown"
            ref={dropdownRef}
        >

            <button
                className="profile-button"
                onClick={() => setOpen(!open)}
            >
                <span className="profile-avatar">
                    {name.charAt(0).toUpperCase()}
                </span>

                <span className="profile-name">
                    {name}
                </span>

                <span className={`dropdown-arrow ${open ? "rotate" : ""}`}>
                    ▼
                </span>
            </button>

            {open && (

                <div className="profile-menu">

                    <div className="profile-menu-header">

                        <div className="large-avatar">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{name}</strong>

                            <small>
                                {localStorage.getItem("email")}
                            </small>
                        </div>

                    </div>

                    <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                    >
                        👤 My Profile
                    </Link>

                    <Link
                        to="/my-bookings"
                        onClick={() => setOpen(false)}
                    >
                        📋 My Bookings
                    </Link>

                    <Link
                        to="/payments"
                        onClick={() => setOpen(false)}
                    >
                        💳 Payments
                    </Link>

                    <Link
                        to="/reviews"
                        onClick={() => setOpen(false)}
                    >
                        ⭐ Reviews
                    </Link>

                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        🚪 Logout
                    </button>

                </div>
            )}

        </div>
    );
}

export default ProfileDropdown;