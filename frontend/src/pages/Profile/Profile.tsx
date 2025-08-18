import React, { useState } from "react";
import "./Profile.css";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    try {
      // Here you would make an API call to your authentication endpoint
      console.log(isLogin ? "Login attempt:" : "Signup attempt:", formData);

      // Simulate successful authentication
      const mockUserData = {
        name: formData.fullName || "محمد أحمد",
        email: formData.email,
        token: "mock-jwt-token-12345",
      };

      // Store authentication data
      localStorage.setItem("authToken", mockUserData.token);
      localStorage.setItem("userInfo", JSON.stringify(mockUserData));

      // Navigate to user profile
      onNavigate("userprofile");
    } catch (error) {
      console.error("Authentication error:", error);
      alert("حدث خطأ في تسجيل الدخول");
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>{isLogin ? t("loginTitle") : t("signupTitle")}</h1>
              <p>{isLogin ? t("loginSubtitle") : t("signupSubtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="fullName">
                    <i className="fas fa-user"></i>
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-lock"></i>
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="أكد كلمة المرور"
                    required
                  />
                </div>
              )}

              <button type="submit" className="auth-btn">
                <i
                  className={`fas ${
                    isLogin ? "fa-sign-in-alt" : "fa-user-plus"
                  }`}></i>
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
              </button>
            </form>

            <div className="auth-switch">
              <p>
                {isLogin ? "لا تملك حساباً؟" : "تملك حساباً بالفعل؟"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="switch-btn">
                  {isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول"}
                </button>
              </p>
            </div>

            <div className="social-login">
              <div className="divider">
                <span>أو</span>
              </div>
              <div className="social-buttons">
                <button type="button" className="social-btn google-btn">
                  <i className="fab fa-google"></i>
                  متابعة مع Google
                </button>
                <button type="button" className="social-btn facebook-btn">
                  <i className="fab fa-facebook-f"></i>
                  متابعة مع Facebook
                </button>
              </div>
            </div>
          </div>

          <div className="auth-image">
            <img src="/images/hero-sec-img.gif" alt="Login Animation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
