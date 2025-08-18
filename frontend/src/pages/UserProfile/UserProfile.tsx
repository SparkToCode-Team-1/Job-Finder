import React, { useState, useEffect } from 'react';
import './UserProfile.css';

interface UserProfileData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string;
  bio: string;
  education: string;
  profileImage?: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    bio: '',
    education: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load user profile data on component mount
  useEffect(() => {
    // This would typically fetch from an API
    // For now, we'll use sample data
    const sampleProfile: UserProfileData = {
      id: 1,
      name: 'محمد أحمد',
      email: 'mohammed@example.com',
      phone: '+964 771 234 5678',
      location: 'بغداد، العراق',
      experience: 'مطور واجهات أمامية بخبرة 3 سنوات',
      skills: 'React, TypeScript, JavaScript, HTML, CSS, Node.js',
      bio: 'مطور واجهات أمامية شغوف بتطوير تطبيقات الويب الحديثة. أحب التعلم والتطوير المستمر في مجال التقنيات الحديثة.',
      education: 'بكالوريوس علوم الحاسوب - جامعة بغداد',
      profileImage: ''
    };
    setProfile(sampleProfile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would make an API call to save the profile
      console.log('Saving profile:', profile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      alert('تم حفظ البيانات بنجاح!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('حدث خطأ في حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    window.location.reload();
  };

  return (
    <div className="user-profile">
      <div className="container">
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
            <h1>{profile.name}</h1>
            <p className="location">
              <i className="fas fa-map-marker-alt"></i>
              {profile.location}
            </p>
            <div className="profile-actions">
              {!isEditing ? (
                <>
                  <button 
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
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
                    disabled={loading}
                  >
                    <i className="fas fa-save"></i>
                    {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
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
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        placeholder="أدخل الاسم الكامل"
                      />
                    ) : (
                      <div className="display-value">{profile.name}</div>
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
                      <div className="display-value">{profile.location}</div>
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
                    <div className="display-value">{profile.experience}</div>
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
                      {profile.skills.split(',').map((skill, index) => (
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
                    <div className="display-value bio-text">{profile.bio}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Applications History */}
            <div className="profile-section">
              <h2>
                <i className="fas fa-history"></i>
                سجل التطبيقات
              </h2>
              <div className="section-content">
                <div className="applications-list">
                  <div className="application-item">
                    <div className="application-info">
                      <h4>مطور واجهات أمامية</h4>
                      <p>شركة التقنيات المتقدمة</p>
                      <span className="application-date">15 ديسمبر 2024</span>
                    </div>
                    <div className="application-status pending">
                      <i className="fas fa-clock"></i>
                      قيد المراجعة
                    </div>
                  </div>
                  <div className="application-item">
                    <div className="application-info">
                      <h4>مطور React</h4>
                      <p>شركة البرمجيات الذكية</p>
                      <span className="application-date">12 ديسمبر 2024</span>
                    </div>
                    <div className="application-status accepted">
                      <i className="fas fa-check"></i>
                      مقبول
                    </div>
                  </div>
                  <div className="application-item">
                    <div className="application-info">
                      <h4>مطور JavaScript</h4>
                      <p>شركة الحلول الرقمية</p>
                      <span className="application-date">10 ديسمبر 2024</span>
                    </div>
                    <div className="application-status rejected">
                      <i className="fas fa-times"></i>
                      مرفوض
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
