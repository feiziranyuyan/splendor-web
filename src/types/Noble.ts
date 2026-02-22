import { GemBonus } from './Gem'

/**
 * 贵族接口
 */
export interface Noble {
  /** 贵族唯一ID */
  id: string
  /** 声望点数（固定为3分） */
  points: 3
  /** 访问条件：需要的卡牌加成数量 */
  requirements: Required<GemBonus>
}
