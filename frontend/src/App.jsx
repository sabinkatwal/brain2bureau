import React from 'react';

export default function Homepage() {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
      color: 'white',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '8px'
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: 0
    },
    subtitle: {
      color: '#bfdbfe',
      marginLeft: '56px'
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '1.5rem'
    },
    navTabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    buttonActive: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    },
    buttonInactive: {
      backgroundColor: 'white',
      color: '#2563eb',
      padding: '12px 24px',
      borderRadius: '8px',
      border: '2px solid #2563eb',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    welcomeSection: {
      backgroundColor: 'white',
      border: '2px solid #bfdbfe',
      borderRadius: '12px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    },
    welcomeTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    welcomeText: {
      color: '#6b7280',
      marginBottom: '1.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem'
    },
    statCard: {
      border: '2px solid #bfdbfe',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '8px'
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: '500'
    },
    progressSection: {
      backgroundColor: 'white',
      border: '2px solid #bfdbfe',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    },
    progressTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem'
    },
    progressBarContainer: {
      width: '100%',
      backgroundColor: '#e5e7eb',
      borderRadius: '9999px',
      height: '32px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressBarFill: {
      background: 'linear-gradient(to right, #2563eb, #3b82f6)',
      height: '100%',
      width: '65%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600',
      fontSize: '0.875rem'
    },
    progressText: {
      color: '#6b7280',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTitle}>
            <span style={{ fontSize: '2.5rem' }}>🎓</span>
            <h1 style={styles.h1}>Brain2Bureau - Loksewa Prep</h1>
          </div>
          <p style={styles.subtitle}>Your Complete Preparation Companion</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Navigation Tabs */}
        <div style={styles.navTabs}>
          <button style={styles.buttonActive}>Dashboard</button>
          <button style={styles.buttonInactive}>Study Resources</button>
          <button style={styles.buttonInactive}>Mock Exams</button>
          <button style={styles.buttonInactive}>Track Progress</button>
        </div>

        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>
            Welcome Back! <span style={{ fontSize: '2rem' }}>👋</span>
          </h2>
          <p style={styles.welcomeText}>Continue your Loksewa preparation journey</p>

          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>8</div>
              <div style={styles.statLabel}>Resources Read</div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statNumber}>5</div>
              <div style={styles.statLabel}>Exams Taken</div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statNumber}>78%</div>
              <div style={styles.statLabel}>Average Score</div>
            </div>
            
            <div style={styles.statCard}>
              <div style={styles.statNumber}>15</div>
              <div style={styles.statLabel}>Study Days</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div style={styles.progressSection}>
          <h2 style={styles.progressTitle}>Overall Progress</h2>
          
          {/* Progress Bar */}
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBarFill}>
              65% Complete
            </div>
          </div>
          
          <p style={styles.progressText}>Keep going! You're making great progress.</p>
        </div>
      </main>
    </div>
  );
}