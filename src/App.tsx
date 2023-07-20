import Wordle from "./components/Wordle";
import { useEffect, useState } from "react";

function App() {

  const [solution, setSolution] = useState("")


  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        const randomSolution = json[Math.floor(Math.random() * json.length)]
        setSolution(randomSolution.word);
      })
  }, [setSolution])


  return (
    <div className="App">
      <h1>WORDLE</h1>
      {/* {solution && <div> Solution is: {solution}</div>} */}
      <div><Wordle solution={solution}></Wordle></div>
    </div>
  );
}

export default App;
