import React from "react";
import "./Header.css";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const handleNavigation = (page: string) => {
    onNavigate(page);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => handleNavigation("home")}>
            <h1>Job Finder</h1>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <button
                  onClick={() => handleNavigation("home")}
                  className={`nav-link ${currentPage === "home" ? "active" : ""}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("jobs")}
                  className={`nav-link ${currentPage === "jobs" ? "active" : ""}`}
                >
                  Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("about")}
                  className={`nav-link ${currentPage === "about" ? "active" : ""}`}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("contact")}
                  className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("profile")}
                  className={`nav-link ${currentPage === "profile" ? "active" : ""}`}
                >
                  Profile
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
