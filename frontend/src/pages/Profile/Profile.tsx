import React, { useState } from "react";
import "./Profile.css";
import { useLanguage } from "../../contexts/LanguageContext"; // استخدام الترجمة الآن
import { useAuth } from "../../contexts/AuthContext";

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const { login, register, reloadUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setError(t("passwordMismatch"));
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t("passwordMinLength"));
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Check for admin credentials
        if (
          formData.email === "admin@gmail.com" &&
          formData.password === "admin1234"
        ) {
          // Admin login - create fake admin user
          const adminUser = {
            id: 0,
            fullName: "المدير العام",
            email: "admin@gmail.com",
            role: "ADMIN",
            phone: "",
            location: "",
            experience: "",
            skills: "",
            bio: "",
            education: "",
            resumeUrl: "",
          };

          // Store admin data in localStorage with correct keys
          localStorage.setItem("userData", JSON.stringify(adminUser));
          localStorage.setItem("authToken", "admin-token");

          // Reload user in AuthContext
          reloadUser();

          // Navigate to admin page
          onNavigate("admin");
          return;
        }

        // Regular login
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
      setError(error.message || t("genericError"));
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
                    placeholder={t("fullNamePlaceholder")}
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
                  placeholder={t("emailPlaceholder")}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                  {t("password")}
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t("passwordPlaceholder")}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={
                      showPassword ? t("hidePassword") : t("showPassword")
                    }>
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}></i>
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-lock"></i>
                    {t("confirmPassword")}
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={t("confirmPasswordPlaceholder")}
                      required
                      disabled={isLoading}
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      aria-label={
                        showConfirmPassword
                          ? t("hidePassword")
                          : t("showPassword")
                      }>
                      <i
                        className={`fas ${
                          showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                        }`}></i>
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" className="auth-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {isLogin ? t("loggingIn") : t("signingUp")}
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
              <div className="divider"></div>
              <div className="social-buttons"></div>
            </div>
          </div>

          <div className="auth-image">
            <img
              src="/assets/images/hero-sec-img.gif"
              alt={t("loginAnimationAlt") || "Login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
