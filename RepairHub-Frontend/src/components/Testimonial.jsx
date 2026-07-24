import "./Testimonial.css";

function Testimonial() {

const reviews=[

{

name:"Rahul Sharma",

review:"Excellent electrician service. Very professional and arrived on time.",

rating:"⭐⭐⭐⭐⭐"

},

{

name:"Priya Reddy",

review:"Booked AC repair. Technician solved the issue within 30 minutes.",

rating:"⭐⭐⭐⭐⭐"

},

{

name:"Farhan Ali",

review:"Affordable price and excellent customer support.",

rating:"⭐⭐⭐⭐⭐"

}

];

return(

<section className="testimonial">

<h2>What Our Customers Say</h2>

<div className="testimonial-grid">

{

reviews.map((item,index)=>(

<div

className="testimonial-card"

key={index}

>

<h3>{item.name}</h3>

<p>{item.review}</p>

<h4>{item.rating}</h4>

</div>

))

}

</div>

</section>

)

}

export default Testimonial;