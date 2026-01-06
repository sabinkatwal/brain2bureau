import React, { useState, useEffect, useRef } from "react";
import "../styles/Profile.css";

export default function Profile({ onNavigate }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

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

  const handleMenuClick = (action) => {
    setShowProfileMenu(false);
    
    switch(action) {
      case 'my-account':
        onNavigate('my-account');
        break;
      case 'my-progress':
        onNavigate('track-progress');
        break;
      case 'settings':
        onNavigate('settings');
        break;
      case 'sign-out':
        // Add sign out logic here
        alert('Sign out functionality');
        break;
      case 'switch-account':
        alert('Switch account functionality');
        break;
      case 'appearance':
        alert('Toggle appearance functionality');
        break;
      case 'language':
        alert('Change language functionality');
        break;
      default:
        break;
    }
  };

  return (
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
            <button className="profile-menu-item" onClick={() => handleMenuClick('my-account')}>
              <span className="menu-icon">👤</span>
              <span>My Account</span>
            </button>
            <button className="profile-menu-item" onClick={() => handleMenuClick('switch-account')}>
              <span className="menu-icon">🔄</span>
              <span>Switch Account</span>
            </button>
            <button className="profile-menu-item" onClick={() => handleMenuClick('sign-out')}>
              <span className="menu-icon">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
          
          <div className="profile-menu-divider"></div>
          
          <div className="profile-menu-section">
            <button className="profile-menu-item" onClick={() => handleMenuClick('my-progress')}>
              <span className="menu-icon">📊</span>
              <span>My Progress</span>
            </button>
            <button className="profile-menu-item" onClick={() => handleMenuClick('settings')}>
              <span className="menu-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
          
          <div className="profile-menu-divider"></div>
          
          <div className="profile-menu-section">
            <button className="profile-menu-item" onClick={() => handleMenuClick('appearance')}>
              <span className="menu-icon">🌙</span>
              <span>Appearance: Light</span>
            </button>
            <button className="profile-menu-item" onClick={() => handleMenuClick('language')}>
              <span className="menu-icon">🌐</span>
              <span>Language: English</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}