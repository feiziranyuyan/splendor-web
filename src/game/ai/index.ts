import { AIDifficulty } from '@/types'
import { AIPlayer } from './AIPlayer'
import { EasyAI } from './strategies/EasyAI'

/**
 * 根据难度创建AI玩家实例
 */
export function createAI(difficulty: AIDifficulty): AIPlayer {
  switch (difficulty) {
    case AIDifficulty.EASY:
      return new EasyAI()
    case AIDifficulty.MEDIUM:
      // TODO: 实现中等AI
      return new EasyAI()
    case AIDifficulty.HARD:
      // TODO: 实现困难AI
      return new EasyAI()
    default:
      return new EasyAI()
  }
}

export { AIPlayer } from './AIPlayer'
export { EasyAI } from './strategies/EasyAI'
