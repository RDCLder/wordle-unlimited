import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./Board/Board";
import {
  fiveLetterWordsList,
  fiveLetterWordsMap,
} from "./modes/fiveLetterMode";

function App() {
  // TODO: Add selection for different modes
  // TODO: Add new word button that skips the current word
  const randomIndex = Math.floor(Math.random() * fiveLetterWordsList.length);
  const currentWord = fiveLetterWordsList[randomIndex];
  return (
    <Board
      currentWord={currentWord}
      numberOfLetters={5}
      numberOfRows={6}
      wordMap={fiveLetterWordsMap}
    />
  );
}

export default App;
