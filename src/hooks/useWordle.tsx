import { useState } from "react";

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<any[]>([...Array(6)]); // each guess will be an array
  const [history, setHistory] = useState<string[]>([]); // each guess will be a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'green', b: 'grey, ...}

  // format a guess into an array of letter objects
  // e.g [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log("formatting the guess", currentGuess);
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l.toLowerCase(), color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((char, index) => {
      if (solutionArray[index].toLowerCase() === char.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = "null";
      }
    });

    formattedGuess.forEach((char, index) => {
      if (solutionArray.includes(char.key) && char.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArray[solutionArray.indexOf(char.key)] = "null";
      }
    });
    return formattedGuess;
  };

  // add a new guess to guesses state
  // increment turn
  // updatethe isCorrect state
  const addNewGuess = (formattedGuess: any) => {
    if (currentGuess.toLowerCase() === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess.toLowerCase()];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
        let newKeys = {...prevUsedKeys};
        formattedGuess.forEach((l) => {
            const currentColor = newKeys[l.key];
            if (l.color === 'green') {
                newKeys[l.key] = 'green'
                return
            }
            if (l.color === 'yellow' && currentColor !== 'green') {
                newKeys[l.key] = 'yellow'
                return
            }
            if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                newKeys[l.key] = 'grey'
                return
            }
        });
        return newKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }: KeyboardEvent) => {
    // console.log(key);

    if (key === "Enter") {
      if (turn > 5) {
        console.log("your turns are up dumbass");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("use a different word dumbass");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("make it five letters dumbass");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => {
        return prev + key;
      });
    }
  };
  return { turn, currentGuess, guesses, isCorrect,usedKeys, handleKeyup };
};

export default useWordle;
