/**
 * @desc 单个礼物最小单价 0
 * @type {number}
 */
const SINGLE_GIFT_MIN_VALUE = 0;

/**
 * @desc 单个礼物最大单价 10000,00 (10000人民币， 1000000金币)
 * @type {number}
 */
const SINGLE_GIFT_MAX_VALUE = 1e6;

/**
 * @desc 人民币 -> 金币 转换单价  1 ： 100
 *
 * @example 1(人民币) = 100(金币)
 * @type {number}
 */
const CONVERSION_UNIT = 1e2;

/**
 * @desc 全局日期格式处理
 * @see http://momentjs.cn/docs/#/displaying/
 * @type {string}
 */
const DATE_FORMATTER = 'YYYY/MM/DD HH:mm:ss';

/**
 * @desc 公司logo地址
 * @readonly
 * */
const LOGO = "https://imechos-dev.oss-cn-hangzhou.aliyuncs.com/avatar/bdd4889420406d99c3a12644f233dc404a2cf62b.png"


export { SINGLE_GIFT_MAX_VALUE, SINGLE_GIFT_MIN_VALUE, CONVERSION_UNIT, DATE_FORMATTER , LOGO};
