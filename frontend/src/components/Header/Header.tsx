import React, { useState, useEffect } from "react";
import "./Header.css";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileMenuOpen &&
        !target.closest(".nav") &&
        !target.closest(".mobile-menu-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => handleNavigation("home")}>
            <img src="/images/logo.png" alt="Job Finder Logo" />
            <h1>JobFinder</h1>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu">
            <i
              className={`fas ${
                isMobileMenuOpen ? "fa-times" : "fa-bars"
              }`}></i>
          </button>

          <nav className={`nav ${isMobileMenuOpen ? "active" : ""}`}>
            <ul className="nav-list">
              <li>
                <button
                  onClick={() => handleNavigation("home")}
                  className={`nav-link ${
                    currentPage === "home" ? "active" : ""
                  }`}>
                  <i className="fas fa-home nav-icon"></i>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("jobs")}
                  className={`nav-link ${
                    currentPage === "jobs" ? "active" : ""
                  }`}>
                  <i className="fas fa-briefcase nav-icon"></i>
                  <span>Jobs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("about")}
                  className={`nav-link ${
                    currentPage === "about" ? "active" : ""
                  }`}>
                  <i className="fas fa-info-circle nav-icon"></i>
                  <span>About</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("contact")}
                  className={`nav-link ${
                    currentPage === "contact" ? "active" : ""
                  }`}>
                  <i className="fas fa-phone nav-icon"></i>
                  <span>Contact</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("profile")}
                  className={`nav-link ${
                    currentPage === "profile" ? "active" : ""
                  }`}>
                  <i className="fas fa-user nav-icon"></i>
                  <span>Profile</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
