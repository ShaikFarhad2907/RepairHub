import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

import Services from "./pages/customer/Services";
import Booking from "./pages/customer/Booking";
import Payment from "./pages/customer/Payment";
import Review from "./pages/customer/Review";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerMyBookings from "./pages/customer/MyBookings";
import CustomerPayments from "./pages/customer/CustomerPayments";
import BookingHistory from "./pages/customer/BookingHistory";
import CustomerReviews from "./pages/customer/CustomerReviews";
import CustomerProfile from "./pages/customer/CustomerProfile";

import TechnicianProfile from "./pages/technician/TechnicianProfile";
import TechnicianDashboard from "./pages/technician/TechnicianDashboard";
import TechnicianMyBookings from "./pages/technician/MyBookings";
import Earnings from "./pages/technician/Earnings";
import TechnicianRegister from "./pages/technician/TechnicianRegister";
import CompletedWorks 
from "./pages/technician/CompletedWorks";


import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageServices from "./pages/admin/ManageServices";
import ManageTechnicians from "./pages/admin/ManageTechnicians";
import ViewBookings from "./pages/admin/ViewBookings";
import Analytics from "./pages/admin/Analytics";



function AppContent() {
    const location = useLocation();

   const hideNavbarRoutes = [
    "/login",
    "/register",

    // "/technician",
    // "/technician/bookings",
    // "/technician/earnings",
    // "/technician/completed",

    // "/admin",
    // "/admin/services",
    // "/admin/technicians",
    // "/admin/bookings",
    // "/admin/analytics"
];

    const showNavbar =
        !hideNavbarRoutes.includes(
            location.pathname
        );

    return (
        <>
            {showNavbar && <Navbar />}

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
    path="/technician/register"
    element={<TechnicianRegister />}
/>
                <Route
                  path="/technician/earnings"
                  element={<Earnings />}
              />
                <Route
                    path="/services"
                    element={<Services />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/booking"
                    element={<Booking />}
                />

                <Route
                    path="/payment"
                    element={<Payment />}
                />

                <Route
                    path="/review"
                    element={<Review />}
                />

                <Route
                    path="/customer"
                    element={<CustomerDashboard />}
                />

                <Route
                    path="/customer/bookings"
                    element={<CustomerMyBookings />}
                />

                <Route
                    path="/mybookings"
                    element={<CustomerMyBookings />}
                />

                <Route
                    path="/payments"
                    element={<CustomerPayments />}
                />

                <Route
                    path="/reviews"
                    element={<CustomerReviews />}
                />

                <Route
                    path="/history"
                    element={<BookingHistory />}
                />

                <Route
                    path="/profile"
                    element={<CustomerProfile />}
                />

                <Route
                    path="/technician"
                    element={<TechnicianDashboard />}
                />
                <Route
    path="/technician/profile"
    element={<TechnicianProfile />}
/>

                <Route
                    path="/technician/bookings"
                    element={<TechnicianMyBookings />}
                />
                 <Route
                    path="/technician/completed"
                    element={<CompletedWorks />}
                    />
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />
                <Route
                    path="/admin/services"
                    element={<ManageServices />}
                />

                <Route
                    path="/admin/technicians"
                    element={<ManageTechnicians />}
                />

                <Route
                    path="/admin/bookings"
                    element={<ViewBookings />}
                />

                <Route
                    path="/admin/analytics"
                    element={<Analytics />}
                />

                

            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;