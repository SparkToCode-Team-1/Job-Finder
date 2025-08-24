import React, { useState } from "react";
import "./App.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import JobDetail from "./pages/JobDetail/JobDetail";
import Profile from "./pages/Profile/Profile"; // Login page
import UserProfile from "./pages/UserProfile/UserProfile"; // User profile page
import About from "./pages/About/About";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "jobs":
        return <Jobs />;
      case "job-detail":
        return <JobDetail />;
      case "login":
        return <Profile onNavigate={setCurrentPage} />;
      case "userprofile":
        return <UserProfile />;
      case "about":
        return <About />;

      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="App">
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="main-content">{renderPage()}</main>
          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
