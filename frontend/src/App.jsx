import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
