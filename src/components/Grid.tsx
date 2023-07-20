import React from "react";
import Row from "./Row";

interface GridProps {
  currentGuess: string;
  guesses: Array<Array<any>>;
  turn: number;
}

function Grid({ currentGuess, guesses, turn }: GridProps) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} guess={null}></Row>
        }
        return <Row key={i} guess={g} currentGuess={""}/>;
      })}
    </div>
  );
}

export default Grid;
