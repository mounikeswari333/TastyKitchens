import React from "react";
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <img
            src="https://res.cloudinary.com/dttsqdjta/image/upload/v1770376319/Group_7420_og7n5a.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h2 className="footer-title">Tasty Kitchens</h2>
        </div>
        <p className="footer-description">
          The only thing we are serious about is food.
          <br />
          Contact us on
        </p>
        <div className="footer-social-icons">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="social-icon"
            aria-label="Pinterest"
          />
          <FaInstagram
            testid="instagram-social-icon"
            className="social-icon"
            aria-label="Instagram"
          />
          <FaTwitter
            testid="twitter-social-icon"
            className="social-icon"
            aria-label="Twitter"
          />
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="social-icon"
            aria-label="Facebook"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
