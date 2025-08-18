import React from "react";
import TailwindDemo from "../../components/TailwindDemo/TailwindDemo";
import "./Home.css";

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
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
              <button
                onClick={() => onNavigate("jobs")}
                className="btn btn-primary">
                Browse Jobs
              </button>
              <button
                onClick={() => onNavigate("profile")}
                className="btn btn-secondary">
                Create Profile
              </button>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Job Finder?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>
                <i className="fas fa-bullseye"></i> Targeted Search
              </h3>
              <p>
                Find jobs that match your skills and preferences with our
                advanced search filters.
              </p>
            </div>
            <div className="feature-card">
              <h3>
                <i className="fas fa-building"></i> Top Companies
              </h3>
              <p>
                Connect with leading companies and startups looking for talented
                professionals.
              </p>
            </div>
            <div className="feature-card">
              <h3>
                <i className="fas fa-chart-line"></i> Career Growth
              </h3>
              <p>
                Access resources and opportunities to advance your career to the
                next level.
              </p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <TailwindDemo />
        </section>
      </div>
    </div>
  );
};

export default Home;
