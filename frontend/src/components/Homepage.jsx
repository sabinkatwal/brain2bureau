import React, { useState, useEffect, useRef } from "react";
import "../styles/Homepage.css";
import StudyResources from "./StudyResources";
import Dashboard from "./Dashboard";
import TrackProgress from "./TrackProgress";
import MockExam from "./MockExam";

export default function Homepage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  // Render different pages
  if (currentPage === "dashboard") {
    return <Dashboard onNavigate={setCurrentPage} />;
  }
  if (currentPage === "study-resources") {
    return <StudyResources onNavigate={setCurrentPage} />;
  }
  if (currentPage === "mock-exams") {
    return <MockExam onNavigate={setCurrentPage} />;
  }
  if (currentPage === "track-progress") {
    return <TrackProgress onNavigate={setCurrentPage} />;
  }

  // Home page JSX
  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-icon">🎓</div>
          <div className="header-text">
            <h1>Brain2Bureau - Loksewa Prep</h1>
            <p>Your Complete Preparation Companion</p>
          </div>
          
          {/* Profile Section */}
          <div className="profile-section" ref={profileRef}>
            <button className="profile-btn" onClick={toggleProfileMenu}>
              <div className="profile-avatar">SK</div>
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="profile-avatar-large">SK</div>
                  <div className="profile-info">
                    <h3>Sabin Katwal</h3>
                    <p>@sabinkatwal3379</p>
                  </div>
                </div>
                
                <div className="profile-menu-section">
                  <button className="profile-menu-item" onClick={() => alert('My Account')}>
                    <span className="menu-icon">👤</span>
                    <span>My Account</span>
                  </button>
                  <button className="profile-menu-item" onClick={() => alert('Switch Account')}>
                    <span className="menu-icon">🔄</span>
                    <span>Switch Account</span>
                  </button>
                  <button className="profile-menu-item" onClick={() => alert('Sign Out')}>
                    <span className="menu-icon">🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
                
                <div className="profile-menu-divider"></div>
                
                <div className="profile-menu-section">
                  <button className="profile-menu-item" onClick={() => handleNavigation("track-progress")}>
                    <span className="menu-icon">📊</span>
                    <span>My Progress</span>
                  </button>
                  <button className="profile-menu-item" onClick={() => alert('Settings')}>
                    <span className="menu-icon">⚙️</span>
                    <span>Settings</span>
                  </button>
                </div>
                
                <div className="profile-menu-divider"></div>
                
                <div className="profile-menu-section">
                  <button className="profile-menu-item" onClick={() => alert('Toggle Appearance')}>
                    <span className="menu-icon">🌙</span>
                    <span>Appearance: Light</span>
                  </button>
                  <button className="profile-menu-item" onClick={() => alert('Change Language')}>
                    <span className="menu-icon">🌐</span>
                    <span>Language: English</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button
            className="nav-btn"
            onClick={() => handleNavigation("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("study-resources")}
          >
            Study Resources
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("mock-exams")}
          >
            Mock Exams
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavigation("track-progress")}
          >
            Track Progress
          </button>
        </div>

        {/* Welcome Card */}
        <div className="welcome-card">
          <h2>Welcome Back! 👋</h2>
          <p>Continue your Loksewa preparation journey</p>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card resources">
              <div className="stat-number">8</div>
              <div className="stat-label">Resources Read</div>
            </div>
            <div className="stat-card exams">
              <div className="stat-number">5</div>
              <div className="stat-label">Exams Taken</div>
            </div>
            <div className="stat-card score">
              <div className="stat-number">78%</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}