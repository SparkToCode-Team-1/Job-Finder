import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const currentLanguageText = language === "ar" ? "العربية" : "English";
  const currentLanguageTitle = language === "ar" ? "العربية" : "English";

  return (
    <div className="language-switcher">
      <button
        className="lang-btn "
        onClick={toggleLanguage}
        title={currentLanguageTitle}>
        <i className="fas fa-globe"></i>
        <span>{currentLanguageText}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
