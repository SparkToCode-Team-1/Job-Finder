import React, {
  useState,
  useEffect,
  CSSProperties,
  Suspense,
  lazy,
} from "react";
import "./App.css";
import { HashLoader } from "react-spinners";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// Lazy loaded pages
const Home = lazy(() => import("./pages/Home/Home"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail/JobDetail"));
const Profile = lazy(() => import("./pages/Profile/Profile")); // Login page
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile")); // User profile page
const Admin = lazy(() => import("./pages/Admin/Admin")); // Admin page
const About = lazy(() => import("./pages/About/About"));

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 2 seconds initial loading

    return () => clearTimeout(timer);
  }, []);

  // Handle page navigation with loading
  const handleNavigation = (page: string) => {
    setLoading(true);

    // Simulate loading time for page transition
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800); // 0.8 seconds loading for page transitions
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigation} />;
      case "jobs":
        return <Jobs />;
      case "job-detail":
        return <JobDetail />;
      case "login":
        return <Profile onNavigate={handleNavigation} />;
      case "userprofile":
        return <UserProfile />;
      case "admin":
        return <Admin />;
      case "about":
        return <About />;

      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  // Show initial loading screen
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <HashLoader
          color="#3fffb2"
          loading={true}
          cssOverride={override}
          size={80}
          aria-label="Loading Application"
          data-testid="initial-loader"
        />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="App relative">
          {/* Page Transition Loader */}
          {loading && (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
              <HashLoader
                color="#3fffb2"
                loading={true}
                cssOverride={override}
                size={80}
                aria-label="Loading Page"
                data-testid="page-loader"
              />
            </div>
          )}

          <Header currentPage={currentPage} onNavigate={handleNavigation} />
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <HashLoader
                  color="#3fffb2"
                  loading={true}
                  cssOverride={override}
                  size={70}
                  aria-label="Loading Section"
                  data-testid="suspense-loader"
                />
              </div>
            }>
            <main className="main-content">{renderPage()}</main>
          </Suspense>
          <Footer onNavigate={handleNavigation} />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
