import { Card as CardType, GemType } from '@/types'
import { motion } from 'framer-motion'

interface CardProps {
  card: CardType
  onClick?: () => void
  selected?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const gemColors: Record<GemType, string> = {
  [GemType.DIAMOND]: 'bg-gem-diamond border-gray-400',
  [GemType.SAPPHIRE]: 'bg-gem-sapphire',
  [GemType.EMERALD]: 'bg-gem-emerald',
  [GemType.RUBY]: 'bg-gem-ruby',
  [GemType.ONYX]: 'bg-gem-onyx',
  [GemType.GOLD]: 'bg-gem-gold',
}

const gemLabels: Record<GemType, string> = {
  [GemType.DIAMOND]: '💎',
  [GemType.SAPPHIRE]: '💠',
  [GemType.EMERALD]: '💚',
  [GemType.RUBY]: '❤️',
  [GemType.ONYX]: '🖤',
  [GemType.GOLD]: '⭐',
}

const sizeClasses = {
  sm: 'w-20 h-28 text-xs',
  md: 'w-24 h-32 text-sm',
  lg: 'w-32 h-44 text-base',
}

export function Card({ card, onClick, selected = false, size = 'md' }: CardProps) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        ${gemColors[card.bonus]}
        rounded-lg
        border-2
        border-gray-700
        p-2
        flex flex-col
        justify-between
        ${selected ? 'ring-4 ring-yellow-400' : ''}
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        transition-shadow
        text-white
      `}
    >
      {/* 点数 */}
      {card.points > 0 && (
        <div className="text-right">
          <span className="text-2xl font-bold">{card.points}</span>
        </div>
      )}

      {/* 加成 */}
      <div className="flex justify-center items-center flex-1">
        <span className="text-4xl">{gemLabels[card.bonus]}</span>
      </div>

      {/* 成本 */}
      <div className="flex flex-wrap gap-1 justify-center">
        {Object.entries(card.cost).map(([gem, count]) => (
          <div
            key={gem}
            className="bg-black bg-opacity-30 rounded px-1 flex items-center gap-1"
          >
            <span className="text-xs">{gemLabels[gem as GemType]}</span>
            <span className="text-xs font-bold">{count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
