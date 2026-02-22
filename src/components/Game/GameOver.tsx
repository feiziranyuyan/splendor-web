import { useGameStore } from '@/store'
import { Button } from '../UI/Button'

export function GameOver() {
  const gameState = useGameStore(state => state.gameState)
  const resetGame = useGameStore(state => state.resetGame)

  if (!gameState || !gameState.winnerId) {
    return null
  }

  const winner = gameState.players.find(p => p.id === gameState.winnerId)
  const sortedPlayers = [...gameState.players].sort((a, b) => b.points - a.points)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        {/* 胜利标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            游戏结束！
          </h1>
          <h2 className="text-2xl text-indigo-600">
            {winner?.name} 获胜！
          </h2>
        </div>

        {/* 玩家排名 */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">最终排名</h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`
                  flex items-center justify-between p-4 rounded-lg
                  ${index === 0 ? 'bg-yellow-100' : 'bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-400">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-bold">{player.name}</div>
                    <div className="text-sm text-gray-600">
                      {player.type === 'ai' ? `AI (${player.aiDifficulty})` : '人类玩家'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">
                    {player.points}
                  </div>
                  <div className="text-xs text-gray-500">
                    {player.cards.length}张卡牌 · {player.nobles.length}位贵族
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 游戏统计 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-2">游戏统计</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">总回合数</div>
              <div className="font-bold">{gameState.turnCount}</div>
            </div>
            <div>
              <div className="text-gray-600">游戏时长</div>
              <div className="font-bold">
                {Math.round((gameState.endTime! - gameState.startTime) / 1000 / 60)}分钟
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4">
          <Button onClick={resetGame} className="flex-1">
            再来一局
          </Button>
        </div>
      </div>
    </div>
  )
}
