// MockExam.jsx
import React, { useState } from 'react';
import "../styles/MockExam.css";
import Profile from "./Profile";
import Quiz from "./Quiz";
import { questions as allQuestions } from "../data/questions";

export default function MockExam({ onNavigate, toggleDarkMode }) {
  const examTypes = [
    {
      id: 'general-knowledge',
      title: 'General Knowledge Test',
      icon: '📚'
    },
    {
      id: 'constitution',
      title: 'Constitution Test',
      icon: '⚖️'
    },
    {
      id: 'full-mock',
      title: 'Full Mock Exam',
      icon: '📝'
    }
  ];

  const [activeExam, setActiveExam] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizQuestions, setQuizQuestions] = useState(null);

  return (
    <div className="mock-exam-container">
      {/* Header */}
      <header className="mock-header">
        <div className="header-content">
          <div className="logo-icon">
            <span>🎓</span>
          </div>
          <div className="header-text">
            <h1>Brain2Bureau - Loksewa Prep</h1>
            <p>Your Complete Preparation Companion</p>
          </div>
          {/* Profile Component */}
          <Profile onNavigate={onNavigate} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      {/* Navigation Buttons */}
      <div className="nav-container">
        <button 
          className="nav-btn"
          onClick={() => onNavigate?.('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate?.('study-resources')}
        >
          Study Resources
        </button>
        <button 
          className="nav-btn nav-btn-active"
          onClick={() => onNavigate?.('mock-exams')}
        >
          Mock Exams
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate?.('track-progress')}
        >
          Track Progress
        </button>
      </div>

      {/* Main Content */}
      <main className="mock-main">
        <section className="exam-section">
          <h2 className="section-title">
            <span className="icon">📝</span>
            Mock Examinations
          </h2>
          <p className="section-description">Test your knowledge with practice exams</p>

          {/* Exam Buttons */}
          <div className="exam-buttons">
            {examTypes.map((exam) => (
              <button 
                key={exam.id}
                className="exam-btn"
                onClick={() => {
                  const poolLength = exam.id === 'full-mock' ? allQuestions.length : allQuestions.filter(q => q.category === exam.id).length;
                  setActiveExam(exam.id);
                  setShowConfig(true);
                  setQuizQuestions(null);
                  setNumQuestions(Math.min(5, poolLength || 5));
                }}
                
              >
                <span className="exam-icon">{exam.icon}</span>
                {exam.title}
              </button>
            ))}
          </div>

          {activeExam && showConfig && (
            <div className="exam-config">
              <h3>Preparing: {examTypes.find(e => e.id === activeExam)?.title}</h3>
              <p>Select number of questions:</p>
              <input
                type="number"
                min={1}
                max={activeExam === 'full-mock' ? allQuestions.length : allQuestions.filter(q => q.category === activeExam).length}
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              />
              <div className="config-buttons">
                <button
                  className="start-btn"
                  onClick={() => {
                    const pool = activeExam === 'full-mock' ? allQuestions : allQuestions.filter(q => q.category === activeExam);
                    const selection = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(numQuestions, pool.length));
                    setQuizQuestions(selection);
                    setShowConfig(false);
                  }}
                >
                  Start Test
                </button>
                <button className="cancel-btn" onClick={() => { setActiveExam(null); setShowConfig(false); }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {quizQuestions && (
            <div className="quiz-wrapper">
              <Quiz
                questions={quizQuestions}
                onClose={() => { setActiveExam(null); setQuizQuestions(null); setShowConfig(false); }}
              />
            </div>
          )}

          <div className="back-btn-container">
            <button 
              className="back-btn" 
              onClick={() => onNavigate?.('home')}
            >
              Back to Home
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}