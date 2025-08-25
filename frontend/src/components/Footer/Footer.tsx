import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Footer.css";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-main to-secondary rounded-xl flex items-center justify-center mr-3"></div>
              <h3 className="text-2xl font-bold text-white">
                {language === "ar" ? "باحث الوظائف" : "Job Finder"}
              </h3>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              {language === "ar"
                ? "منصتك الموثوقة للعثور على وظيفة أحلامك. نربط المواهب المتميزة بأفضل الفرص الوظيفية في سلطنة عمان والمنطقة."
                : "Your trusted platform to find your dream job. We connect talented individuals with amazing opportunities across Oman and the region."}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-medium">
                {language === "ar" ? "تابعنا:" : "Follow us:"}
              </span>
              <div className="flex space-x-3">
                {[
                  {
                    icon: "fab fa-facebook-f",
                    href: "#",
                    color: "hover:text-blue-400",
                  },
                  {
                    icon: "fab fa-twitter",
                    href: "#",
                    color: "hover:text-blue-300",
                  },
                  {
                    icon: "fab fa-linkedin-in",
                    href: "#",
                    color: "hover:text-blue-500",
                  },
                  {
                    icon: "fab fa-instagram",
                    href: "#",
                    color: "hover:text-pink-400",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-gray-600 ${social.color} hover:transform hover:scale-110`}>
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <i className="fas fa-link text-main mr-2"></i>
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {[
                { key: "home", page: "home", icon: "fas fa-home" },
                { key: "jobs", page: "jobs", icon: "fas fa-briefcase" },
                { key: "about", page: "about", icon: "fas fa-info-circle" },
                { key: "profile", page: "profile", icon: "fas fa-user" },
              ].map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className="flex items-center text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 group">
                    <i
                      className={`${link.icon} text-main mr-3 group-hover:text-secondary transition-colors duration-300`}></i>
                    {t(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <i className="fas fa-headset text-main mr-2"></i>
              {language === "ar" ? "الدعم والتواصل" : "Support & Contact"}
            </h4>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-main/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-envelope text-main text-sm"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </p>
                  <a
                    href="mailto:info@jobfinder.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300">
                    info@jobfinder.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-main/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-phone text-main text-sm"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">
                    {language === "ar" ? "الهاتف" : "Phone"}
                  </p>
                  <a
                    href="tel:+96812345678"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    dir="ltr">
                    +968 1234 5678
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-main/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-map-marker-alt text-main text-sm"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">
                    {language === "ar" ? "الموقع" : "Location"}
                  </p>
                  <p className="text-gray-300">
                    {language === "ar" ? "سلطنه عمان" : "Oman , muscat"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <i className="fas fa-copyright mr-2"></i>
              <span>
                2025 {language === "ar" ? "باحث الوظائف" : "Job Finder"}.
                {" " +
                  (language === "ar"
                    ? "جميع الحقوق محفوظة"
                    : "All rights reserved")}
                .
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              {[
                { ar: "سياسة الخصوصية", en: "Privacy Policy" },
                { ar: "الشروط والأحكام", en: "Terms & Conditions" },
                { ar: "المساعدة", en: "Help" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="text-gray-400 hover:text-white transition-colors duration-300">
                  {language === "ar" ? item.ar : item.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
