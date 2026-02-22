import { useGameStore } from '@/store'
import { GamePhase, GemType } from '@/types'
import { PlayerPanel } from './PlayerPanel'
import { Card } from '../UI/Card'
import { GemToken } from '../UI/GemToken'
import { Button } from '../UI/Button'
import { GameOver } from './GameOver'

export function GameBoard() {
  const gameState = useGameStore(state => state.gameState)
  const getCurrentPlayer = useGameStore(state => state.getCurrentPlayer)
  const resetGame = useGameStore(state => state.resetGame)

  if (!gameState) {
    return null
  }

  if (gameState.phase === GamePhase.FINISHED) {
    return <GameOver />
  }

  const currentPlayer = getCurrentPlayer()
  const regularGems = [
    GemType.DIAMOND,
    GemType.SAPPHIRE,
    GemType.EMERALD,
    GemType.RUBY,
    GemType.ONYX,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      {/* 头部 */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">璀璨宝石</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={resetGame}>
            重新开始
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* 左侧：玩家面板 */}
        <div className="space-y-4">
          {gameState.players.map(player => (
            <PlayerPanel
              key={player.id}
              player={player}
              isCurrentPlayer={player.id === currentPlayer?.id}
            />
          ))}
        </div>

        {/* 中间和右侧：游戏区域 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 当前回合提示 */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg">
                  {currentPlayer?.name}的回合
                </h2>
                <p className="text-sm text-gray-600">
                  回合 {Math.floor(gameState.turnCount / gameState.players.length) + 1}
                </p>
              </div>
              {currentPlayer?.type === 'ai' && (
                <div className="text-sm text-gray-500">AI思考中...</div>
              )}
            </div>
          </div>

          {/* 贵族区域 */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="font-bold mb-3">贵族</h3>
            <div className="flex gap-4">
              {gameState.availableNobles.map(noble => (
                <div
                  key={noble.id}
                  className="bg-purple-100 rounded-lg p-4 text-center"
                >
                  <div className="text-4xl mb-2">👑</div>
                  <div className="text-xs font-bold mb-2">+3点</div>
                  <div className="text-xs text-gray-600">
                    需要加成:
                    {Object.entries(noble.requirements).map(([gem, count]) => {
                      if (count === 0) return null
                      return (
                        <div key={gem}>
                          {count}×{gem}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 卡牌区域 */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="font-bold mb-3">发展卡牌</h3>
            <div className="space-y-4">
              {/* 等级3 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  等级3 ({gameState.decks.level3.length}张剩余)
                </div>
                <div className="flex gap-2">
                  {gameState.visibleCards.level3.map(card => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>

              {/* 等级2 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  等级2 ({gameState.decks.level2.length}张剩余)
                </div>
                <div className="flex gap-2">
                  {gameState.visibleCards.level2.map(card => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>

              {/* 等级1 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  等级1 ({gameState.decks.level1.length}张剩余)
                </div>
                <div className="flex gap-2">
                  {gameState.visibleCards.level1.map(card => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 宝石池 */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="font-bold mb-3">宝石池</h3>
            <div className="flex gap-4 flex-wrap">
              {regularGems.map(gem => (
                <GemToken
                  key={gem}
                  type={gem}
                  count={gameState.availableGems[gem] || 0}
                  size="lg"
                />
              ))}
              <GemToken
                type={GemType.GOLD}
                count={gameState.availableGems[GemType.GOLD] || 0}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
