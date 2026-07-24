import "./CustomerDashboard.css";

function CustomerDashboard(){

return(

<div className="dashboard">

<h1>Customer Dashboard</h1>

<div className="dashboard-grid">

<div className="dashboard-card">

<h2>My Bookings</h2>

<p>View all your booked services.</p>

</div>

<div className="dashboard-card">

<h2>Payments</h2>

<p>Check payment history.</p>

</div>

<div className="dashboard-card">

<h2>Reviews</h2>

<p>Manage your reviews.</p>

</div>

<div className="dashboard-card">

<h2>Profile</h2>

<p>Update your profile.</p>

</div>

</div>

</div>

)

}

export default CustomerDashboard;