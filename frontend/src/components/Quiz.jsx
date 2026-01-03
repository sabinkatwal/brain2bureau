import React, { useState } from "react";
import "../styles/Quiz.css";
import { questions } from "../data/questions";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <button className="try-again-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="quiz-box">
          <h2>Question {current + 1} / {questions.length}</h2>
          <p className="question">{questions[current].question}</p>
          <div className="options">
            {questions[current].options.map((option) => (
              <button
                key={option}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
