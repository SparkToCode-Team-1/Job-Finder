import React, { useState, useEffect } from "react";
// تم التحول إلى Tailwind، لم نعد نستخدم ملف UserProfile.css
// import { useLanguage } from "../../contexts/LanguageContext"; // غير مستخدم حالياً
import { useAuth } from "../../contexts/AuthContext";
import { apiService, User, JobApplication } from "../../services/api";

const UserProfile: React.FC = () => {
  // const { t } = useLanguage();
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
  const [success, setSuccess] = useState("");

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
    setSuccess("");
    try {
      // Make API call to save the profile
      await apiService.updateUserProfile(profile);

      // Update user context
      updateUser(profile);

      setIsEditing(false);
      setSuccess("تم حفظ البيانات بنجاح!");
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
    <div className="py-30 mt-32 min-h-screen bg-gradient-to-br from-primary-50 via-white to-white pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-6xl ">
        {!user ? (
          <div className="flex items-center justify-center min-h-[60vh] py-30 mt-20">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10 w-full max-w-md text-center animate-fade-in">
              <i className="fas fa-lock text-5xl text-red-500 mb-4"></i>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                يجب تسجيل الدخول أولاً
              </h2>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                للوصول إلى هذه الصفحة، يجب عليك تسجيل الدخول أولاً
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-main text-white font-semibold shadow hover:shadow-lg transition-transform hover:-translate-y-0.5">
                <i className="fas fa-sign-in-alt"></i>
                تسجيل الدخول
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Alerts */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 flex items-center gap-3 text-sm">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 flex items-center gap-3 text-sm">
                <i className="fas fa-check-circle"></i>
                <span>{success}</span>
              </div>
            )}

            {/* Header Card */}
            <div className="relative bg-white/80 backdrop-blur border border-slate-100 rounded-3xl shadow-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-8 animate-fade-in">
              <div className="relative flex flex-col items-center md:items-start w-full md:w-auto">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-main to-secondary flex items-center justify-center text-white text-5xl font-light shadow-inner">
                  <i className="fas fa-user"></i>
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-2 right-2 md:right-auto md:left-2 w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow transition">
                    <i className="fas fa-camera text-sm"></i>
                  </button>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-4 text-right">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-main leading-snug">
                    {profile.fullName || "بدون اسم"}
                  </h1>
                  <p className="flex items-center gap-2 text-slate-500 text-sm mt-1 justify-end">
                    <i className="fas fa-map-marker-alt text-pink-500"></i>
                    {profile.location || "غير محدد"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-end">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-main text-white text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition inline-flex items-center gap-2">
                        <i className="fas fa-edit"></i>
                        تعديل البيانات
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 disabled:opacity-60 text-white text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition inline-flex items-center gap-2">
                        <i className="fas fa-save"></i>
                        {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition inline-flex items-center gap-2">
                        <i className="fas fa-times"></i>
                        إلغاء
                      </button>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-end text-xs">
                  {profile.skills &&
                    !isEditing &&
                    profile.skills
                      .split(",")
                      .slice(0, 6)
                      .map((sk, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-600 font-medium">
                          {sk.trim()}
                        </span>
                      ))}
                </div>
              </div>
              {/* Quick Stats */}
              <div className="md:w-60 flex md:flex-col gap-4 justify-end">
                <div className="flex-1 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-100 p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-xs text-slate-500 mb-1 font-medium">
                    عدد الطلبات
                  </span>
                  <span className="text-3xl font-extrabold text-secondary">
                    {applications.length}
                  </span>
                </div>
              </div>
              {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                  <div className="flex flex-col items-center gap-3 text-secondary">
                    <i className="fas fa-spinner fa-spin text-2xl"></i>
                    <span className="text-sm font-medium">
                      جاري تحميل البيانات...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Main Grid */}
            <div className="grid xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2 space-y-8">
                {/* Sections */}
                <SectionCard icon="fa-user-circle" title="المعلومات الشخصية">
                  <TwoCol>
                    <Field
                      label="الاسم الكامل"
                      name="fullName"
                      value={profile.fullName}
                      editing={isEditing}
                      onChange={handleInputChange}
                      placeholder="أدخل الاسم الكامل"
                    />
                    <Field
                      label="البريد الإلكتروني"
                      name="email"
                      type="email"
                      value={profile.email}
                      editing={isEditing}
                      onChange={handleInputChange}
                      placeholder="أدخل البريد الإلكتروني"
                    />
                  </TwoCol>
                  <TwoCol>
                    <Field
                      label="رقم الهاتف"
                      name="phone"
                      type="tel"
                      value={profile.phone || ""}
                      editing={isEditing}
                      onChange={handleInputChange}
                      placeholder="أدخل رقم الهاتف"
                    />
                    <Field
                      label="الموقع"
                      name="location"
                      value={profile.location || ""}
                      editing={isEditing}
                      onChange={handleInputChange}
                      placeholder="أدخل الموقع"
                    />
                  </TwoCol>
                </SectionCard>

                <SectionCard icon="fa-briefcase" title="المعلومات المهنية">
                  <FieldArea
                    label="الخبرة"
                    name="experience"
                    value={profile.experience || ""}
                    editing={isEditing}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="اكتب عن خبرتك المهنية"
                  />
                  <FieldArea
                    label="المهارات"
                    name="skills"
                    value={profile.skills || ""}
                    editing={isEditing}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="اكتب مهاراتك (مفصولة بفواصل)"
                    renderDisplay={() => (
                      <div className="flex flex-wrap gap-2">
                        {(profile.skills || "")
                          .split(",")
                          .filter(Boolean)
                          .map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-gradient-to-r from-secondary/90 to-main/90 text-white text-xs font-medium shadow">
                              {s.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  />
                  <Field
                    label="التعليم"
                    name="education"
                    value={profile.education || ""}
                    editing={isEditing}
                    onChange={handleInputChange}
                    placeholder="أدخل المؤهل التعليمي"
                  />
                </SectionCard>

                <SectionCard icon="fa-info-circle" title="نبذة شخصية">
                  <FieldArea
                    label=""
                    name="bio"
                    value={profile.bio || ""}
                    editing={isEditing}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="اكتب نبذة عن نفسك"
                  />
                </SectionCard>
              </div>

              <div className="space-y-8">
                <SectionCard
                  icon="fa-history"
                  title={`سجل التطبيقات (${applications.length})`}>
                  {applications.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 flex flex-col items-center gap-3">
                      <i className="fas fa-briefcase text-4xl text-slate-300"></i>
                      <p className="text-slate-700 font-medium">
                        لم تقدم على أي وظيفة بعد
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        ابدأ بتصفح الوظائف المتاحة وقدم على الوظيفة التي تناسبك
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="group relative bg-white/70 backdrop-blur border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition overflow-hidden">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                              {app.jobTitle}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border shadow-sm ${
                                app.status === "PENDING"
                                  ? "bg-amber-50 border-amber-200 text-amber-700"
                                  : app.status === "ACCEPTED"
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                  : app.status === "REJECTED"
                                  ? "bg-rose-50 border-rose-200 text-rose-700"
                                  : "bg-slate-100 border-slate-200 text-slate-600"
                              }`}>
                              {app.status === "PENDING"
                                ? "قيد المراجعة"
                                : app.status === "ACCEPTED"
                                ? "مقبول"
                                : app.status === "REJECTED"
                                ? "مرفوض"
                                : app.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs text-right">
                            <p className="font-medium text-slate-600 flex items-center gap-2 justify-end">
                              <i className="fas fa-building text-secondary w-4 text-center"></i>
                              {app.companyName}
                            </p>
                            <p className="text-slate-500 flex items-center gap-2 justify-end">
                              <i className="fas fa-calendar text-secondary w-4 text-center"></i>
                              تاريخ التقديم:{" "}
                              {new Date(app.appliedAt).toLocaleDateString(
                                "ar-EG"
                              )}
                            </p>
                            {app.coverLetter && (
                              <p className="bg-slate-50 rounded-lg p-2 italic border border-slate-100 text-slate-500 leading-relaxed">
                                <i className="fas fa-envelope text-secondary ml-1"></i>
                                {app.coverLetter}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionCard>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// مكونات مساعدة صغيرة لخفض التكرار
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  editing: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const Field: React.FC<FieldProps> = ({
  label,
  name,
  value,
  editing,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="space-y-1 text-right">
    {label && (
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-600 tracking-wide">
        {label}
      </label>
    )}
    {editing ? (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white/70 backdrop-blur px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-main/40 focus:border-main transition text-right"
        dir="rtl"
      />
    ) : (
      <div className="min-h-[46px] w-full rounded-xl bg-slate-50/70 border border-slate-100 px-4 py-2.5 text-sm text-slate-700 flex items-center justify-end">
        {value || <span className="text-slate-400">—</span>}
      </div>
    )}
  </div>
);

interface FieldAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  value: string;
  editing: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  renderDisplay?: () => React.ReactNode;
}

const FieldArea: React.FC<FieldAreaProps> = ({
  label,
  name,
  value,
  editing,
  onChange,
  placeholder,
  rows = 3,
  renderDisplay,
}) => (
  <div className="space-y-1 text-right mb-4 last:mb-0">
    {label && (
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-slate-600 tracking-wide">
        {label}
      </label>
    )}
    {editing ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-slate-200 bg-white/70 backdrop-blur px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-main/40 focus:border-main transition resize-y leading-relaxed text-right"
        dir="rtl"
      />
    ) : (
      <div className="w-full rounded-xl bg-slate-50/70 border border-slate-100 px-4 py-3 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
        {value ? (
          renderDisplay ? (
            renderDisplay()
          ) : (
            value
          )
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </div>
    )}
  </div>
);

const TwoCol: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6 mb-6 last:mb-0">{children}</div>
);

const SectionCard: React.FC<{
  title: string;
  icon: string;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <section className="relative bg-white/80 backdrop-blur border border-slate-100 rounded-3xl shadow p-6 md:p-8 animate-fade-in">
    <h2 className="flex items-center gap-3 text-lg font-bold text-slate-800 pb-4 mb-6 border-b border-slate-100 justify-end">
      <span>{title}</span>
      <i className={`fas ${icon} text-main text-base`}></i>
    </h2>
    {children}
  </section>
);

export default UserProfile;
