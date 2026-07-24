import "./DashboardCard.css";

function DashboardCard({

title,

value,

color

}){

return(

<div

className="dashboard-card"

style={{

borderTop:`6px solid ${color}`

}}

>

<h3>

{title}

</h3>

<h1>

{value}

</h1>

</div>

)

}

export default DashboardCard;