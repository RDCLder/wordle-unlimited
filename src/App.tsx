import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./Board/Board";

function App() {
  return <Board currentWord={"daily"} numberOfLetters={5} numberOfRows={6} />;
}

export default App;
