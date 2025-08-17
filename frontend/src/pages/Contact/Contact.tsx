import React from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>info@jobfinder.com</p>
            </div>
            <div className="contact-item">
              <h3>📞 Phone</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>📍 Address</h3>
              <p>
                123 Job Street
                <br />
                Career City, CC 12345
              </p>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Message subject" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  placeholder="Your message"
                  rows={5}
                  required></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
