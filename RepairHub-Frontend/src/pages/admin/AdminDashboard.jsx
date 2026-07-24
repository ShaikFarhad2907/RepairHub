import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

    return (

        <div className="admin-dashboard">

            <h1>Admin Dashboard</h1>

            <div className="admin-grid">

                <Link to="/admin/services" className="admin-card">
                    Manage Services
                </Link>

                <Link to="/admin/technicians" className="admin-card">
                    Manage Technicians
                </Link>

                <Link to="/admin/bookings" className="admin-card">
                    View Bookings
                </Link>

                <Link to="/admin/analytics" className="admin-card">
                    Analytics
                </Link>

            </div>

        </div>

    );

}

export default AdminDashboard;