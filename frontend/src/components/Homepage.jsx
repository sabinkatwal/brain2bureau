import React from "react";
import "../styles/Homepage.css";

const Homepage = ({ startQuiz }) => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Brain2Bureau</h1>
      <p className="homepage-subtitle">
        Welcome to Brain2Bureau! Sharpen your knowledge and test yourself on General Knowledge, Nepali Literature, Current Affairs, and more. Are you ready to challenge yourself?
      </p>
      <button className="homepage-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default Homepage;
