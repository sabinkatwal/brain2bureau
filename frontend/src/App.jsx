import React, { useState } from "react";
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";

function App() {
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      {!start ? (
        <Homepage startQuiz={() => setStart(true)} />
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
