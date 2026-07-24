import { Link } from "react-router-dom";
import {
FaFacebookF,
FaInstagram,
FaLinkedinIn,
FaTwitter
} from "react-icons/fa";

import "./Footer.css";

function Footer() {

return (

<footer className="footer">

<div className="footer-container">


<div className="footer-box">
<h2>🏠 RepairHub</h2>

<p>
Your trusted home service partner for electricians,
plumbers, AC repair, carpenters and more.
</p>

</div>


<div className="footer-box">
<h3>Services</h3>

<a href="#">Electrician</a>
<a href="#">Plumber</a>
<a href="#">AC Repair</a>
<a href="#">Carpenter</a>

</div>


<div className="footer-box footer-contact">

<h3>Follow Us</h3>

<div className="social-icons">
<span>f</span>
<span>◎</span>
<span>in</span>
<span>🐦</span>
</div>


<p>
📧 
<a href="mailto:support@repairhub.com">
support@repairhub.com
</a>
</p>


<p>
📞
<a href="tel:+919876543210">
+91 98765 43210
</a>
</p>


</div>


</div>


<hr/>


<div className="copyright">
© 2026 RepairHub Pro. All Rights Reserved.
</div>


</footer>

);

}

export default Footer;