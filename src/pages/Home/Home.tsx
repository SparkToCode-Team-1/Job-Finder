import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <h1>Find Your Dream Job Today</h1>
            <p>
              Discover thousands of job opportunities from top companies around
              the world.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn btn-primary">
                Browse Jobs
              </a>
              <a href="#" className="btn btn-secondary">
                Create Profile
              </a>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Job Finder?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎯 Targeted Search</h3>
              <p>
                Find jobs that match your skills and preferences with our
                advanced search filters.
              </p>
            </div>
            <div className="feature-card">
              <h3>🏢 Top Companies</h3>
              <p>
                Connect with leading companies and startups looking for talented
                professionals.
              </p>
            </div>
            <div className="feature-card">
              <h3>📊 Career Growth</h3>
              <p>
                Access resources and opportunities to advance your career to the
                next level.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
