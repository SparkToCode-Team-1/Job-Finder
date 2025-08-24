import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === "ar" ? "active" : ""}`}
        onClick={() => setLanguage("ar")}
        title="العربية">
        <i className="fas fa-globe"></i>
        <span>العربية</span>
      </button>
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => setLanguage("en")}
        title="English">
        <i className="fas fa-globe"></i>
        <span>English</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
