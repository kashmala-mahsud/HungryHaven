import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
           <h1>HungryHaven</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique id dicta quaerat ipsum at ipsa itaque inventore aut deserunt. Culpa 
            corporis similique, nemo doloribus molestias error deleniti rerum nihil consequatur!</p>
            <div className="footer-social-icon">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-whatsapp"></i>
            </div>

          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+4136781427</li>
                <li>Contact@HungryHaven.com</li>
              </ul>
              </div>
            </div>
            <hr />
            <p className="footer-copyright">
              Copyright 2024 &copy; HungryHaven.com - All Right Reserved.
            </p>
          
    </div>
  )
}

export default Footer;
