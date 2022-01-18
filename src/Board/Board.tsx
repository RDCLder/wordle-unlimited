import React, { useState } from "react";
import styled from "styled-components";
import { IWordMap } from "../modes/fiveLetterMode";

const defaultSquareColor = "#121213";
const defaultKeyColor = "#818384";
const correctColor = "#538D4E";
const includedColor = "#B59F3B";
const missingColor = "#3A3A3C";

const BoardPage = styled.div`
  align-items: center;
  background-color: #000;
  color: #d7dadc;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px 0 0;
`;

const BoardHeader = styled.div`
  border-bottom: 1px solid #3a3a3c;
  display: flex;
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  margin: 10px 0 120px;
  text-transform: uppercase;
  width: 600px;
`;

const BoardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
`;

enum BoardSquareState {
  Correct,
  Included,
  Missing,
  Default,
}

const BoardSquare = styled.div<{ hasLetter: boolean; color: string }>`
  align-items: center;
  background-color: ${(props) => props.color ?? defaultSquareColor};
  border: ${(props) =>
    props.hasLetter ? "2px solid #fff" : `2px solid ${defaultKeyColor}`};
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  height: 62px;
  margin: 2.5px;
  text-transform: uppercase;
  width: 62px;
`;

const KeyboardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  margin: 120px 0 10px;
  width: 600px;
`;

const KeyboardRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const KeyboardKey = styled.div<{ color: string; isWide: boolean }>`
  align-items: center;
  background-color: ${(props) => props.color ?? defaultKeyColor};
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  height: 58px;
  justify-content: center;
  margin: 2.5px;
  text-transform: uppercase;
  width: ${(props) => (props.isWide ? "65px" : "43px")};

  :hover {
    cursor: pointer;
  }
`;

const keyboardRows = [
  [
    { key: "q" },
    { key: "w" },
    { key: "e" },
    { key: "r" },
    { key: "t" },
    { key: "y" },
    { key: "u" },
    { key: "i" },
    { key: "o" },
    { key: "p" },
    { key: "delete" },
  ],
  [
    { key: "a" },
    { key: "s" },
    { key: "d" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "enter" },
  ],
  [
    { key: "z" },
    { key: "x" },
    { key: "c" },
    { key: "v" },
    { key: "b" },
    { key: "n" },
    { key: "m" },
  ],
];

const getColorFromState = (state: BoardSquareState): string => {
  return state === BoardSquareState.Correct
    ? correctColor
    : state === BoardSquareState.Included
    ? includedColor
    : state === BoardSquareState.Missing
    ? missingColor
    : defaultSquareColor;
};

interface IBoardProps {
  currentWord: string;
  numberOfLetters: number;
  numberOfRows: number;
  wordMap: IWordMap;
}

interface IBoardSquare {
  letter: string | null;
  state: BoardSquareState;
}

interface IDictionary {
  [letter: string]: boolean;
}

interface IKeyboardState {
  correct: IDictionary;
  included: IDictionary;
  missing: IDictionary;
}

interface IKeySquare {
  key: string;
}

export const Board = (props: IBoardProps) => {
  const { currentWord, numberOfRows, numberOfLetters, wordMap } = props;
  console.log('currentWord', currentWord)
  const initialBoardState = Array(numberOfRows).fill([]);
  const [boardState, setBoardState] =
    useState<IBoardSquare[][]>(initialBoardState);
  const initialKeyboardState = {
    correct: {},
    included: {},
    missing: {},
  };
  const [keyboardState, setKeyboardState] =
    useState<IKeyboardState>(initialKeyboardState);
  const [currentRowNumber, setCurrentRowNumber] = useState<number>(0);

  /**
   * Included letter in correct position is green.  Included letter in wrong position is yellow.
   */
  const getBoardSquareState = (
    letter: string | null,
    squareIndex: number
  ): BoardSquareState => {
    if (!letter) return BoardSquareState.Default;
    return currentWord[squareIndex] === letter
      ? BoardSquareState.Correct
      : currentWord.includes(letter)
      ? BoardSquareState.Included
      : BoardSquareState.Missing;
  };

  /**
   * Included letter in correct position is green.  Included letter in wrong position is yellow.
   * Default color is gray.
   */
  const getKeyboardKeyColor = (key: string): string => {
    if (key.length > 1) return defaultKeyColor;
    return !!keyboardState.correct[key]
      ? correctColor
      : !!keyboardState.included[key]
      ? includedColor
      : !!keyboardState.missing[key]
      ? missingColor
      : defaultKeyColor;
  };

  const updateKeyboardState = (row: IBoardSquare[]) => {
    const newKeyboardState = { ...keyboardState };
    row.forEach((square) => {
      if (square.letter) {
        newKeyboardState.correct[square.letter] =
          square.state === BoardSquareState.Correct;
        newKeyboardState.included[square.letter] =
          square.state === BoardSquareState.Included;
        newKeyboardState.missing[square.letter] =
          square.state === BoardSquareState.Missing;
      }
    });
    setKeyboardState(newKeyboardState as any);
  };

  const checkCurrentRow = () => {
    const newBoardState = boardState.slice();
    const currentRow = newBoardState[currentRowNumber].slice();
    const word = currentRow.map((square) => square.letter).join("");
    if (!(word in wordMap)) {
      alert(`${word.toUpperCase()} is not in the word list!`);
      return;
    }
    const newRow = currentRow.map((square, i) => {
      const newState = getBoardSquareState(square.letter, i);
      return { ...square, state: newState };
    });
    updateKeyboardState(newRow);
    newBoardState[currentRowNumber] = newRow;
    setBoardState(newBoardState);
    setCurrentRowNumber(currentRowNumber + 1);
    // TODO: Check if the word is correct, then set complete state to true
  };

  const handleKeyClick = (keySquare: IKeySquare) => {
    if (currentRowNumber === numberOfRows) return;
    const newBoardState = boardState.slice();
    const currentRow = newBoardState[currentRowNumber].slice();
    if (keySquare.key === "enter") {
      checkCurrentRow();
    } else if (keySquare.key === "delete") {
      // Remove last letter from current row
      if (currentRow.length === 0) return;
      const newRow = currentRow.slice(0, currentRow.length - 1);
      newBoardState[currentRowNumber] = newRow;
      setBoardState(newBoardState);
    } else {
      if (currentRow.length === numberOfLetters) {
        // TODO: Alert user know row is full
      } else {
        currentRow.push({
          letter: keySquare.key,
          state: BoardSquareState.Default,
        });
        newBoardState[currentRowNumber] = currentRow;
        setBoardState(newBoardState);
      }
    }
  };

  return (
    <BoardPage>
      <BoardHeader>
        <div>Wordle Unlimited</div>
      </BoardHeader>
      <BoardContainer>
        {boardState.map((row, rowIndex) => {
          // If row has empty spaces, fill with empty boardSquare objects
          const rowSquares =
            row.length === numberOfLetters
              ? row
              : row.concat(
                  Array(numberOfLetters - row.length).fill({
                    letter: null,
                    color: defaultSquareColor,
                  })
                );
          return (
            <BoardRow key={rowIndex}>
              {rowSquares.map((square, squareIndex) => {
                return (
                  <BoardSquare
                    key={squareIndex}
                    color={getColorFromState(square.state)}
                    hasLetter={!!square.letter}
                  >
                    {square.letter}
                  </BoardSquare>
                );
              })}
            </BoardRow>
          );
        })}
      </BoardContainer>
      <KeyboardContainer>
        {keyboardRows.map((row, rowIndex) => (
          <KeyboardRow key={rowIndex}>
            {row.map((keyboardKey, keyIndex) => (
              <KeyboardKey
                key={keyIndex}
                color={getKeyboardKeyColor(keyboardKey.key)}
                isWide={keyboardKey.key.length > 1}
                onClick={() => handleKeyClick(keyboardKey)}
              >
                {keyboardKey.key}
              </KeyboardKey>
            ))}
          </KeyboardRow>
        ))}
      </KeyboardContainer>
    </BoardPage>
  );
};
