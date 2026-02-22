import { Player, GemType } from '@/types'
import { GemToken } from '../UI/GemToken'

interface PlayerPanelProps {
  player: Player
  isCurrentPlayer: boolean
}

export function PlayerPanel({ player, isCurrentPlayer }: PlayerPanelProps) {
  const regularGems = [
    GemType.DIAMOND,
    GemType.SAPPHIRE,
    GemType.EMERALD,
    GemType.RUBY,
    GemType.ONYX,
  ]

  // 计算宝石加成
  const bonuses: Record<GemType, number> = {
    [GemType.DIAMOND]: 0,
    [GemType.SAPPHIRE]: 0,
    [GemType.EMERALD]: 0,
    [GemType.RUBY]: 0,
    [GemType.ONYX]: 0,
    [GemType.GOLD]: 0,
  }

  player.cards.forEach(card => {
    bonuses[card.bonus] = (bonuses[card.bonus] || 0) + 1
  })

  return (
    <div
      className={`
        bg-white rounded-lg p-4 shadow-lg
        ${isCurrentPlayer ? 'ring-4 ring-indigo-500' : ''}
        transition-all
      `}
    >
      {/* 玩家信息 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{player.name}</h3>
          <p className="text-sm text-gray-600">
            {player.type === 'ai' ? `AI (${player.aiDifficulty})` : '人类玩家'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-indigo-600">{player.points}</div>
          <div className="text-xs text-gray-500">声望点数</div>
        </div>
      </div>

      {/* 宝石筹码 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">宝石筹码</h4>
        <div className="flex gap-2 flex-wrap">
          {regularGems.map(gem => (
            <GemToken
              key={gem}
              type={gem}
              count={player.gems[gem] || 0}
              size="sm"
            />
          ))}
          {(player.gems[GemType.GOLD] || 0) > 0 && (
            <GemToken
              type={GemType.GOLD}
              count={player.gems[GemType.GOLD] || 0}
              size="sm"
            />
          )}
        </div>
      </div>

      {/* 卡牌加成 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          卡牌加成 ({player.cards.length}张)
        </h4>
        <div className="flex gap-2 flex-wrap">
          {regularGems.map(gem => {
            const count = bonuses[gem]
            if (count === 0) return null
            return (
              <div
                key={gem}
                className="bg-gray-100 rounded px-2 py-1 text-sm font-medium"
              >
                <GemToken type={gem} count={count} size="sm" />
              </div>
            )
          })}
        </div>
      </div>

      {/* 保留卡牌 */}
      {player.reservedCards.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            保留卡牌 ({player.reservedCards.length}/3)
          </h4>
        </div>
      )}

      {/* 贵族 */}
      {player.nobles.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            贵族 ({player.nobles.length})
          </h4>
          <div className="flex gap-2">
            {player.nobles.map(noble => (
              <div
                key={noble.id}
                className="bg-purple-100 rounded-lg p-2 text-center"
              >
                <div className="text-2xl">👑</div>
                <div className="text-xs font-bold">+3</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
