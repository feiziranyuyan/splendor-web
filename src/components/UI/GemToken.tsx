import { GemType } from '@/types'

interface GemTokenProps {
  type: GemType
  count: number
  onClick?: () => void
  selected?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const gemColors: Record<GemType, string> = {
  [GemType.DIAMOND]: 'bg-gem-diamond border-gray-400 text-gray-700',
  [GemType.SAPPHIRE]: 'bg-gem-sapphire text-white',
  [GemType.EMERALD]: 'bg-gem-emerald text-white',
  [GemType.RUBY]: 'bg-gem-ruby text-white',
  [GemType.ONYX]: 'bg-gem-onyx text-white',
  [GemType.GOLD]: 'bg-gem-gold text-white',
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
  sm: 'w-12 h-12 text-xs',
  md: 'w-16 h-16 text-sm',
  lg: 'w-20 h-20 text-base',
}

export function GemToken({
  type,
  count,
  onClick,
  selected = false,
  size = 'md',
}: GemTokenProps) {
  return (
    <button
      onClick={onClick}
      disabled={count === 0 || !onClick}
      className={`
        ${sizeClasses[size]}
        ${gemColors[type]}
        rounded-full
        border-2
        flex flex-col items-center justify-center
        font-bold
        transition-all
        ${selected ? 'ring-4 ring-yellow-400 scale-110' : ''}
        ${onClick && count > 0 ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
        ${count === 0 ? 'opacity-40' : ''}
        disabled:cursor-not-allowed
      `}
    >
      <span className="text-2xl">{gemLabels[type]}</span>
      <span className="text-xs font-bold">{count}</span>
    </button>
  )
}
