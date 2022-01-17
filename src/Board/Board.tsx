import React, { useState } from "react";
import styled from "styled-components";

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

const BoardSquare = styled.div<{ color: string; hasLetter: boolean }>`
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

const initialKeyboardState = [
  [
    { key: "q", color: defaultKeyColor },
    { key: "w", color: defaultKeyColor },
    { key: "e", color: defaultKeyColor },
    { key: "r", color: defaultKeyColor },
    { key: "t", color: defaultKeyColor },
    { key: "y", color: defaultKeyColor },
    { key: "u", color: defaultKeyColor },
    { key: "i", color: defaultKeyColor },
    { key: "o", color: defaultKeyColor },
    { key: "p", color: defaultKeyColor },
    { key: "delete", color: defaultKeyColor },
  ],
  [
    { key: "a", color: defaultKeyColor },
    { key: "s", color: defaultKeyColor },
    { key: "d", color: defaultKeyColor },
    { key: "f", color: defaultKeyColor },
    { key: "g", color: defaultKeyColor },
    { key: "h", color: defaultKeyColor },
    { key: "j", color: defaultKeyColor },
    { key: "k", color: defaultKeyColor },
    { key: "l", color: defaultKeyColor },
    { key: "enter", color: defaultKeyColor },
  ],
  [
    { key: "z", color: defaultKeyColor },
    { key: "x", color: defaultKeyColor },
    { key: "c", color: defaultKeyColor },
    { key: "v", color: defaultKeyColor },
    { key: "b", color: defaultKeyColor },
    { key: "n", color: defaultKeyColor },
    { key: "m", color: defaultKeyColor },
  ],
];

interface IBoardProps {
  currentWord: string;
  numberOfLetters: number;
  numberOfRows: number;
}

interface IBoardSquare {
  letter: string | null;
  color: string;
}

interface IKeySquare {
  key: string;
  color: string;
}

export const Board = (props: IBoardProps) => {
  const { currentWord, numberOfRows, numberOfLetters } = props;
  console.log('currentWord', currentWord)
  const initialBoardState = Array(numberOfRows).fill([]) as IBoardSquare[][];
  const [boardState, setBoardState] =
    useState<IBoardSquare[][]>(initialBoardState);
  const [keyboardState, setKeyboardState] =
    useState<IKeySquare[][]>(initialKeyboardState);
  const [currentRowNumber, setCurrentRowNumber] = useState<number>(0);

  /**
   * Included letter in correct position is green.  Included letter in wrong position is yellow.
   */
  const getBoardSquareColor = (
    letter: string | null,
    squareIndex: number
  ): string => {
    if (!letter) return defaultSquareColor;
    return currentWord[squareIndex] === letter
      ? correctColor
      : currentWord.includes(letter)
      ? includedColor
      : missingColor;
  };

  // /**
  //  * Included letter in correct position is green.  Included letter in wrong position is yellow.
  //  * Default color is gray.
  //  */
  // const getKeyboardKeyColor = (key: string): string => {
  //   if (key.length > 1) return defaultKeyColor;
  //   return key in keyboardState.isCorrect
  //     ? correctColor
  //     : key in keyboardState.isIncluded
  //     ? includedColor
  //     : key in keyboardState.isMissing
  //     ? missingColor
  //     : defaultKeyColor;
  // };

  // const updateKeyboardState = () => {
  //   const keyboardRow =
  // };

  const checkCurrentRow = () => {
    const newBoardState = boardState.slice();
    const currentRow = newBoardState[currentRowNumber].slice();
    const newCurrentRow = currentRow.map((square, i) => {
      const newColor = getBoardSquareColor(square.letter, i)
      return { ...square, color: newColor };
    });
    // TODO: Also update keyboard keys with correct colors
    newBoardState[currentRowNumber] = newCurrentRow;
    setBoardState(newBoardState);
    // TODO: Check if the word is correct, then set complete state to true
  };

  const handleKeyClick = (keySquare: IKeySquare) => {
    if (currentRowNumber === numberOfRows) return;
    const newBoardState = boardState.slice();
    const newCurrentRow = newBoardState[currentRowNumber].slice();
    if (keySquare.key === "enter") {
      checkCurrentRow()
      setCurrentRowNumber(currentRowNumber + 1);
    } else if (keySquare.key === "delete") {
      // Remove last letter from current row
      if (newCurrentRow.length === 0) return;
      newCurrentRow.splice(1);
      newBoardState[currentRowNumber] = newCurrentRow;
      setBoardState(newBoardState);
    } else {
      if (newCurrentRow.length === numberOfLetters) {
        // TODO: Alert user know row is full
      } else {
        newCurrentRow.push({
          letter: keySquare.key,
          color: defaultSquareColor,
        });
        newBoardState[currentRowNumber] = newCurrentRow;
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
                    color={square.color}
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
        {keyboardState.map((row, rowIndex) => (
          <KeyboardRow key={rowIndex}>
            {row.map((keyboardKey, keyIndex) => (
              <KeyboardKey
                key={keyIndex}
                color={keyboardKey.color}
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
