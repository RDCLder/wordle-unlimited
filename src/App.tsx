import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./Board/Board";
import { fiveLetterWordsList } from "./modes/fiveLetterMode";

function App() {
  // TODO: Add selection for different modes
  const randomIndex = Math.floor(Math.random() * fiveLetterWordsList.length);
  const currentWord = fiveLetterWordsList[randomIndex];
  return <Board currentWord={currentWord} numberOfLetters={5} numberOfRows={6} />;
}

export default App;
