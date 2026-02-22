import { GemType } from './Gem'
import { Card } from './Card'

/**
 * 动作类型枚举
 */
export enum ActionType {
  /** 拿取3个不同颜色的宝石 */
  TAKE_THREE_DIFFERENT = 'take_three_different',
  /** 拿取2个相同颜色的宝石 */
  TAKE_TWO_SAME = 'take_two_same',
  /** 保留卡牌 */
  RESERVE_CARD = 'reserve_card',
  /** 购买卡牌 */
  PURCHASE_CARD = 'purchase_card',
}

/**
 * 基础动作接口
 */
export interface BaseAction {
  /** 动作类型 */
  type: ActionType
  /** 执行动作的玩家ID */
  playerId: string
}

/**
 * 拿取3个不同颜色宝石的动作
 */
export interface TakeThreeDifferentAction extends BaseAction {
  type: ActionType.TAKE_THREE_DIFFERENT
  /** 选择的宝石类型（1-3种，不包括黄金） */
  gems: GemType[]
}

/**
 * 拿取2个相同颜色宝石的动作
 */
export interface TakeTwoSameAction extends BaseAction {
  type: ActionType.TAKE_TWO_SAME
  /** 选择的宝石类型（不包括黄金） */
  gem: GemType
}

/**
 * 保留卡牌动作
 */
export interface ReserveCardAction extends BaseAction {
  type: ActionType.RESERVE_CARD
  /** 要保留的卡牌（公开卡牌或牌堆顶） */
  card: Card
  /** 是否从牌堆顶保留（背面朝上） */
  fromDeck: boolean
}

/**
 * 购买卡牌动作
 */
export interface PurchaseCardAction extends BaseAction {
  type: ActionType.PURCHASE_CARD
  /** 要购买的卡牌 */
  card: Card
  /** 是否从保留卡购买 */
  fromReserved: boolean
  /** 支付方式（宝石类型到数量的映射） */
  payment: Partial<Record<GemType, number>>
}

/**
 * 所有可能的动作类型联合
 */
export type GameAction =
  | TakeThreeDifferentAction
  | TakeTwoSameAction
  | ReserveCardAction
  | PurchaseCardAction

/**
 * 动作验证结果
 */
export interface ActionValidationResult {
  /** 是否合法 */
  valid: boolean
  /** 错误信息（如果不合法） */
  error?: string
}
