import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";

// Types for admin data
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  category?: string;
  postedAt: string;
  sourceId?: string;
  sourceJobId?: string;
  rawPayload?: any;
  ingestedAt?: string;
  // Frontend computed properties
  type?: string;
  salary?: string;
  requirements?: string;
  createdAt?: string;
  status?: string;
}

interface Applicant {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  jobTitle: string;
  appliedAt: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  coverLetter?: string;
  resumeUrl?: string;
}

const Admin: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "jobs" | "applicants"
  >("dashboard");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });

  // Real data from backend
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Job form state
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "دوام كامل",
    salary: "",
    description: "",
    requirements: "",
  });

  // Load data from backend
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    setError("");
    try {
      // Load jobs, applications, and statistics in parallel
      const [jobsData, applicationsData, statsData] = await Promise.all([
        apiService.getJobs(),
        apiService.getAllApplications().catch(() => []), // Fallback to empty array if endpoint doesn't exist
        apiService.getAdminStats().catch(() => ({
          totalUsers: 0,
          totalJobs: 0,
          totalApplications: 0,
          pendingApplications: 0,
        })), // Fallback stats
      ]);

      // Convert backend job data to frontend format
      const convertedJobs = (jobsData || []).map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        description: job.description,
        category: job.category,
        postedAt: job.postedAt,
        sourceId: job.sourceId,
        sourceJobId: job.sourceJobId,
        rawPayload: job.rawPayload,
        ingestedAt: job.ingestedAt,
        // Frontend computed properties
        type: job.jobType || "دوام كامل",
        salary:
          job.salaryMin && job.salaryMax
            ? `${job.salaryMin} - ${job.salaryMax}`
            : job.salaryMin
            ? job.salaryMin.toString()
            : "غير محدد",
        requirements: job.description?.split("المتطلبات:")[1]?.trim() || "",
        createdAt: new Date(job.postedAt || job.ingestedAt).toLocaleDateString(
          "ar-SA"
        ),
        status: "نشطة",
      }));

      setJobs(convertedJobs);
      setApplicants(applicationsData || []);
      setStats(statsData);
    } catch (error: any) {
      console.error("Failed to load admin data:", error);
      setError("فشل في تحميل البيانات: " + (error.message || "خطأ غير معروف"));
    } finally {
      setLoading(false);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingJob) {
        // Update existing job
        await apiService.updateJob(editingJob.id, jobForm);
      } else {
        // Create new job
        await apiService.createJob(jobForm);
      }

      // Reload jobs data
      await loadAdminData();

      // Reset form
      setJobForm({
        title: "",
        company: "",
        location: "",
        type: "دوام كامل",
        salary: "",
        description: "",
        requirements: "",
      });
      setShowJobForm(false);
      setEditingJob(null);
    } catch (error: any) {
      console.error("Failed to save job:", error);
      setError("فشل في حفظ الوظيفة: " + (error.message || "خطأ غير معروف"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الوظيفة؟")) {
      return;
    }

    setLoading(true);
    try {
      await apiService.deleteJob(jobId);
      await loadAdminData(); // Reload data
    } catch (error: any) {
      console.error("Failed to delete job:", error);
      setError("فشل في حذف الوظيفة: " + (error.message || "خطأ غير معروف"));
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type || job.jobType || "دوام كامل",
      salary:
        job.salary ||
        (job.salaryMin && job.salaryMax
          ? `${job.salaryMin} - ${job.salaryMax}`
          : job.salaryMin?.toString() || "غير محدد"),
      description:
        job.description?.split("المتطلبات:")[0]?.trim() ||
        job.description ||
        "",
      requirements:
        job.requirements ||
        job.description?.split("المتطلبات:")[1]?.trim() ||
        "",
    });
    setShowJobForm(true);
  };

  const updateApplicationStatus = async (
    applicantId: number,
    status: "ACCEPTED" | "REJECTED" | "PENDING"
  ) => {
    setLoading(true);
    try {
      await apiService.updateApplicationStatus(applicantId, status);
      await loadAdminData(); // Reload data
    } catch (error: any) {
      console.error("Failed to update application status:", error);
      setError(
        "فشل في تحديث حالة الطلب: " + (error.message || "خطأ غير معروف")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.email !== "admin@gmail.com") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-10 text-center">
          <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            غير مصرح لك بالوصول
          </h2>
          <p className="text-slate-500 mb-6">هذه الصفحة مخصصة للمديرين فقط</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-white pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-7xl py-22">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-main">
                لوحة التحكم الإدارية
              </h1>
              <p className="text-slate-500 mt-2">
                مرحباً {user.fullName || "المدير"}
              </p>
            </div>
            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition inline-flex items-center gap-2">
              <i className="fas fa-sign-out-alt"></i>
              تسجيل الخروج
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 bg-white/60 backdrop-blur p-2 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-main text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}>
              <i className="fas fa-chart-line ml-2"></i>
              لوحة التحكم
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                activeTab === "jobs"
                  ? "bg-main text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}>
              <i className="fas fa-briefcase ml-2"></i>
              إدارة الوظائف
            </button>
            <button
              onClick={() => setActiveTab("applicants")}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                activeTab === "applicants"
                  ? "bg-main text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}>
              <i className="fas fa-users ml-2"></i>
              المتقدمين
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 flex items-center gap-3 text-sm">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {activeTab === "dashboard" && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="إجمالي المستخدمين"
                value={stats.totalUsers}
                icon="fa-users"
                color="from-blue-500 to-blue-600"
                bgColor="from-blue-50 to-blue-100"
              />
              <StatCard
                title="إجمالي الوظائف"
                value={stats.totalJobs}
                icon="fa-briefcase"
                color="from-emerald-500 to-emerald-600"
                bgColor="from-emerald-50 to-emerald-100"
              />
              <StatCard
                title="إجمالي الطلبات"
                value={stats.totalApplications}
                icon="fa-file-alt"
                color="from-purple-500 to-purple-600"
                bgColor="from-purple-50 to-purple-100"
              />
              <StatCard
                title="طلبات قيد المراجعة"
                value={stats.pendingApplications}
                icon="fa-clock"
                color="from-amber-500 to-amber-600"
                bgColor="from-amber-50 to-amber-100"
              />
            </div>

            {/* Recent Activities */}
            <AdminSection title="النشاطات الأخيرة" icon="fa-history">
              <div className="space-y-4">
                <ActivityItem
                  icon="fa-user-plus"
                  text="انضم محمد أحمد إلى المنصة"
                  time="منذ 5 دقائق"
                  color="text-emerald-600"
                />
                <ActivityItem
                  icon="fa-briefcase"
                  text="تم نشر وظيفة مطور React جديدة"
                  time="منذ 15 دقيقة"
                  color="text-blue-600"
                />
                <ActivityItem
                  icon="fa-file-alt"
                  text="تقدمت سارة علي لوظيفة مصمم UI/UX"
                  time="منذ 30 دقيقة"
                  color="text-purple-600"
                />
                <ActivityItem
                  icon="fa-check"
                  text="تم قبول طلب أحمد محمود لوظيفة Backend Developer"
                  time="منذ ساعة"
                  color="text-green-600"
                />
              </div>
            </AdminSection>
          </>
        )}

        {activeTab === "jobs" && (
          <JobsManagement
            jobs={jobs}
            loading={loading}
            onAddJob={() => setShowJobForm(true)}
            onEditJob={handleEditJob}
            onDeleteJob={handleDeleteJob}
            showJobForm={showJobForm}
            editingJob={editingJob}
            jobForm={jobForm}
            setJobForm={setJobForm}
            onJobSubmit={handleJobSubmit}
            onCloseForm={() => {
              setShowJobForm(false);
              setEditingJob(null);
              setJobForm({
                title: "",
                company: "",
                location: "",
                type: "دوام كامل",
                salary: "",
                description: "",
                requirements: "",
              });
            }}
          />
        )}

        {activeTab === "applicants" && (
          <ApplicantsManagement
            applicants={applicants}
            onUpdateStatus={updateApplicationStatus}
          />
        )}
      </div>
    </div>
  );
};

// Helper Components
interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  bgColor,
}) => (
  <div
    className={`bg-gradient-to-br ${bgColor} border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
        <p className="text-3xl font-extrabold text-slate-800">{value}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}>
        <i className={`fas ${icon} text-white text-lg`}></i>
      </div>
    </div>
  </div>
);

interface AdminSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const AdminSection: React.FC<AdminSectionProps> = ({
  title,
  icon,
  children,
}) => (
  <div className="bg-white/80 backdrop-blur border border-slate-100 rounded-2xl shadow p-6">
    <h3 className="flex items-center gap-3 text-lg font-bold text-slate-800 mb-4 justify-end">
      <span>{title}</span>
      <i className={`fas ${icon} text-main`}></i>
    </h3>
    {children}
  </div>
);

interface ActivityItemProps {
  icon: string;
  text: string;
  time: string;
  color: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  text,
  time,
  color,
}) => (
  <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition">
    <div
      className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center ${color}`}>
      <i className={`fas ${icon} text-sm`}></i>
    </div>
    <div className="flex-1 text-right">
      <p className="text-sm font-medium text-slate-800">{text}</p>
      <p className="text-xs text-slate-500 mt-1">{time}</p>
    </div>
  </div>
);

// Jobs Management Component
interface JobsManagementProps {
  jobs: Job[];
  loading: boolean;
  onAddJob: () => void;
  onEditJob: (job: Job) => void;
  onDeleteJob: (jobId: number) => Promise<void>;
  showJobForm: boolean;
  editingJob: Job | null;
  jobForm: any;
  setJobForm: (form: any) => void;
  onJobSubmit: (e: React.FormEvent) => Promise<void>;
  onCloseForm: () => void;
}

const JobsManagement: React.FC<JobsManagementProps> = ({
  jobs,
  loading,
  onAddJob,
  onEditJob,
  onDeleteJob,
  showJobForm,
  editingJob,
  jobForm,
  setJobForm,
  onJobSubmit,
  onCloseForm,
}) => (
  <div className="space-y-6">
    {/* Header with Add Button */}
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">
        إدارة الوظائف ({jobs.length})
      </h2>
      <button
        onClick={onAddJob}
        disabled={loading}
        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 disabled:opacity-50 text-white rounded-xl font-semibold shadow hover:shadow-md transition inline-flex items-center gap-2">
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            جاري التحميل...
          </>
        ) : (
          <>
            <i className="fas fa-plus"></i>
            إضافة وظيفة جديدة
          </>
        )}
      </button>
    </div>

    {/* Job Form Modal */}
    {showJobForm && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={onJobSubmit} className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingJob ? "تعديل الوظيفة" : "إضافة وظيفة جديدة"}
              </h3>
              <button
                type="button"
                onClick={onCloseForm}
                className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  عنوان الوظيفة
                </label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, title: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40"
                  placeholder="مثال: مطور React"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  الشركة
                </label>
                <input
                  type="text"
                  value={jobForm.company}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, company: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40"
                  placeholder="اسم الشركة"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  الموقع
                </label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, location: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40"
                  placeholder="الرياض"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  نوع الوظيفة
                </label>
                <select
                  value={jobForm.type}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, type: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40">
                  <option>دوام كامل</option>
                  <option>دوام جزئي</option>
                  <option>عقد</option>
                  <option>تدريب</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  الراتب
                </label>
                <input
                  type="text"
                  value={jobForm.salary}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, salary: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40"
                  placeholder="5000-8000 ريال"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                وصف الوظيفة
              </label>
              <textarea
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40"
                rows={4}
                placeholder="وصف مفصل للوظيفة والمسؤوليات..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                المتطلبات
              </label>
              <textarea
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm({ ...jobForm, requirements: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40"
                rows={3}
                placeholder="المؤهلات والخبرات المطلوبة..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-main to-secondary disabled:opacity-50 text-white rounded-xl font-semibold shadow hover:shadow-md transition inline-flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    جاري {editingJob ? "التحديث" : "الإضافة"}...
                  </>
                ) : editingJob ? (
                  "تحديث الوظيفة"
                ) : (
                  "نشر الوظيفة"
                )}
              </button>
              <button
                type="button"
                onClick={onCloseForm}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Jobs List */}
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-600 text-right">
          <div className="col-span-3">عنوان الوظيفة</div>
          <div className="col-span-2">الشركة</div>
          <div className="col-span-2">الموقع</div>
          <div className="col-span-2">النوع</div>
          <div className="col-span-2">تاريخ الإنشاء</div>
          <div className="col-span-1">العمليات</div>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {loading ? (
          <div className="p-8 text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-main mb-4"></i>
            <p className="text-slate-600">جاري تحميل الوظائف...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-briefcase text-3xl text-slate-300 mb-4"></i>
            <p className="text-slate-600">لا توجد وظائف محفوظة حالياً</p>
            <p className="text-slate-500 text-sm mt-2">
              انقر على "إضافة وظيفة جديدة" لبدء إضافة الوظائف
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="p-4 hover:bg-slate-50/50 transition">
              <div className="grid grid-cols-12 gap-4 items-center text-sm">
                <div className="col-span-3">
                  <h4 className="font-semibold text-slate-800 text-right">
                    {job.title}
                  </h4>
                  <p className="text-slate-500 text-xs text-right">
                    {job.salary}
                  </p>
                </div>
                <div className="col-span-2 text-right text-slate-600">
                  {job.company}
                </div>
                <div className="col-span-2 text-right text-slate-600">
                  {job.location}
                </div>
                <div className="col-span-2 text-right">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                    {job.type}
                  </span>
                </div>
                <div className="col-span-2 text-right text-slate-500">
                  {job.createdAt}
                </div>
                <div className="col-span-1 flex gap-2">
                  <button
                    onClick={() => onEditJob(job)}
                    disabled={loading}
                    className="p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50 rounded-lg transition"
                    title="تعديل الوظيفة">
                    <i className="fas fa-edit text-sm"></i>
                  </button>
                  <button
                    onClick={() => onDeleteJob(job.id)}
                    disabled={loading}
                    className="p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded-lg transition"
                    title="حذف الوظيفة">
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

// Applicants Management Component
interface ApplicantsManagementProps {
  applicants: Applicant[];
  onUpdateStatus: (
    id: number,
    status: "ACCEPTED" | "REJECTED" | "PENDING"
  ) => void;
}

const ApplicantsManagement: React.FC<ApplicantsManagementProps> = ({
  applicants,
  onUpdateStatus,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-800">
      المتقدمين ({applicants.length})
    </h2>

    {/* Filter Tabs */}
    <div className="flex gap-2 bg-slate-100 p-2 rounded-xl w-fit">
      <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-medium text-slate-700">
        الكل ({applicants.length})
      </button>
      <button className="px-4 py-2 font-medium text-slate-600 hover:bg-white/50 rounded-lg transition">
        قيد المراجعة ({applicants.filter((a) => a.status === "PENDING").length})
      </button>
      <button className="px-4 py-2 font-medium text-slate-600 hover:bg-white/50 rounded-lg transition">
        مقبول ({applicants.filter((a) => a.status === "ACCEPTED").length})
      </button>
      <button className="px-4 py-2 font-medium text-slate-600 hover:bg-white/50 rounded-lg transition">
        مرفوض ({applicants.filter((a) => a.status === "REJECTED").length})
      </button>
    </div>

    {/* Applicants Table */}
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-600 text-right">
          <div className="col-span-3">المتقدم</div>
          <div className="col-span-2">الوظيفة</div>
          <div className="col-span-2">تاريخ التقديم</div>
          <div className="col-span-2">الحالة</div>
          <div className="col-span-3">العمليات</div>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="p-4 hover:bg-slate-50/50 transition">
            <div className="grid grid-cols-12 gap-4 items-center text-sm">
              <div className="col-span-3 text-right">
                <h4 className="font-semibold text-slate-800">
                  {applicant.fullName}
                </h4>
                <p className="text-slate-500 text-xs">{applicant.email}</p>
                <p className="text-slate-500 text-xs">{applicant.phone}</p>
              </div>
              <div className="col-span-2 text-right text-slate-600">
                {applicant.jobTitle}
              </div>
              <div className="col-span-2 text-right text-slate-500">
                {applicant.appliedAt}
              </div>
              <div className="col-span-2 text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    applicant.status === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : applicant.status === "ACCEPTED"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                  {applicant.status === "PENDING"
                    ? "قيد المراجعة"
                    : applicant.status === "ACCEPTED"
                    ? "مقبول"
                    : "مرفوض"}
                </span>
              </div>
              <div className="col-span-3 flex gap-2 justify-start">
                <button
                  onClick={() => onUpdateStatus(applicant.id, "ACCEPTED")}
                  className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs hover:bg-emerald-600 transition">
                  قبول
                </button>
                <button
                  onClick={() => onUpdateStatus(applicant.id, "REJECTED")}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition">
                  رفض
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition">
                  عرض
                </button>
              </div>
            </div>
            {applicant.coverLetter && (
              <div className="mt-3 p-3 bg-slate-50 rounded-lg text-right">
                <p className="text-xs text-slate-600 mb-1">
                  الرسالة التعريفية:
                </p>
                <p className="text-sm text-slate-700">
                  {applicant.coverLetter}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Admin;
