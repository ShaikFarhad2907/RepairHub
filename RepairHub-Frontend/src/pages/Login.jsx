import { useState } from "react";
import {
    useNavigate,
    Link
} from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (event) => {

        const { name, value } =
            event.target;

        setLogin((previousLogin) => ({
            ...previousLogin,
            [name]: value
        }));
    };

    const loginUser = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/auth/login",
                    login
                );

            const user = response.data;

            if (!user) {

                toast.success(
                    "Invalid email or password"
                );

                return;
            }

            const role =
                user.role
                    ?.trim()
                    .toUpperCase();

            if (!role) {

        toast.success(
                    "User role was not received from backend"
                );

                return;
            }

            /*
             * Technician approval check.
             *
             * If approvalStatus is returned by the backend,
             * only approved technicians can log in.
             */
            if (
                role === "TECHNICIAN" &&
                user.approvalStatus &&
                user.approvalStatus
                    .trim()
                    .toUpperCase() !== "APPROVED"
            ) {

                toast.success(
                    "Your technician account is waiting for admin approval"
                );

                return;
            }

            const userName =
                user.fullName ||
                user.name ||
                "User";

            localStorage.clear();

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            localStorage.setItem(
                "userId",
                String(user.id || "")
            );

            localStorage.setItem(
                "name",
                userName
            );

            localStorage.setItem(
                "email",
                user.email || ""
            );

            localStorage.setItem(
                "phone",
                user.phone || ""
            );

            localStorage.setItem(
                "address",
                user.address || ""
            );

            localStorage.setItem(
                "role",
                role
            );

            if (user.approvalStatus) {

                localStorage.setItem(
                    "approvalStatus",
                    user.approvalStatus
                );
            }

            if (user.serviceCategory) {

                localStorage.setItem(
                    "serviceCategory",
                    user.serviceCategory
                );
            }

    toast.success(
                `Welcome, ${userName}!`
            );

            if (role === "ADMIN") {

                navigate(
                    "/admin",
                    {
                        replace: true
                    }
                );

            } else if (
                role === "TECHNICIAN"
            ) {

                navigate(
                    "/technician",
                    {
                        replace: true
                    }
                );

            } else if (
                role === "CUSTOMER"
            ) {

                navigate(
                    "/",
                    {
                        replace: true
                    }
                );

            } else {

                localStorage.clear();

            toast.success(
                    `Unknown role: ${role}`
                );

                navigate(
                    "/login",
                    {
                        replace: true
                    }
                );
            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            toast.success(
                error.response?.data?.message ||
                error.response?.data ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="login-page">

            <form
                className="login-card"
                onSubmit={loginUser}
            >

                <h1>
                    Welcome Back 👋
                </h1>

                <p>
                    Login to RepairHub
                </p>

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={login.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={login.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Logging in..."
                        : "Login"}

                </button>

                <p>

                    Don't have a customer account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

                <div className="technician-register-section">

                    <p>
                        Are you a technician or service professional?
                    </p>

                    <Link
                        to="/technician/register"
                        className="technician-register-link"
                    >
                        Register as Technician
                    </Link>

                </div>

            </form>

        </div>
    );
}

export default Login;