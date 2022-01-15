import React, { useState } from "react";
import styled from "styled-components";

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
  background-color: ${(props) => props.color ?? "#121213"};
  border: ${(props) => (props.hasLetter ? "none" : "2px solid #818384")};
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
  background-color: ${(props) => props.color ?? "#818384"};
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

const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

interface IBoardProps {
  currentWord: string;
  numberOfLetters: number;
  numberOfRows: number;
}

interface IKeyboardState {
  isCorrect: any;
  isIncluded: any;
  isMissing: any;
}

export const Board = (props: IBoardProps) => {
  const { currentWord, numberOfRows, numberOfLetters } = props;
  const fakeBoardState = ["arise", "daily", "", "", "", ""];
  const [boardState, setBoardState] = useState<string[]>(
    // Array(numberOfRows).fill("")
    fakeBoardState
  );
  const fakeKeyboardState = {
    isCorrect: { d: true, a: true, i: true, l: true, y: true },
    isIncluded: {},
    isMissing: { r: true, s: true, e: true },
  };
  const [keyboardState, setKeyboardState] = useState<IKeyboardState>(
    //   {
    //   isCorrect: {},
    //   isIncluded: {},
    //   isMissing: {},
    // }
    fakeKeyboardState
  );

  /**
   * Included letter in correct position is green.  Included letter in wrong position is yellow.
   */
  const getBoardSquareColor = (char: string, i: number): string => {
    if (!char) return "#121213";
    return currentWord[i] === char
      ? "#538D4E"
      : currentWord.includes(char)
      ? "#B59F3B"
      : "#3A3A3C";
  };

  /**
   * Included letter in correct position is green.  Included letter in wrong position is yellow.
   * Default color is gray.
   */
  const getKeyboardKeyColor = (key: string): string => {
    if (key.length > 1) return "#818384";
    return key in keyboardState.isCorrect
      ? "#538D4E"
      : key in keyboardState.isIncluded
      ? "#B59F3B"
      : key in keyboardState.isMissing
      ? "#3A3A3C"
      : "#818384";
  };

  const handleKeyClick = (key: string) => {
    // key click
  };

  return (
    <BoardPage>
      <BoardHeader>
        <div>Wordle Unlimited</div>
      </BoardHeader>
      <BoardContainer>
        {boardState.map((row, i) => {
          // Convert row to arr with empty spaces filled in
          // const rowArr = ["l", "a", "i", "r", "y"];
          const rowArr = row
            .split("")
            .concat(Array(numberOfLetters - row.length).fill(""));
          return (
            <BoardRow key={i}>
              {rowArr.map((c, i) => {
                return (
                  <BoardSquare
                    key={i}
                    color={getBoardSquareColor(c, i)}
                    hasLetter={!!c}
                  >
                    {c}
                  </BoardSquare>
                );
              })}
            </BoardRow>
          );
        })}
      </BoardContainer>
      <KeyboardContainer>
        {keyboardRows.map((row, i) => {
          const rowArr =
            i !== 2
              ? row.split("")
              : ["enter"].concat(row.split("")).concat(["delete"]);
          console.log("rowArr", rowArr);
          return (
            <KeyboardRow key={i}>
              {rowArr.map((key) => (
                <KeyboardKey
                  color={getKeyboardKeyColor(key)}
                  isWide={key.length > 1}
                  onClick={() => handleKeyClick(key)}
                >
                  {key}
                </KeyboardKey>
              ))}
            </KeyboardRow>
          );
        })}
      </KeyboardContainer>
    </BoardPage>
  );
};
