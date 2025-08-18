import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Job Finder</h3>
            <p>
              Find your dream job with us. We connect talented individuals with
              amazing opportunities.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/jobs">Browse Jobs</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@jobfinder.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Job Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
