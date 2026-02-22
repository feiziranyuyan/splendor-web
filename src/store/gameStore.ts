import { create } from 'zustand'
import {
  GameState,
  GamePhase,
  Player,
  GameAction,
  Card,
  AIDifficulty,
} from '@/types'
import { GameEngine } from '@/game/core'
import { createAI } from '@/game/ai'

/**
 * UI状态接口
 */
interface UIState {
  /** 选中的卡牌 */
  selectedCard: Card | null
  /** 选中的宝石 */
  selectedGems: string[]
  /** 当前操作模式 */
  actionMode: 'select' | 'confirm' | null
  /** 错误消息 */
  errorMessage: string | null
  /** 是否显示游戏规则 */
  showRules: boolean
  /** 是否显示游戏设置 */
  showSettings: boolean
}

/**
 * 游戏Store接口
 */
interface GameStore {
  // 游戏状态
  engine: GameEngine | null
  gameState: GameState | null
  uiState: UIState

  // 游戏控制方法
  startNewGame: (
    playerCount: number,
    humanPlayerNames: string[],
    aiDifficulty: AIDifficulty
  ) => void
  executeAction: (action: GameAction) => void
  executeAITurn: () => void
  resetGame: () => void

  // UI交互方法
  selectCard: (card: Card | null) => void
  selectGem: (gem: string) => void
  clearSelection: () => void
  setErrorMessage: (message: string | null) => void
  toggleRules: () => void
  toggleSettings: () => void

  // 查询方法
  getCurrentPlayer: () => Player | null
  isAITurn: () => boolean
  canExecuteAction: (action: GameAction) => boolean
}

/**
 * 初始UI状态
 */
const initialUIState: UIState = {
  selectedCard: null,
  selectedGems: [],
  actionMode: null,
  errorMessage: null,
  showRules: false,
  showSettings: false,
}

/**
 * 游戏状态管理Store
 */
export const useGameStore = create<GameStore>((set, get) => ({
  // 初始状态
  engine: null,
  gameState: null,
  uiState: initialUIState,

  // 开始新游戏
  startNewGame: (playerCount, humanPlayerNames, aiDifficulty) => {
    try {
      // 创建AI玩家配置
      const aiCount = playerCount - humanPlayerNames.length
      const aiPlayers = Array.from({ length: aiCount }, (_, i) => ({
        name: `AI ${i + 1}`,
        difficulty: aiDifficulty,
      }))

      // 初始化游戏引擎
      const engine = GameEngine.initGame({
        playerCount,
        humanPlayerNames,
        aiPlayers,
      })

      set({
        engine,
        gameState: engine.getState(),
        uiState: initialUIState,
      })

      // 如果第一个玩家是AI，自动执行AI回合
      const store = get()
      if (store.isAITurn()) {
        setTimeout(() => {
          store.executeAITurn()
        }, 1000)
      }
    } catch (error) {
      console.error('Failed to start game:', error)
      set({
        uiState: {
          ...get().uiState,
          errorMessage: '游戏初始化失败',
        },
      })
    }
  },

  // 执行玩家动作
  executeAction: (action: GameAction) => {
    const { engine } = get()
    if (!engine) return

    const result = engine.executeAction(action)

    if (result.success) {
      set({
        gameState: engine.getState(),
        uiState: {
          ...initialUIState,
          showRules: get().uiState.showRules,
          showSettings: get().uiState.showSettings,
        },
      })

      // 如果游戏未结束且下一个玩家是AI，自动执行AI回合
      const store = get()
      if (
        store.gameState?.phase === GamePhase.PLAYING &&
        store.isAITurn()
      ) {
        setTimeout(() => {
          store.executeAITurn()
        }, 1000)
      }
    } else {
      set({
        uiState: {
          ...get().uiState,
          errorMessage: result.error || '动作执行失败',
        },
      })
    }
  },

  // 执行AI回合
  executeAITurn: () => {
    const { engine, gameState } = get()
    if (!engine || !gameState) return

    const currentPlayer = engine.getCurrentPlayer()
    if (currentPlayer.type !== 'ai' || !currentPlayer.aiDifficulty) return

    try {
      // 创建AI实例
      const ai = createAI(currentPlayer.aiDifficulty)

      // AI选择动作
      const action = ai.selectAction(gameState, currentPlayer)

      // 执行动作
      const result = engine.executeAction(action)

      if (result.success) {
        set({ gameState: engine.getState() })

        // 如果下一个玩家也是AI，继续执行
        const store = get()
        if (
          store.gameState?.phase === GamePhase.PLAYING &&
          store.isAITurn()
        ) {
          setTimeout(() => {
            store.executeAITurn()
          }, 1000)
        }
      } else {
        console.error('AI action failed:', result.error)
        // AI动作失败，尝试其他动作或跳过
        set({
          uiState: {
            ...get().uiState,
            errorMessage: 'AI执行失败，跳过回合',
          },
        })
      }
    } catch (error) {
      console.error('AI turn error:', error)
    }
  },

  // 重置游戏
  resetGame: () => {
    set({
      engine: null,
      gameState: null,
      uiState: initialUIState,
    })
  },

  // UI交互方法
  selectCard: (card: Card | null) => {
    set({
      uiState: {
        ...get().uiState,
        selectedCard: card,
      },
    })
  },

  selectGem: (gem: string) => {
    const currentGems = get().uiState.selectedGems
    const index = currentGems.indexOf(gem)

    if (index >= 0) {
      // 取消选择
      set({
        uiState: {
          ...get().uiState,
          selectedGems: currentGems.filter((_, i) => i !== index),
        },
      })
    } else {
      // 添加选择
      set({
        uiState: {
          ...get().uiState,
          selectedGems: [...currentGems, gem],
        },
      })
    }
  },

  clearSelection: () => {
    set({
      uiState: {
        ...get().uiState,
        selectedCard: null,
        selectedGems: [],
        actionMode: null,
      },
    })
  },

  setErrorMessage: (message: string | null) => {
    set({
      uiState: {
        ...get().uiState,
        errorMessage: message,
      },
    })
  },

  toggleRules: () => {
    set({
      uiState: {
        ...get().uiState,
        showRules: !get().uiState.showRules,
      },
    })
  },

  toggleSettings: () => {
    set({
      uiState: {
        ...get().uiState,
        showSettings: !get().uiState.showSettings,
      },
    })
  },

  // 查询方法
  getCurrentPlayer: () => {
    const { engine } = get()
    return engine ? engine.getCurrentPlayer() : null
  },

  isAITurn: () => {
    const currentPlayer = get().getCurrentPlayer()
    return currentPlayer?.type === 'ai'
  },

  canExecuteAction: (action: GameAction) => {
    const { engine } = get()
    if (!engine) return false

    const validation = engine.validateAction(action)
    return validation.valid
  },
}))
