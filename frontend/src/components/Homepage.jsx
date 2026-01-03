import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Brain2Bureau</h1>
      <p className="homepage-subtitle">
        Test your knowledge on General Knowledge, Nepali Literature, Current Affairs, and more.
      </p>
      <button className="homepage-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
