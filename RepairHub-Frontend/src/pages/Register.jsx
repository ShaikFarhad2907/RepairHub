import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Register.css";
import toast from "react-hot-toast";
function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "CUSTOMER",
        address: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post("/auth/register", user);

            toast.success(response.data);

            if (response.data === "Registration Successful!") {

                navigate("/login");
            }

        } catch (error) {

            console.error("Registration error:", error);

        toast.success(
                error.response?.data ||
                "Registration Failed!"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="register-page">

            <form
                className="register-card"
                onSubmit={registerUser}
            >

                <h1>Create Account</h1>

                <p>Register as a customer</p>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={user.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={user.address}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p>
                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;