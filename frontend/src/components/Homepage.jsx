import React, { useState } from 'react';

export default function Homepage() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    console.log(`Navigating to: ${page}`);
  };

  // Render different pages based on currentPage state
  if (currentPage === 'dashboard') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#2563eb', marginBottom: '1rem' }}>Dashboard Page</h1>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }
  if (currentPage === 'study-resources') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#2563eb', marginBottom: '1rem' }}>Study Resources Page</h1>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }
  if (currentPage === 'mock-exams') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#2563eb', marginBottom: '1rem' }}>Mock Exams Page</h1>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }
  if (currentPage === 'track-progress') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#2563eb', marginBottom: '1rem' }}>Track Progress Page</h1>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #eff6ff, #e0f2fe, #fef3c7)',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
        padding: '1.75rem 1.5rem',
        boxShadow: '0 4px 20px rgba(14, 165, 233, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            background: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            border: '3px solid rgba(255, 255, 255, 0.5)'
          }}>
            <span>🎓</span>
          </div>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '0.25rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>Brain2Bureau - Loksewa Prep</h1>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500'
            }}>Your Complete Preparation Companion</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '32rem',
        margin: '-2rem auto 0',
        padding: '0 1.25rem 2.5rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Navigation Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button 
            onClick={() => handleNavigation('dashboard')}
            style={{
              padding: '1.25rem 1rem',
              borderRadius: '1rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              border: 'none',
              background: '#ffffff',
              color: '#0ea5e9',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 15px 35px rgba(14, 165, 233, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(14, 165, 233, 0.3)';
            }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => handleNavigation('study-resources')}
            style={{
              padding: '1.25rem 1rem',
              borderRadius: '1rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              border: 'none',
              background: '#ffffff',
              color: '#1e293b',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
              e.target.style.color = '#0ea5e9';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              e.target.style.color = '#1e293b';
            }}
          >
            Study Resources
          </button>
          <button 
            onClick={() => handleNavigation('mock-exams')}
            style={{
              padding: '1.25rem 1rem',
              borderRadius: '1rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              border: 'none',
              background: '#ffffff',
              color: '#1e293b',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
              e.target.style.color = '#0ea5e9';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              e.target.style.color = '#1e293b';
            }}
          >
            Mock Exams
          </button>
          <button 
            onClick={() => handleNavigation('track-progress')}
            style={{
              padding: '1.25rem 1rem',
              borderRadius: '1rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              border: 'none',
              background: '#ffffff',
              color: '#1e293b',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
              e.target.style.color = '#0ea5e9';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              e.target.style.color = '#1e293b';
            }}
          >
            Track Progress
          </button>
        </div>

        {/* Welcome Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #f59e0b)'
          }}></div>
          
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>Welcome Back! 👋</h2>
          <p style={{
            color: '#64748b',
            marginBottom: '2rem',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>Continue your Loksewa preparation journey</p>

          {/* Stats Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Resources Read */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                lineHeight: 1,
                color: '#f59e0b',
                textShadow: '2px 2px 0 rgba(245, 158, 11, 0.2)'
              }}>8</div>
              <div style={{
                color: '#1e293b',
                fontWeight: '600',
                fontSize: '1rem'
              }}>Resources Read</div>
            </div>

            {/* Exams Taken */}
            <div style={{
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                lineHeight: 1,
                color: '#8b5cf6',
                textShadow: '2px 2px 0 rgba(139, 92, 246, 0.2)'
              }}>5</div>
              <div style={{
                color: '#1e293b',
                fontWeight: '600',
                fontSize: '1rem'
              }}>Exams Taken</div>
            </div>

            {/* Average Score */}
            <div style={{
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '4rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                lineHeight: 1,
                color: '#10b981',
                textShadow: '2px 2px 0 rgba(16, 185, 129, 0.2)'
              }}>78%</div>
              <div style={{
                color: '#1e293b',
                fontWeight: '600',
                fontSize: '1rem'
              }}>Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}