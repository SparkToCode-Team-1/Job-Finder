import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation object
const translations = {
  ar: {
    // Header
    home: 'الرئيسية',
    jobs: 'الوظائف',
    about: 'حولنا',
    login: 'دخول',
    logout: 'خروج',
    profile: 'الملف الشخصي',
    welcome: 'مرحباً',
    
    // Login/Signup
    loginTitle: 'تسجيل الدخول',
    signupTitle: 'إنشاء حساب جديد',
    loginSubtitle: 'مرحباً بك مرة أخرى!',
    signupSubtitle: 'انضم إلينا اليوم',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    loginButton: 'دخول',
    signupButton: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    createAccount: 'إنشاء حساب جديد',
    loginLink: 'تسجيل الدخول',
    or: 'أو',
    continueWithGoogle: 'متابعة مع Google',
    continueWithFacebook: 'متابعة مع Facebook',
    
    // User Profile
    personalInfo: 'المعلومات الشخصية',
    professionalInfo: 'المعلومات المهنية',
    personalBio: 'نبذة شخصية',
    applicationHistory: 'سجل التطبيقات',
    location: 'الموقع',
    phone: 'رقم الهاتف',
    experience: 'الخبرة',
    skills: 'المهارات',
    education: 'التعليم',
    editProfile: 'تعديل البيانات',
    downloadCV: 'تحميل السيرة الذاتية',
    saveChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',
    saving: 'جاري الحفظ...',
    
    // Application Status
    pending: 'قيد المراجعة',
    accepted: 'مقبول',
    rejected: 'مرفوض',
    
    // Jobs Page
    searchJobs: 'البحث عن الوظائف',
    searchPlaceholder: 'ابحث عن وظيفة...',
    allCategories: 'جميع الفئات',
    allLocations: 'جميع المواقع',
    salary: 'الراتب',
    company: 'الشركة',
    applyNow: 'تقدم الآن',
    viewDetails: 'عرض التفاصيل',
    
    // Home Page
    heroTitle: 'اعثر على وظيفة أحلامك',
    heroSubtitle: 'اكتشف آلاف الفرص الوظيفية من أفضل الشركات',
    getStarted: 'ابدأ الآن',
    browseJobs: 'تصفح الوظائف',
    jobsPosted: 'وظيفة متاحة',
    companies: 'شركة',
    successfulHires: 'توظيف ناجح',
    activeUsers: 'مستخدم نشط',
    
    // Features
    easySearch: 'بحث سهل',
    easySearchDesc: 'ابحث عن الوظائف بسهولة باستخدام المرشحات المتقدمة',
    topCompanies: 'أفضل الشركات',
    topCompaniesDesc: 'تواصل مع أفضل الشركات في السوق',
    careerGrowth: 'نمو مهني',
    careerGrowthDesc: 'طور مسيرتك المهنية مع الفرص المناسبة',
    
    // Footer
    quickLinks: 'روابط سريعة',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح',
    close: 'إغلاق',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    search: 'بحث'
  },
  en: {
    // Header
    home: 'Home',
    jobs: 'Jobs',
    about: 'About',
    login: 'Login',
    logout: 'Logout',
    profile: 'Profile',
    welcome: 'Welcome',
    
    // Login/Signup
    loginTitle: 'Login',
    signupTitle: 'Create Account',
    loginSubtitle: 'Welcome back!',
    signupSubtitle: 'Join us today',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginButton: 'Login',
    signupButton: 'Sign Up',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    createAccount: 'Create Account',
    loginLink: 'Login',
    or: 'Or',
    continueWithGoogle: 'Continue with Google',
    continueWithFacebook: 'Continue with Facebook',
    
    // User Profile
    personalInfo: 'Personal Information',
    professionalInfo: 'Professional Information',
    personalBio: 'Personal Bio',
    applicationHistory: 'Application History',
    location: 'Location',
    phone: 'Phone',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    editProfile: 'Edit Profile',
    downloadCV: 'Download CV',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    saving: 'Saving...',
    
    // Application Status
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    
    // Jobs Page
    searchJobs: 'Search Jobs',
    searchPlaceholder: 'Search for jobs...',
    allCategories: 'All Categories',
    allLocations: 'All Locations',
    salary: 'Salary',
    company: 'Company',
    applyNow: 'Apply Now',
    viewDetails: 'View Details',
    
    // Home Page
    heroTitle: 'Find Your Dream Job',
    heroSubtitle: 'Discover thousands of job opportunities from top companies',
    getStarted: 'Get Started',
    browseJobs: 'Browse Jobs',
    jobsPosted: 'Jobs Posted',
    companies: 'Companies',
    successfulHires: 'Successful Hires',
    activeUsers: 'Active Users',
    
    // Features
    easySearch: 'Easy Search',
    easySearchDesc: 'Find jobs easily with advanced filters',
    topCompanies: 'Top Companies',
    topCompaniesDesc: 'Connect with the best companies in the market',
    careerGrowth: 'Career Growth',
    careerGrowthDesc: 'Grow your career with the right opportunities',
    
    // Footer
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved',
    
    // Common
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    close: 'Close',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'ar'; // Default to Arabic
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  // Set initial direction
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
