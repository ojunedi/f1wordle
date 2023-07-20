import React from "react";

interface RowProps {
  guess: Array<any> | null;
  currentGuess: string;
}

function Row({ guess, currentGuess }: RowProps) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, index) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess !== "") {
    let letters = currentGuess.split('')
    return (
      <div className="row current">
        {letters.map((letter, index) => (
          <div key={index} className="filled">{letter}</div>
        ))}
        {[...Array(5 - letters.length)].map((_, index) => (
          <div key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Row;
