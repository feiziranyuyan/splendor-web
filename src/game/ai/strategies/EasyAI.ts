import { GameState, Player, GameAction, PurchaseCardAction, ReserveCardAction } from '@/types'
import { AIPlayer } from '../AIPlayer'

/**
 * 简单AI策略
 * 
 * 决策逻辑：
 * 1. 优先购买有点数的卡牌
 * 2. 如果无法购买有点数的卡，考虑购买无点数的卡（积累加成）
 * 3. 如果无法购买，随机拿取宝石或保留卡牌
 * 
 * 特点：
 * - 决策简单快速（<100ms）
 * - 注重即时收益
 * - 不考虑长期规划
 */
export class EasyAI extends AIPlayer {
  selectAction(gameState: GameState, player: Player): GameAction {
    // 1. 尝试购买卡牌
    const purchaseActions = this.getAvailablePurchaseActions(gameState, player)
    
    if (purchaseActions.length > 0) {
      // 优先选择有点数的卡牌
      const cardsWithPoints = purchaseActions.filter(
        action => (action as PurchaseCardAction).card.points > 0
      )

      if (cardsWithPoints.length > 0) {
        // 选择点数最高的卡牌
        const bestCard = cardsWithPoints.reduce((best, current) => {
          const bestPoints = (best as PurchaseCardAction).card.points
          const currentPoints = (current as PurchaseCardAction).card.points
          return currentPoints > bestPoints ? current : best
        })
        return bestCard
      }

      // 如果没有有点数的卡，随机选择一个可购买的卡（积累加成）
      if (Math.random() < 0.5) {
        return this.randomChoice(purchaseActions)
      }
    }

    // 2. 如果无法购买或选择不购买，考虑其他动作
    const takeGemActions = this.getAvailableTakeGemActions(gameState, player)
    const reserveActions = this.getAvailableReserveActions(gameState, player)

    const allActions = [...takeGemActions, ...reserveActions]

    if (allActions.length === 0) {
      // 如果没有其他动作，只能拿宝石
      return this.randomChoice(takeGemActions)
    }

    // 70%概率拿宝石，30%概率保留卡牌
    if (Math.random() < 0.7 && takeGemActions.length > 0) {
      return this.randomChoice(takeGemActions)
    } else if (reserveActions.length > 0) {
      // 保留高分卡牌
      const highValueCards = reserveActions.filter(action => {
        const reserveAction = action as ReserveCardAction
        return reserveAction.card.points >= 2
      })
      
      if (highValueCards.length > 0) {
        return this.randomChoice(highValueCards)
      }
      
      return this.randomChoice(reserveActions)
    } else {
      return this.randomChoice(takeGemActions)
    }
  }

  /**
   * 从动作列表中随机选择一个
   */
  private randomChoice<T>(actions: T[]): T {
    return actions[Math.floor(Math.random() * actions.length)]
  }
}
