import { Card } from './Card'
import { Noble } from './Noble'
import { GemTokens } from './Gem'

/**
 * 玩家类型
 */
export enum PlayerType {
  /** 人类玩家 */
  HUMAN = 'human',
  /** AI玩家 */
  AI = 'ai',
}

/**
 * AI难度
 */
export enum AIDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

/**
 * 玩家接口
 */
export interface Player {
  /** 玩家唯一ID */
  id: string
  /** 玩家名称 */
  name: string
  /** 玩家类型（人类或AI） */
  type: PlayerType
  /** AI难度（仅AI玩家） */
  aiDifficulty?: AIDifficulty
  /** 拥有的宝石筹码 */
  gems: GemTokens
  /** 拥有的卡牌（已购买） */
  cards: Card[]
  /** 保留的卡牌（最多3张） */
  reservedCards: Card[]
  /** 获得的贵族 */
  nobles: Noble[]
  /** 声望点数 */
  points: number
}

/**
 * 玩家统计信息（用于游戏结束时展示）
 */
export interface PlayerStats {
  /** 玩家ID */
  playerId: string
  /** 总点数 */
  totalPoints: number
  /** 卡牌点数 */
  cardPoints: number
  /** 贵族点数 */
  noblePoints: number
  /** 拥有的卡牌数量 */
  cardCount: number
  /** 各等级卡牌数量 */
  cardsByLevel: {
    level1: number
    level2: number
    level3: number
  }
  /** 获得的贵族数量 */
  nobleCount: number
  /** 总回合数 */
  turnCount: number
}
