import React from "react";
import "./Profile.css";

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="container">
        <h1>User Profile</h1>
        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Enter your location" />
              </div>
            </form>
          </div>

          <div className="profile-section">
            <h2>Professional Information</h2>
            <form>
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" placeholder="Enter your current job title" />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select>
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                  <option>Executive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Skills</label>
                <textarea placeholder="List your skills separated by commas"></textarea>
              </div>
            </form>
          </div>

          <button className="save-btn">Save Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
