import { useGameStore } from './store'
import { GameSetup } from './components/Game/GameSetup'
import { GameBoard } from './components/Game/GameBoard'

function App() {
  const gameState = useGameStore(state => state.gameState)

  if (!gameState) {
    return <GameSetup />
  }

  return <GameBoard />
}

export default App
