import React, { useEffect } from "react";
import "./Home.css";

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Counter animation function
    const animateCounters = () => {
      const counters = document.querySelectorAll(".stats-number");

      const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
            const target = parseInt(counter.getAttribute("data-target") || "0");
            const increment = target / 200;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }

              // Add special formatting for the last stat (percentage)
              if (counter.getAttribute("data-target") === "95") {
                counter.textContent = Math.floor(current) + "%";
              } else if (target >= 1000) {
                counter.textContent =
                  Math.floor(current).toLocaleString() + "+";
              } else {
                counter.textContent = Math.floor(current).toString();
              }
            }, 10);

            observer.unobserve(counter);
          }
        });
      }, observerOptions);

      counters.forEach((counter) => observer.observe(counter));
    };

    // Run animation after component mounts
    const timer = setTimeout(animateCounters, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Find Your Dream Job Today</h1>
              <p>
                Discover thousands of job opportunities from top companies
                around the world. Join our community of professionals and take
                your career to the next level.
              </p>
              <div className="hero-actions">
                <button
                  onClick={() => onNavigate("jobs")}
                  className="btn btn-primary">
                  <i className="fas fa-search"></i>
                  Browse Jobs
                </button>
                <button
                  onClick={() => onNavigate("profile")}
                  className="btn btn-secondary">
                  <i className="fas fa-user-plus"></i>
                  Create Profile
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/hero-sec-img.gif" alt="Job Search Animation" />
            </div>
          </div>
        </section>

        <section className="statistics">
          <div className="stats-container">
            <div className="stats-item">
              <div className="stats-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="stats-number" data-target="15000">
                0
              </div>
              <div className="stats-label">Active Jobs</div>
            </div>
            <div className="stats-item">
              <div className="stats-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stats-number" data-target="50000">
                0
              </div>
              <div className="stats-label">Happy Users</div>
            </div>
            <div className="stats-item">
              <div className="stats-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="stats-number" data-target="2500">
                0
              </div>
              <div className="stats-label">Companies</div>
            </div>
            <div className="stats-item">
              <div className="stats-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stats-number" data-target="95">
                0
              </div>
              <div className="stats-label">Success Rate</div>
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

        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p>
                  "Job Finder helped me land my dream job at a top tech company.
                  The platform is intuitive and the job matching is excellent!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="author-info">
                  <h4>أحمد الشريف</h4>
                  <span>مهندس برمجيات في شركة التكنولوجيا</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p>
                  "Amazing platform! I found multiple opportunities and the
                  application process was smooth. Highly recommended for job
                  seekers."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="author-info">
                  <h4>فاطمة العلي</h4>
                  <span>مديرة التسويق في شركة النمو</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p>
                  "The best job platform I've used. Great companies, easy
                  application process, and excellent support team."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="author-info">
                  <h4>نورا محمد</h4>
                  <span>محللة البيانات في شركة التحليلات</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section"></section>
      </div>
    </div>
  );
};

export default Home;
