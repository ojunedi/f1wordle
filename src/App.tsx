import data from '../src/data/db.json'
import Wordle from './components/Wordle'

function App() {
  const solution = data.solutions[Math.floor(Math.random() * 16)].word
  return (
    <div className="App">
      <h1>WORDLE</h1>
      {solution && <div>Solution is {solution}</div>}
    </div>
  )
}

export default App
