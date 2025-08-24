import React, { useState } from "react";
import "./Profile.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const { login, register } = useAuth();

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
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register
        await register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
      }

      // Success - navigate to user profile
      onNavigate("userprofile");
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(error.message || "حدث خطأ في العملية");
    } finally {
      setIsLoading(false);
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
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="fullName">
                    <i className="fas fa-user"></i>
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  {t("password")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="أدخل كلمة المرور"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-lock"></i>
                    {t("confirmPassword")}
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="أكد كلمة المرور"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
              )}

              <button type="submit" className="auth-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {isLogin ? "جاري تسجيل الدخول..." : "جاري إنشاء الحساب..."}
                  </>
                ) : (
                  <>
                    <i
                      className={`fas ${
                        isLogin ? "fa-sign-in-alt" : "fa-user-plus"
                      }`}></i>
                    {isLogin ? t("loginButton") : t("signupButton")}
                  </>
                )}
              </button>
            </form>

            <div className="auth-switch">
              <p>
                {isLogin ? t("noAccount") : t("hasAccount")}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                      fullName: "",
                    });
                  }}
                  className="switch-btn"
                  disabled={isLoading}>
                  {isLogin ? t("createAccount") : t("loginLink")}
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
