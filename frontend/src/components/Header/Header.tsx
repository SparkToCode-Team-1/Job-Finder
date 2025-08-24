import React, { useState, useEffect } from "react";
import "./Header.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleLogout = async () => {
    await logout();
    onNavigate("home");
    setIsMobileMenuOpen(false);
  };

  // Check authentication status on component mount
  useEffect(() => {
    // Authentication state is now managed by AuthContext
    // No need for manual state management
  }, []);

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

          <div className="header-controls">
            <LanguageSwitcher />

            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu">
              <i
                className={`fas ${
                  isMobileMenuOpen ? "fa-times" : "fa-bars"
                }`}></i>
            </button>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? "active" : ""}`}>
            <ul className="nav-list">
              <li>
                <button
                  onClick={() => handleNavigation("home")}
                  className={`nav-link ${
                    currentPage === "home" ? "active" : ""
                  }`}>
                  <i className="fas fa-home nav-icon"></i>
                  <span>{t("home")}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("jobs")}
                  className={`nav-link ${
                    currentPage === "jobs" ? "active" : ""
                  }`}>
                  <i className="fas fa-briefcase nav-icon"></i>
                  <span>{t("jobs")}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("about")}
                  className={`nav-link ${
                    currentPage === "about" ? "active" : ""
                  }`}>
                  <i className="fas fa-info-circle nav-icon"></i>
                  <span>{t("about")}</span>
                </button>
              </li>

              {!user ? (
                <li>
                  <button
                    onClick={() => handleNavigation("login")}
                    className={`nav-link ${
                      currentPage === "login" ? "active" : ""
                    }`}>
                    <i className="fas fa-sign-in-alt nav-icon"></i>
                    <span>{t("login")}</span>
                  </button>
                </li>
              ) : (
                <>
                  <li className="user-menu">
                    <div className="user-info">
                      <i className="fas fa-user-circle nav-icon"></i>
                      <span>{user.fullName || "المستخدم"}</span>
                    </div>
                    <div className="dropdown-menu">
                      <button
                        onClick={() => handleNavigation("userprofile")}
                        className="dropdown-item">
                        <i className="fas fa-user"></i>
                        {t("profile")}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout">
                        <i className="fas fa-sign-out-alt"></i>
                        {t("logout")}
                      </button>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
