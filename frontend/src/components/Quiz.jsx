import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/Quiz.css";
import { questions } from "../data/questions";

const SECONDS_PER_QUESTION = 60;

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

const Quiz = ({ questions: propQuestions, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizItems, setQuizItems] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const timerRef = useRef(null);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    const pool = propQuestions ?? questions;
    const items = shuffleArray(pool);
    setQuizItems(items);
    setSecondsLeft(items.length * SECONDS_PER_QUESTION);
    setAnswers([]);
    setScore(0);
    setCurrent(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsOptionDisabled(false);
    setTimeTaken(0);
  }, [propQuestions]);

  useEffect(() => {
    if (!quizItems.length) return;
    setShuffledOptions(shuffleArray(quizItems[current].options || []));
  }, [current, quizItems]);

  const totalTime = quizItems.length * SECONDS_PER_QUESTION;

  const finishQuiz = useCallback(() => {
    const remaining = quizItems.slice(answers.length).map((q) => ({
      id: q.id,
      question: q.question,
      selected: null,
      correct: false,
      correctAnswer: q.answer,
    }));
    setAnswers((prev) => [...prev, ...remaining]);
    setTimeTaken(totalTime - secondsLeft);
    setShowResult(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [quizItems, answers.length, secondsLeft, totalTime]);

  useEffect(() => {
    if (!quizItems.length || showResult) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          finishQuiz();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [quizItems, finishQuiz, showResult]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAnswer = (option) => {
    if (isOptionDisabled) return;
    setSelectedOption(option);
    setIsOptionDisabled(true);
    const q = quizItems[current];
    const correct = option === q.answer;
    setAnswers((prev) => [...prev, { id: q.id, question: q.question, selected: option, correct, correctAnswer: q.answer }]);
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < quizItems.length) {
        setCurrent((c) => c + 1);
        setSelectedOption(null);
        setIsOptionDisabled(false);
      } else {
        finishQuiz();
      }
    }, 900);
  };

  const handleNext = () => {
    if (current + 1 < quizItems.length) {
      setCurrent((c) => c + 1);
      setSelectedOption(null);
      setIsOptionDisabled(false);
    } else {
      finishQuiz();
    }
  };

  const restart = () => {
    const items = shuffleArray(propQuestions ?? questions);
    setQuizItems(items);
    setSecondsLeft(items.length * SECONDS_PER_QUESTION);
    setAnswers([]);
    setScore(0);
    setCurrent(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsOptionDisabled(false);
    setTimeTaken(0);
  };

  const formatTime = (s) => {
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>
            Your score: {score} / {quizItems.length} ({Math.round((score / quizItems.length) * 100) || 0}%)
          </p>
          <p>Time taken: {formatTime(timeTaken)}</p>
          <div className="result-list">
            {answers.map((a, idx) => (
              <div key={idx} className={`result-item ${a.correct ? "correct" : "wrong"}`}>
                <div className="q-text">
                  {idx + 1}. {a.question}
                </div>
                <div className="a-selected">
                  Selected: <strong>{a.selected ?? "—"}</strong>
                  <span className={`badge ${a.correct ? "badge-correct" : "badge-wrong"}`}>{a.correct ? "Correct" : "Wrong"}</span>
                </div>
                <div className="a-correct">Answer: <strong>{a.correctAnswer}</strong></div>
              </div>
            ))}
          </div>
          <div className="result-actions">
            <button className="try-again-button" onClick={restart}>Try Again</button>
            {onClose && <button className="close-button" onClick={onClose}>Close</button>}
          </div>
        </div>
      ) : (
        quizItems.length > 0 && (
          <div className="quiz-box">
            {onClose && (
              <button className="close-quiz" onClick={onClose}>Close Quiz</button>
            )}

            <div className="quiz-top">
              <div className="timer">
                <div className="time-left">{formatTime(secondsLeft)}</div>
                <div className="timer-bar">
                  <div className="timer-progress" style={{ width: `${totalTime ? (secondsLeft / totalTime) * 100 : 0}%` }} />
                </div>
              </div>
              <div className="score-pill">Score: {score}</div>
            </div>

            <h2>Question {current + 1} / {quizItems.length}</h2>
            <p className="question">{quizItems[current].question}</p>

            <div className="options">
              {shuffledOptions.map((opt) => {
                let cls = 'option-button';
                if (selectedOption) {
                  if (opt === quizItems[current].answer) cls += ' correct';
                  else if (opt === selectedOption) cls += ' incorrect';
                }
                return (
                  <button
                    key={opt}
                    className={cls}
                    disabled={isOptionDisabled}
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="quiz-controls">
              {selectedOption && (
                <button className="next-btn" onClick={handleNext}>Next</button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
