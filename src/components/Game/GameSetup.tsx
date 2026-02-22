import { useState } from 'react'
import { AIDifficulty } from '@/types'
import { useGameStore } from '@/store'
import { Button } from '../UI/Button'

export function GameSetup() {
  const [playerCount, setPlayerCount] = useState(2)
  const [playerName, setPlayerName] = useState('玩家1')
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>(AIDifficulty.EASY)
  
  const startNewGame = useGameStore(state => state.startNewGame)

  const handleStartGame = () => {
    startNewGame(playerCount, [playerName], aiDifficulty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          璀璨宝石
        </h1>
        <p className="text-center text-gray-600 mb-8">Splendor</p>

        <div className="space-y-6">
          {/* 玩家名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              玩家名称
            </label>
            <input
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="输入你的名字"
            />
          </div>

          {/* 玩家人数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              玩家人数
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 4].map(count => (
                <button
                  key={count}
                  onClick={() => setPlayerCount(count)}
                  className={`
                    py-2 rounded-lg font-medium transition-all
                    ${
                      playerCount === count
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {count}人
                </button>
              ))}
            </div>
          </div>

          {/* AI难度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI难度
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: AIDifficulty.EASY, label: '简单' },
                { value: AIDifficulty.MEDIUM, label: '中等' },
                { value: AIDifficulty.HARD, label: '困难' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setAiDifficulty(option.value)}
                  className={`
                    py-2 rounded-lg font-medium transition-all
                    ${
                      aiDifficulty === option.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {aiDifficulty !== AIDifficulty.EASY && (
              <p className="text-xs text-gray-500 mt-1">
                注：当前版本所有难度使用相同AI
              </p>
            )}
          </div>

          {/* 开始游戏按钮 */}
          <Button
            onClick={handleStartGame}
            className="w-full py-3 text-lg"
          >
            开始游戏
          </Button>
        </div>

        {/* 游戏说明 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">游戏目标</h3>
          <p className="text-sm text-gray-600">
            收集宝石、购买发展卡牌、吸引贵族访问，率先达到15点声望的玩家获胜！
          </p>
        </div>
      </div>
    </div>
  )
}
