import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Jobs.css";

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

const Jobs: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  // Fallback sample jobs (Oman localized) – used if backend fails or empty
  const fallbackJobs: Job[] = [
    {
      id: 1,
      title: "Backend Engineer (FinTech)",
      company: "OmanTech Solutions",
      location: "Muscat",
      salaryMin: 900,
      salaryMax: 1400,
      jobType: "Full-time",
      category: "Technology",
      description:
        "Build secure payment & identity microservices (Java/Spring Boot, PostgreSQL, Docker, CI/CD).",
      postedAt: "2025-08-23",
    },
    {
      id: 2,
      title: "Frontend Developer (React)",
      company: "Muscat Digital Hub",
      location: "Muscat",
      salaryMin: 800,
      salaryMax: 1200,
      jobType: "Full-time",
      category: "Technology",
      description:
        "Deliver accessible bilingual (AR/EN) React + TypeScript interfaces for institutional portals.",
      postedAt: "2025-08-24",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Sohar Port Services",
      location: "Sohar",
      salaryMin: 1100,
      salaryMax: 1600,
      jobType: "Full-time",
      category: "Technology",
      description:
        "Manage AWS infrastructure, Kubernetes clusters & secure CI/CD pipelines for logistics ops.",
      postedAt: "2025-08-25",
    },
  ];

  const [jobs, setJobs] = useState<Job[]>(fallbackJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Backend fetch
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:8080/api/jobs");
        if (!res.ok) throw new Error(res.statusText || "Failed to load jobs");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Map backend fields defensively
          const mapped: Job[] = data.map((j: any) => ({
            id: j.id,
            title: j.title || j.jobTitle || "Untitled",
            company: j.company || j.companyName || "Unknown Company",
            location: j.location || j.city || "Muscat",
            salaryMin: j.salaryMin ?? j.minSalary,
            salaryMax: j.salaryMax ?? j.maxSalary,
            jobType: j.jobType || j.type || "Full-time",
            category: j.category || j.domain || undefined,
            description: j.description || j.details || "",
            postedAt: j.postedAt || j.createdAt || undefined,
          }));
          setJobs(mapped);
        } else {
          // keep fallbackJobs
        }
      } catch (e: any) {
        setError(e.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [showJobModal, setShowJobModal] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  // Get unique values for filters
  const locations = Array.from(new Set(jobs.map((job) => job.location))).sort();
  const categories = Array.from(
    new Set(jobs.map((job) => job.category).filter(Boolean) as string[])
  );
  const jobTypes = Array.from(new Set(jobs.map((job) => job.jobType)));

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === "" || job.location === selectedLocation;
    const matchesCategory =
      selectedCategory === "" || job.category === selectedCategory;
    const matchesJobType =
      selectedJobType === "" || job.jobType === selectedJobType;

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesJobType
    );
  });

  // Handle job application
  const handleApply = (job: Job) => {
    if (!user) {
      alert(
        language === "ar" ? "يجب تسجيل الدخول أولاً" : "Please login first"
      );
      return;
    }
    setShowJobModal(job);
    setCoverLetter("");
  };

  const submitApplication = () => {
    alert(
      language === "ar"
        ? "تم التقديم بنجاح!"
        : "Application submitted successfully!"
    );
    setShowJobModal(null);
  };

  // Format salary display
  const formatSalary = (job: Job): string => {
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}-${job.salaryMax} OMR`;
    } else if (job.salaryMin) {
      return `من ${job.salaryMin} OMR`;
    }
    return language === "ar" ? "غير محدد" : "Not specified";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section
        className="py-44 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/assets/images/blurry-gradient-haikei.svg')",
        }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {language === "ar" ? "تصفح الوظائف" : "Browse Jobs"}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {language === "ar"
              ? "اكتشف الفرص الوظيفية المثالية لك"
              : "Discover perfect job opportunities for you"}
          </p>

          {/* Simple Search */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="relative mb-4">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === "ar" ? "البحث عن وظيفة..." : "Search for jobs..."
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            {/* Simple Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main bg-white">
                  <option value="">
                    {language === "ar" ? "جميع المواقع" : "All Locations"}
                  </option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main bg-white">
                  <option value="">
                    {language === "ar" ? "جميع الفئات" : "All Categories"}
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main bg-white">
                  <option value="">
                    {language === "ar" ? "جميع الأنواع" : "All Job Types"}
                  </option>
                  {jobTypes.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {jobType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Filters Button */}
            {(searchTerm ||
              selectedLocation ||
              selectedCategory ||
              selectedJobType) && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedLocation("");
                    setSelectedCategory("");
                    setSelectedJobType("");
                  }}
                  className="text-main hover:text-secondary font-medium px-4 py-2 rounded-lg hover:bg-main/10 transition-colors duration-300">
                  <i className="fas fa-undo mr-2"></i>
                  {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "ar"
                ? `${filteredJobs.length} وظيفة متاحة`
                : `${filteredJobs.length} Jobs Available`}
            </h2>
            <p className="text-gray-600">
              {language === "ar"
                ? "عينة من الوظائف للعرض"
                : "Sample jobs for display"}
            </p>

            {/* Active Filters */}
            {(selectedLocation || selectedCategory || selectedJobType) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLocation && (
                  <span className="inline-flex items-center gap-2 bg-main/10 text-main px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-map-marker-alt"></i>
                    {selectedLocation}
                    <button
                      onClick={() => setSelectedLocation("")}
                      className="hover:bg-main/20 rounded-full p-1">
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-tag"></i>
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="hover:bg-secondary/20 rounded-full p-1">
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </span>
                )}
                {selectedJobType && (
                  <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-briefcase"></i>
                    {selectedJobType}
                    <button
                      onClick={() => setSelectedJobType("")}
                      className="hover:bg-purple-200 rounded-full p-1">
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {loading && (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-main mb-4"></i>
              <p className="text-gray-600">
                {language === "ar" ? "جاري تحميل الوظائف" : "Loading jobs"}...
              </p>
            </div>
          )}
          {!loading && error && (
            <div className="text-center py-12">
              <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === "ar" ? "حدث خطأ" : "Error"}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === "ar"
                  ? "تعذر جلب الوظائف من الخادم. سيتم عرض عينة محلية."
                  : "Could not fetch jobs from the server. Showing local sample."}
              </p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  // retry
                  (async () => {
                    try {
                      const res = await fetch("http://localhost:8080/api/jobs");
                      if (!res.ok) throw new Error(res.statusText);
                      const data = await res.json();
                      if (Array.isArray(data) && data.length > 0) {
                        const mapped: Job[] = data.map((j: any) => ({
                          id: j.id,
                          title: j.title || j.jobTitle || "Untitled",
                          company:
                            j.company || j.companyName || "Unknown Company",
                          location: j.location || j.city || "Muscat",
                          salaryMin: j.salaryMin ?? j.minSalary,
                          salaryMax: j.salaryMax ?? j.maxSalary,
                          jobType: j.jobType || j.type || "Full-time",
                          category: j.category || j.domain || undefined,
                          description: j.description || j.details || "",
                          postedAt: j.postedAt || j.createdAt || undefined,
                        }));
                        setJobs(mapped);
                      }
                    } catch (e: any) {
                      setError(e.message || "Error fetching jobs");
                    } finally {
                      setLoading(false);
                    }
                  })();
                }}
                className="bg-gradient-to-r from-main to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                {language === "ar" ? "إعادة المحاولة" : "Retry"}
              </button>
            </div>
          )}
          {!loading && !error && filteredJobs.length > 0 && (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-main to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-building text-white text-xl"></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <p className="text-lg font-semibold text-main mb-3">
                            {job.company}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-map-marker-alt text-red-500"></i>
                              {job.location}
                            </span>
                            {job.salaryMin && (
                              <span className="flex items-center gap-1">
                                <i className="fas fa-money-bill-wave text-green-500"></i>
                                {formatSalary(job)}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <i className="fas fa-briefcase text-blue-500"></i>
                              {job.jobType}
                            </span>
                            {job.category && (
                              <span className="flex items-center gap-1">
                                <i className="fas fa-tag text-purple-500"></i>
                                {job.category}
                              </span>
                            )}
                          </div>
                          {job.description && (
                            <p className="text-gray-600 text-sm">
                              {job.description.length > 150
                                ? `${job.description.substring(0, 150)}...`
                                : job.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col gap-3">
                      <button
                        onClick={() => handleApply(job)}
                        className="bg-gradient-to-r from-main to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        <i className="fas fa-paper-plane mr-2"></i>
                        {language === "ar" ? "تقدم الآن" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-gray-400 text-6xl mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === "ar" ? "لا توجد وظائف" : "No Jobs Found"}
              </h3>
              <p className="text-gray-600">
                {language === "ar"
                  ? "جرب البحث بكلمات مختلفة"
                  : "Try searching with different keywords"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                {language === "ar" ? "التقديم على الوظيفة" : "Apply for Job"}
              </h2>
              <button
                onClick={() => setShowJobModal(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border-l-4 border-main">
                <h3 className="font-bold text-gray-900 mb-2">
                  {showJobModal.title}
                </h3>
                <p className="text-main font-semibold mb-2">
                  {showJobModal.company}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>📍 {showJobModal.location}</span>
                  {showJobModal.salaryMin && (
                    <span>💰 {formatSalary(showJobModal)}</span>
                  )}
                  <span>💼 {showJobModal.jobType}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === "ar" ? "رسالة تعريفية" : "Cover Letter"}
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder={
                    language === "ar"
                      ? "اكتب رسالة تعريفية قصيرة..."
                      : "Write a brief cover letter..."
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-main resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowJobModal(null)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition-colors duration-300">
                {language === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={submitApplication}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-main to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                <i className="fas fa-paper-plane mr-2"></i>
                {language === "ar" ? "تقديم الطلب" : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
