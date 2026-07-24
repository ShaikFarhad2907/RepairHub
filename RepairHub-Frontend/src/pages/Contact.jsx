import "./Contact.css";

function Contact(){

return(

<div className="contact">

<div className="contact-left">

<h1>

Contact Us

</h1>

<p>

Need help?

Our team is available 24/7.

</p>

<p>

📍 Madanapalle, Andhra Pradesh

</p>

<p>

📞 +91 9876543210

</p>

<p>

📧 support@repairhub.com

</p>

</div>

<div className="contact-right">

<form>

<input

type="text"

placeholder="Your Name"

/>

<input

type="email"

placeholder="Email"

/>

<input

type="text"

placeholder="Phone Number"

/>

<textarea

placeholder="Your Message"

rows="6"

></textarea>

<button>

Send Message

</button>

</form>

</div>

</div>

)

}

export default Contact;