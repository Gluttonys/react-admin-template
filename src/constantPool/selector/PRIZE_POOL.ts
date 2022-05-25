/** @desc 奖池类型 */
const PRIZE = {
  /** 公共奖池 */
  PUBLIC: 'default',
  /** 新手奖池 */
  NOVICE: 'novice',
  /** 单抽奖池 */
  SINGLE: 'single',
  /** 广播补偿奖池 */
  BONUS_BIGGEST: 'bonusBiggest',
  /** 小额补偿奖池 */
  BONUS_LEAST: 'bonusLeast',
  /** 怒气奖池 */
  SCORE: 'score',
};

const PRIZE_OPTIONS = [
  {
    label: '公共奖池',
    value: PRIZE.PUBLIC,
  },
  {
    label: '新手奖池',
    value: PRIZE.NOVICE,
  },
  {
    label: '单抽奖池',
    value: PRIZE.SINGLE,
  },
  {
    label: '广播补偿奖池',
    value: PRIZE.BONUS_BIGGEST,
  },
  {
    label: '小额补偿奖池',
    value: PRIZE.BONUS_LEAST,
  },
  {
    label: '怒气奖池',
    value: PRIZE.SCORE,
  },
];

export { PRIZE_OPTIONS, PRIZE };
