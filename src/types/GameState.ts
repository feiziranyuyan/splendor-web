import { Player } from './Player'
import { Card } from './Card'
import { Noble } from './Noble'
import { GemTokens } from './Gem'
import { GameAction } from './Action'

/**
 * 游戏阶段
 */
export enum GamePhase {
  /** 游戏设置（选择玩家人数、AI难度） */
  SETUP = 'setup',
  /** 游戏进行中 */
  PLAYING = 'playing',
  /** 游戏结束 */
  FINISHED = 'finished',
}

/**
 * 游戏配置
 */
export interface GameConfig {
  /** 玩家人数 (2-4) */
  playerCount: number
  /** 人类玩家数量 */
  humanPlayerCount: number
  /** AI玩家配置 */
  aiPlayers: {
    count: number
    difficulty: string
  }
}

/**
 * 游戏状态接口
 */
export interface GameState {
  /** 游戏ID */
  id: string
  /** 游戏阶段 */
  phase: GamePhase
  /** 游戏配置 */
  config: GameConfig
  /** 所有玩家 */
  players: Player[]
  /** 当前回合玩家索引 */
  currentPlayerIndex: number
  /** 回合计数 */
  turnCount: number
  /** 公共区域的宝石筹码 */
  availableGems: GemTokens
  /** 公开的卡牌（3行×4列） */
  visibleCards: {
    level1: Card[]
    level2: Card[]
    level3: Card[]
  }
  /** 牌堆（尚未翻开的卡牌） */
  decks: {
    level1: Card[]
    level2: Card[]
    level3: Card[]
  }
  /** 可用的贵族 */
  availableNobles: Noble[]
  /** 获胜者ID（游戏结束时） */
  winnerId?: string
  /** 游戏历史动作（用于回放） */
  history: GameAction[]
  /** 游戏开始时间 */
  startTime: number
  /** 游戏结束时间 */
  endTime?: number
}

/**
 * 游戏初始化选项
 */
export interface GameInitOptions {
  /** 玩家人数 */
  playerCount: number
  /** 人类玩家名称 */
  humanPlayerNames: string[]
  /** AI玩家配置 */
  aiPlayers: Array<{
    name: string
    difficulty: string
  }>
}
