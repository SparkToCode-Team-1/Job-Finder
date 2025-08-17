import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        <h1>About Job Finder</h1>
        <div className="about-content">
          <section className="mission">
            <h2>Our Mission</h2>
            <p>
              Job Finder is dedicated to connecting talented individuals with
              amazing career opportunities. We believe that everyone deserves to
              find work that is meaningful, rewarding, and aligned with their
              goals.
            </p>
          </section>

          <section className="story">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, Job Finder has quickly become a trusted platform
              for job seekers and employers alike. Our team of passionate
              professionals works tirelessly to create the best possible
              experience for our users.
            </p>
          </section>

          <section className="values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>🎯 Quality</h3>
                <p>
                  We prioritize quality job listings and meaningful connections.
                </p>
              </div>
              <div className="value-item">
                <h3>🤝 Trust</h3>
                <p>We build trust through transparency and reliable service.</p>
              </div>
              <div className="value-item">
                <h3>🚀 Innovation</h3>
                <p>
                  We continuously innovate to improve the job search experience.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
