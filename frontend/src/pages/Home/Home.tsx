import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLanguage } from "../../contexts/LanguageContext";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: string;
  category?: string;
  description?: string;
  postedAt?: string;
}

interface HomeProps {
  onNavigate: (page: string) => void;
}

interface Stats {
  totalJobs: number;
  totalCompanies: number;
  totalUsers: number;
  successRate: number;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalJobs: 1250, // fallback values
    totalCompanies: 450,
    totalUsers: 8500,
    successRate: 95,
  });
  const [statsLoaded, setStatsLoaded] = useState(true); // Start as loaded

  const isLoggedIn = () => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    return !!token;
  };

  // Handle job application
  const handleApply = (jobId: number) => {
    if (!isLoggedIn()) {
      // Show login prompt modal
      setShowLoginPrompt(true);
      return;
    }
    // If logged in, proceed to job details or application page
    onNavigate("jobs");
  };

  // Handle view all jobs
  const handleViewAllJobs = () => {
    if (!isLoggedIn()) {
      setShowLoginPrompt(true);
      return;
    }
    onNavigate("jobs");
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    onNavigate("login");
  };

  // API base URL - adjust as needed
  const API_BASE_URL = "http://localhost:8080/api/jobs";

  // Fetch statistics from backend
  const fetchStats = async () => {
    try {
      console.log("Fetching stats from:", `${API_BASE_URL}/stats`);
      const response = await fetch(`${API_BASE_URL}/stats`);
      console.log("Stats response status:", response.status);
      if (response.ok) {
        const statsData = await response.json();
        console.log("Stats data received:", statsData);
        setStats({
          totalJobs: statsData.totalJobs || 0,
          totalCompanies: statsData.totalCompanies || 0,
          totalUsers: statsData.totalUsers || 0,
          successRate: statsData.successRate || 0,
        });
        setStatsLoaded(true);
        console.log("Stats loaded successfully");
      } else {
        console.error("Stats response not OK:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Use default values if API fails
      setStats({
        totalJobs: 1250,
        totalCompanies: 450,
        totalUsers: 8500,
        successRate: 95,
      });
      setStatsLoaded(true);
      console.log("Using fallback stats");
    }
  }; // Add sample jobs to backend if needed
  const initializeBackendData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/add-sample`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const message = await response.text();
        console.log("Backend initialization:", message);
      }
    } catch (error) {
      console.error("Error initializing backend data:", error);
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);

    try {
      // Build search URL with query parameters
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.append("title", searchQuery);
      if (locationQuery) searchParams.append("location", locationQuery);
      if (selectedCategory) searchParams.append("category", selectedCategory);
      searchParams.append("limit", "3"); // Show only 3 jobs

      const searchUrl = `${API_BASE_URL}/search?${searchParams.toString()}`;
      console.log("Search URL:", searchUrl);

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error("Search failed");
      }

      const searchResults = await response.json();
      console.log("Search results:", searchResults);

      // Transform backend data to match our interface
      const transformedResults = searchResults.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location || "Not specified",
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        jobType: job.jobType || "Full-time",
        category: job.category,
        description: job.description,
        postedAt: job.postedAt,
      }));

      setSearchResults(transformedResults);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Helper function to format salary
  const formatSalary = (job: Job): string => {
    if (job.salaryMin && job.salaryMax) {
      if (language === "ar") {
        return `${job.salaryMin}-${job.salaryMax} ريال عماني`;
      } else {
        return `$${job.salaryMin}-${job.salaryMax}`;
      }
    } else if (job.salaryMin) {
      if (language === "ar") {
        return `من ${job.salaryMin} دينار`;
      } else {
        return `From $${job.salaryMin}`;
      }
    } else {
      return language === "ar" ? "غير محدد" : "Not specified";
    }
  };
  useEffect(() => {
    // Initialize backend data on component mount
    initializeBackendData();

    // Fetch statistics
    fetchStats();

    // Check if the image exists
    const testImage = new Image();
    testImage.onload = () => console.log("Hero image preload successful");
    testImage.onerror = () => console.log("Hero image preload failed");
    testImage.src = "/assets/images/hero-sec-img.gif";

    // Counter animation function with real data - only run when stats are loaded
    const animateCounters = () => {
      console.log(
        "animateCounters called, statsLoaded:",
        statsLoaded,
        "stats:",
        stats
      );
      if (!statsLoaded) {
        console.log("Stats not loaded yet, skipping animation");
        return; // Don't animate if stats aren't loaded yet
      }

      const counters = document.querySelectorAll(".stats-number");
      console.log("Found counters:", counters.length);

      const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
            const targetAttr = counter.getAttribute("data-target");
            const statType = counter.getAttribute("data-stat-type");

            // Skip if already animated
            if (counter.getAttribute("data-animated") === "true") {
              observer.unobserve(counter);
              return;
            }

            let target = 0;

            // Use real data from stats
            if (statType === "jobs") {
              target = stats.totalJobs;
            } else if (statType === "companies") {
              target = stats.totalCompanies;
            } else if (statType === "users") {
              target = stats.totalUsers;
            } else if (statType === "success") {
              target = stats.successRate;
            } else {
              target = parseInt(targetAttr || "0");
            }

            const increment = target / 200;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
                counter.setAttribute("data-animated", "true");
              }

              // Add special formatting for the success rate (percentage)
              if (statType === "success") {
                counter.textContent = Math.floor(current) + "%";
              } else if (target >= 1000) {
                counter.textContent =
                  Math.floor(current).toLocaleString() + "+";
              } else {
                counter.textContent = Math.floor(current).toString();
              }
            }, 10);

            observer.unobserve(counter);
          }
        });
      }, observerOptions);

      counters.forEach((counter) => observer.observe(counter));
    }; // Run animation after component mounts and stats are loaded
    const timer = setTimeout(animateCounters, 100);
    return () => clearTimeout(timer);
  }, [stats, statsLoaded]);

  // Lazy reveal animation for sections/cards
  useEffect(() => {
    const targets: NodeListOf<HTMLElement> =
      document.querySelectorAll(".home-lazy .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el, i) => {
      el.style.transitionDelay = `${i * 90}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-lazy">
      <section className="min-h-screen">
        {/* Hero Section - Fixed Search Area */}
        <div
          className="relative bg-cover bg-center bg-fixed bg-no-repeat  min-h-screen"
          style={{
            backgroundImage: `url('/assets/images/mesh-427.png')`,
          }}>
          {/* Hero Content Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Title and Subtitle - Always at Top */}
              <div className="text-center animate-fade-in mb-8 reveal">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                  {t("heroTitle")}
                </h1>
                <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-xl mx-auto">
                  {t("heroSubtitle")}
                </p>
              </div>

              {/* Search Bar - Always Centered */}
              <div className="flex justify-center mb-12 relative reveal">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 w-full max-w-4xl relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Job Title Search */}
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-search text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("jobTitlePlaceholder")}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    {/* Location Search */}
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-map-marker-alt text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder={t("locationPlaceholder")}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-briefcase text-gray-400"></i>
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none cursor-pointer">
                        <option value="">{t("allCategories")}</option>
                        <option value="Technology">{t("technology")}</option>
                        <option value="Data Science">{t("dataScience")}</option>
                        <option value="Design">{t("design")}</option>
                        <option value="Marketing">{t("marketing")}</option>
                        <option value="Sales">{t("sales")}</option>
                        <option value="Healthcare">{t("healthcare")}</option>
                        <option value="Finance">{t("finance")}</option>
                        <option value="Education">{t("education")}</option>
                        <option value="Engineering">{t("engineering")}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>

                    {/* Search Button */}
                    <button
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="bg-gradient-to-r from-main to-secondary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSearching ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-search"></i>
                      )}
                      <span className="hidden sm:inline">
                        {isSearching ? t("loading") : t("findJobs")}
                      </span>
                    </button>
                  </div>
                  {/* Quick Filters */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="text-sm text-gray-600 mr-2">
                      {t("popular")}
                    </span>
                    {[
                      { key: "remoteWork", label: t("remoteWork") },
                      { key: "fullTime", label: t("fullTime") },
                      { key: "seniorLevel", label: t("seniorLevel") },
                      { key: "startup", label: t("startup") },
                      { key: "tech", label: t("tech") },
                    ].map((tag) => (
                      <button
                        key={tag.key}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-main hover:text-white text-gray-700 rounded-full transition-all duration-200 border border-gray-200 hover:border-main">
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Results Modal - Right below search bar */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-h-96 overflow-y-auto">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                          <span>
                            {language === "ar"
                              ? "نتائج البحث"
                              : "Search Results"}{" "}
                            ({searchResults.length})
                          </span>
                          <button
                            onClick={() => setSearchResults([])}
                            className="text-gray-400 hover:text-gray-600 transition-colors">
                            <i className="fas fa-times"></i>
                          </button>
                        </h3>

                        <div className="space-y-3">
                          {searchResults.map((job) => (
                            <div
                              key={job.id}
                              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100 reveal">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {job.title}
                                </h4>
                                <div className="flex items-center text-sm text-gray-600 space-x-4">
                                  <span className="flex items-center">
                                    <i className="fas fa-building w-4 mr-2"></i>
                                    {job.company}
                                  </span>
                                  <span className="flex items-center">
                                    <i className="fas fa-map-marker-alt w-4 mr-2"></i>
                                    {job.location}
                                  </span>
                                  <span className="flex items-center">
                                    <i className="fas fa-money-bill-wave w-4 mr-2"></i>
                                    {formatSalary(job)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="inline-block bg-main/10 text-main px-2 py-1 rounded text-xs font-medium">
                                  {job.jobType}
                                </span>
                                <button
                                  onClick={() => handleApply(job.id)}
                                  className="bg-gradient-to-r from-main to-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all">
                                  {language === "ar" ? "تقديم" : "Apply"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={handleViewAllJobs}
                            className="w-full text-center text-main hover:text-secondary font-medium transition-colors">
                            {language === "ar"
                              ? "عرض جميع الوظائف"
                              : "View All Jobs"}{" "}
                            →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/assets/images/magicpattern-polka-dot-pattern-1756022749689.png')`,
        }}>
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "إحصائيات المنصة" : "Platform Statistics"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ar"
                ? "نفخر بخدمة آلاف الباحثين عن عمل والشركات في جميع أنحاء سلطنة عمان"
                : "We're proud to serve thousands of job seekers and companies across Oman"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Active Jobs */}
            <div className="text-center reveal">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-main/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-briefcase text-2xl text-main"></i>
                </div>
                <div
                  className="stats-number text-4xl font-bold text-gray-900 mb-2"
                  data-stat-type="jobs">
                  0
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "وظيفة نشطة" : "Active Jobs"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "ar"
                    ? "وظائف متاحة للتقديم"
                    : "Available positions"}
                </p>
              </div>
            </div>

            {/* Registered Companies */}
            <div className="text-center reveal">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-building text-2xl text-secondary"></i>
                </div>
                <div
                  className="stats-number text-4xl font-bold text-gray-900 mb-2"
                  data-stat-type="companies">
                  0
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "شركة مسجلة" : "Companies"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "ar"
                    ? "شركات تبحث عن موظفين"
                    : "Hiring partners"}
                </p>
              </div>
            </div>

            {/* Job Seekers */}
            <div className="text-center reveal">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-2xl text-green-600"></i>
                </div>
                <div
                  className="stats-number text-4xl font-bold text-gray-900 mb-2"
                  data-stat-type="users">
                  0
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "باحث عن عمل" : "Job Seekers"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "ar" ? "مستخدمون مسجلون" : "Registered users"}
                </p>
              </div>
            </div>

            {/* Success Rate */}
            <div className="text-center reveal">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-2xl text-purple-600"></i>
                </div>
                <div
                  className="stats-number text-4xl font-bold text-gray-900 mb-2"
                  data-stat-type="success">
                  0%
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "معدل النجاح" : "Success Rate"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "ar"
                    ? "من المتقدمين يجدون عمل"
                    : "Job placement rate"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center reveal">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "ar" ? "بحث سريع" : "Fast Search"}
              </h3>
              <p className="text-gray-600">
                {language === "ar"
                  ? "ابحث عن الوظيفة المثالية في ثوانٍ معدودة"
                  : "Find your perfect job in seconds with our advanced search"}
              </p>
            </div>

            <div className="text-center reveal">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "ar" ? "آمان وموثوقية" : "Safe & Secure"}
              </h3>
              <p className="text-gray-600">
                {language === "ar"
                  ? "جميع الشركات محققة والوظائف موثوقة"
                  : "All companies are verified and jobs are legitimate"}
              </p>
            </div>

            <div className="text-center reveal">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-headset text-xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === "ar" ? "دعم على مدار الساعة" : "24/7 Support"}
              </h3>
              <p className="text-gray-600">
                {language === "ar"
                  ? "فريق دعم متاح لمساعدتك في أي وقت"
                  : "Our support team is always ready to help you"}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* section contact us  */}
      <section
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/assets/images/1756024188856.png')`,
        }}>
        {/* Background overlay with opacity */}
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ar"
                ? "نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أسرع وقت ممكن"
                : "We're here to help. Get in touch and we'll get back to you as soon as possible"}
            </p>
          </div>

          {/* Contact Content */}
          <div className="flex justify-center reveal">
            {/* Contact Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 max-w-2xl w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </h3>

              <form className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === "ar"
                        ? "أدخل اسمك الكامل"
                        : "Enter your full name"
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    placeholder={
                      language === "ar"
                        ? "أدخل بريدك الإلكتروني"
                        : "Enter your email address"
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الموضوع" : "Subject"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === "ar"
                        ? "أدخل موضوع الرسالة"
                        : "Enter message subject"
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الرسالة" : "Message"}
                  </label>
                  <textarea
                    rows={6}
                    placeholder={
                      language === "ar"
                        ? "اكتب رسالتك هنا..."
                        : "Write your message here..."
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-main to-secondary text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <i className="fas fa-paper-plane"></i>
                  {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mb-4">
                <i className="fas fa-user-lock text-4xl text-main"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === "ar" ? "تسجيل الدخول مطلوب" : "Login Required"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === "ar"
                  ? "يجب تسجيل الدخول أولاً للتقديم على الوظائف وعرض التفاصيل الكاملة"
                  : "Please login first to apply for jobs and view full details"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-main to-secondary text-white rounded-lg hover:shadow-md transition-all">
                  {language === "ar" ? "تسجيل الدخول" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
