import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { apiService, User, JobApplication } from "../../services/api";

const UserProfile: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<User>({
    id: 0,
    fullName: "",
    email: "",
    role: "",
    phone: "",
    location: "",
    experience: "",
    skills: "",
    bio: "",
    education: "",
    resumeUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState<JobApplication[]>([]);

  // Load user profile data on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          setLoading(true);

          // Load user profile
          const userProfile = await apiService.getUserProfile();
          setProfile(userProfile);

          // Load user applications
          const userApplications = await apiService.getUserApplications();
          setApplications(userApplications);
        } catch (error) {
          console.error("Error loading profile:", error);
          // If API fails, use user data from context
          setProfile({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone || "",
            location: user.location || "",
            experience: user.experience || "",
            skills: user.skills || "",
            bio: user.bio || "",
            education: user.education || "",
            resumeUrl: user.resumeUrl || "",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      // Make API call to save the profile
      await apiService.updateUserProfile(profile);

      // Update user context
      updateUser(profile);

      setIsEditing(false);
      alert("تم حفظ البيانات بنجاح!");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError(error.message || "حدث خطأ في حفظ البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    // Reset to original data from user context
    if (user) {
      setProfile({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        location: user.location || "",
        experience: user.experience || "",
        skills: user.skills || "",
        bio: user.bio || "",
        education: user.education || "",
        resumeUrl: user.resumeUrl || "",
      });
    }
  };

  return (
    <div className="user-profile">
      <div className="container">
        {!user ? (
          <div className="auth-required">
            <div className="auth-message">
              <i className="fas fa-lock"></i>
              <h2>يجب تسجيل الدخول أولاً</h2>
              <p>للوصول إلى هذه الصفحة، يجب عليك تسجيل الدخول أولاً</p>
              <button
                className="login-btn"
                onClick={() => (window.location.href = "/login")}>
                <i className="fas fa-sign-in-alt"></i>
                تسجيل الدخول
              </button>
            </div>
          </div>
        ) : (
          <>
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>جاري تحميل البيانات...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
                {isEditing && (
                  <button className="change-avatar-btn">
                    <i className="fas fa-camera"></i>
                  </button>
                )}
              </div>
              <div className="profile-info">
                <h1>{profile.fullName}</h1>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  {profile.location}
                </p>
                <div className="profile-actions">
                  {!isEditing ? (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}>
                        <i className="fas fa-edit"></i>
                        تعديل البيانات
                      </button>
                      <button className="download-cv-btn">
                        <i className="fas fa-download"></i>
                        تحميل السيرة الذاتية
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={loading}>
                        <i className="fas fa-save"></i>
                        {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                        إلغاء
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-sections">
                {/* Personal Information */}
                <div className="profile-section">
                  <h2>
                    <i className="fas fa-user-circle"></i>
                    المعلومات الشخصية
                  </h2>
                  <div className="section-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label>الاسم الكامل</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleInputChange}
                            placeholder="أدخل الاسم الكامل"
                          />
                        ) : (
                          <div className="display-value">
                            {profile.fullName}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            placeholder="أدخل البريد الإلكتروني"
                          />
                        ) : (
                          <div className="display-value">{profile.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>رقم الهاتف</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            placeholder="أدخل رقم الهاتف"
                          />
                        ) : (
                          <div className="display-value">{profile.phone}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>الموقع</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={profile.location}
                            onChange={handleInputChange}
                            placeholder="أدخل الموقع"
                          />
                        ) : (
                          <div className="display-value">
                            {profile.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="profile-section">
                  <h2>
                    <i className="fas fa-briefcase"></i>
                    المعلومات المهنية
                  </h2>
                  <div className="section-content">
                    <div className="form-group">
                      <label>الخبرة</label>
                      {isEditing ? (
                        <textarea
                          name="experience"
                          value={profile.experience}
                          onChange={handleInputChange}
                          placeholder="اكتب عن خبرتك المهنية"
                          rows={3}
                        />
                      ) : (
                        <div className="display-value">
                          {profile.experience}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>المهارات</label>
                      {isEditing ? (
                        <textarea
                          name="skills"
                          value={profile.skills}
                          onChange={handleInputChange}
                          placeholder="اكتب مهاراتك (مفصولة بفواصل)"
                          rows={2}
                        />
                      ) : (
                        <div className="skills-display">
                          {profile.skills &&
                            profile.skills
                              .split(",")
                              .map((skill: string, index: number) => (
                                <span key={index} className="skill-tag">
                                  {skill.trim()}
                                </span>
                              ))}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>التعليم</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="education"
                          value={profile.education}
                          onChange={handleInputChange}
                          placeholder="أدخل المؤهل التعليمي"
                        />
                      ) : (
                        <div className="display-value">{profile.education}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="profile-section">
                  <h2>
                    <i className="fas fa-info-circle"></i>
                    نبذة شخصية
                  </h2>
                  <div className="section-content">
                    <div className="form-group">
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          placeholder="اكتب نبذة عن نفسك"
                          rows={4}
                        />
                      ) : (
                        <div className="display-value bio-text">
                          {profile.bio}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Applications History */}
                <div className="profile-section">
                  <h2>
                    <i className="fas fa-history"></i>
                    سجل التطبيقات ({applications.length})
                  </h2>
                  <div className="section-content">
                    <div className="applications-list">
                      {applications.length === 0 ? (
                        <div className="no-applications">
                          <i className="fas fa-briefcase"></i>
                          <p>لم تقدم على أي وظيفة بعد</p>
                          <p className="sub-text">
                            ابدأ بتصفح الوظائف المتاحة وقدم على الوظيفة التي
                            تناسبك
                          </p>
                        </div>
                      ) : (
                        <div className="applications-grid">
                          {applications.map((app) => (
                            <div key={app.id} className="application-card">
                              <div className="application-header">
                                <h3>{app.jobTitle}</h3>
                                <span
                                  className={`status-badge ${app.status.toLowerCase()}`}>
                                  {app.status === "PENDING"
                                    ? "قيد المراجعة"
                                    : app.status === "ACCEPTED"
                                    ? "مقبول"
                                    : app.status === "REJECTED"
                                    ? "مرفوض"
                                    : app.status}
                                </span>
                              </div>
                              <div className="application-details">
                                <p className="company-name">
                                  <i className="fas fa-building"></i>
                                  {app.companyName}
                                </p>
                                <p className="application-date">
                                  <i className="fas fa-calendar"></i>
                                  تاريخ التقديم:{" "}
                                  {new Date(
                                    app.applicationDate
                                  ).toLocaleDateString("ar-EG")}
                                </p>
                                {app.coverLetter && (
                                  <p className="cover-letter">
                                    <i className="fas fa-envelope"></i>
                                    الرسالة التعريفية: {app.coverLetter}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
