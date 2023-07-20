import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import { Keypad } from "./Keypad";
import { Modal } from "./Modal";

interface WordleProps {
  solution: string;
}

function Wordle({ solution }: WordleProps) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener("keyup", handleKeyup);
      console.log("Congrats, you won!");
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener("keyup", handleKeyup);
      console.log("All turns up");
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <div>
      <div>solution - {solution}</div>
      <div>Current Guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}></Grid>
      <Keypad usedKeys={usedKeys}></Keypad>
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}></Modal>}
    </div>
  );
}

export default Wordle;
