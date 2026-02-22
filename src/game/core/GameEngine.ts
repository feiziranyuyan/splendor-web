import {
  GameState,
  GamePhase,
  GameInitOptions,
  Player,
  PlayerType,
  GameAction,
  CardLevel,
} from '@/types'
import { getGemConfig, VISIBLE_CARDS_PER_LEVEL, WINNING_POINTS } from '@/constants'
import { CARDS_BY_LEVEL } from '@/constants/cards'
import { ALL_NOBLES, getNobleCount } from '@/constants/nobles'
import { validateAction } from './validation'
import { executeAction, processTurnEnd } from './actions'

/**
 * 游戏引擎类
 */
export class GameEngine {
  private gameState: GameState

  constructor(gameState: GameState) {
    this.gameState = gameState
  }

  /**
   * 初始化新游戏
   */
  static initGame(options: GameInitOptions): GameEngine {
    const { playerCount, humanPlayerNames, aiPlayers } = options

    // 创建玩家
    const players: Player[] = []

    // 人类玩家
    for (let i = 0; i < humanPlayerNames.length; i++) {
      players.push({
        id: `player_${i}`,
        name: humanPlayerNames[i],
        type: PlayerType.HUMAN,
        gems: {},
        cards: [],
        reservedCards: [],
        nobles: [],
        points: 0,
      })
    }

    // AI玩家
    for (let i = 0; i < aiPlayers.length; i++) {
      players.push({
        id: `player_${humanPlayerNames.length + i}`,
        name: aiPlayers[i].name,
        type: PlayerType.AI,
        aiDifficulty: aiPlayers[i].difficulty as any,
        gems: {},
        cards: [],
        reservedCards: [],
        nobles: [],
        points: 0,
      })
    }

    // 洗牌
    const shuffledDecks = {
      level1: shuffle([...CARDS_BY_LEVEL[CardLevel.LEVEL_1]]),
      level2: shuffle([...CARDS_BY_LEVEL[CardLevel.LEVEL_2]]),
      level3: shuffle([...CARDS_BY_LEVEL[CardLevel.LEVEL_3]]),
    }

    // 翻开公开卡牌
    const visibleCards = {
      level1: shuffledDecks.level1.splice(0, VISIBLE_CARDS_PER_LEVEL),
      level2: shuffledDecks.level2.splice(0, VISIBLE_CARDS_PER_LEVEL),
      level3: shuffledDecks.level3.splice(0, VISIBLE_CARDS_PER_LEVEL),
    }

    // 随机选择贵族
    const nobleCount = getNobleCount(playerCount)
    const shuffledNobles = shuffle([...ALL_NOBLES])
    const availableNobles = shuffledNobles.slice(0, nobleCount)

    // 初始化宝石
    const availableGems = getGemConfig(playerCount)

    // 创建游戏状态
    const gameState: GameState = {
      id: `game_${Date.now()}`,
      phase: GamePhase.PLAYING,
      config: {
        playerCount,
        humanPlayerCount: humanPlayerNames.length,
        aiPlayers: {
          count: aiPlayers.length,
          difficulty: aiPlayers[0]?.difficulty || 'easy',
        },
      },
      players,
      currentPlayerIndex: 0,
      turnCount: 0,
      availableGems,
      visibleCards,
      decks: shuffledDecks,
      availableNobles,
      history: [],
      startTime: Date.now(),
    }

    return new GameEngine(gameState)
  }

  /**
   * 获取当前游戏状态
   */
  getState(): GameState {
    return this.gameState
  }

  /**
   * 获取当前玩家
   */
  getCurrentPlayer(): Player {
    return this.gameState.players[this.gameState.currentPlayerIndex]
  }

  /**
   * 验证动作是否合法
   */
  validateAction(action: GameAction) {
    return validateAction(action, this.gameState)
  }

  /**
   * 执行玩家动作
   */
  executeAction(action: GameAction): { success: boolean; error?: string } {
    // 验证动作
    const validation = this.validateAction(action)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // 执行动作
    executeAction(action, this.gameState)

    // 回合结束处理
    processTurnEnd(this.gameState)

    // 检查游戏是否结束
    if (this.checkGameEnd()) {
      this.gameState.phase = GamePhase.FINISHED
      this.gameState.winnerId = this.determineWinner()
      this.gameState.endTime = Date.now()
    }

    return { success: true }
  }

  /**
   * 检查游戏是否结束
   */
  checkGameEnd(): boolean {
    // 如果有玩家达到15分或以上，进入最后一轮
    const hasWinningPlayer = this.gameState.players.some(p => p.points >= WINNING_POINTS)

    if (!hasWinningPlayer) {
      return false
    }

    // 检查是否所有玩家都进行了最后一轮
    // 当currentPlayerIndex回到触发结束的玩家时，游戏结束
    // 这里简化实现：只要有人达到15分就立即结束
    // 实际游戏中需要让所有玩家再各进行一回合
    return true
  }

  /**
   * 确定获胜者
   */
  determineWinner(): string {
    let maxPoints = 0
    let winners: Player[] = []

    // 找出最高分
    for (const player of this.gameState.players) {
      if (player.points > maxPoints) {
        maxPoints = player.points
        winners = [player]
      } else if (player.points === maxPoints) {
        winners.push(player)
      }
    }

    // 如果有平局，卡牌数最少的获胜
    if (winners.length > 1) {
      let minCards = Infinity
      let finalWinner = winners[0]

      for (const player of winners) {
        if (player.cards.length < minCards) {
          minCards = player.cards.length
          finalWinner = player
        }
      }

      return finalWinner.id
    }

    return winners[0].id
  }

  /**
   * 获取游戏统计信息
   */
  getGameStats() {
    return {
      turnCount: this.gameState.turnCount,
      duration: this.gameState.endTime
        ? this.gameState.endTime - this.gameState.startTime
        : Date.now() - this.gameState.startTime,
      players: this.gameState.players.map(p => ({
        id: p.id,
        name: p.name,
        points: p.points,
        cardCount: p.cards.length,
        nobleCount: p.nobles.length,
      })),
    }
  }
}

/**
 * 洗牌辅助函数（Fisher-Yates shuffle）
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
