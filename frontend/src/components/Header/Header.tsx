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
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    onNavigate("home");
    setIsMobileMenuOpen(false);
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
    <header
      className={`header ${isScrolled ? "scrolled" : "transparent"} ${
        currentPage === "about" ||
        currentPage === "userprofile" ||
        currentPage === "login"
          ? "dark-header"
          : ""
      }`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => handleNavigation("home")}>
            <img src="/images/logo.png" alt="Job Finder Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
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
                <li className="user-menu">
                  <div className="user-info">
                    <i className="fas fa-user-circle nav-icon"></i>
                    <span>{user.fullName || "المستخدم"}</span>
                    <i className="fas fa-chevron-down"></i>
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
              )}
            </ul>
          </nav>

          {/* Header Controls */}
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
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <nav className="nav">
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
                <li>
                  <button
                    onClick={() => handleNavigation("userprofile")}
                    className="nav-link">
                    <i className="fas fa-user nav-icon"></i>
                    <span>{t("profile")}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="nav-link logout-mobile">
                    <i className="fas fa-sign-out-alt nav-icon"></i>
                    <span>{t("logout")}</span>
                  </button>
                </li>
              </>
            )}
            <li className="mobile-lang-switcher">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
