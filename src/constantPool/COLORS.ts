/**
 * @desc 项目内颜色值
 * @enum {string}
 * @readonly
 */
enum COLORS {
  /** 待定， 待审核颜色， 不确定因素 */
  CONSIDER = '#53b8af',

  /** 编辑， 默认 */
  EDIT = '#686de0',

  /** 新增， 添加， 新创建 */
  SUCCESS = '#6ab04c',

  /** 上传操作 */
  UPLOAD = '#f0932b',

  /** 删除， 严重后果操作提示颜色 */
  DANGER = '#eb4d4b',

  /** 重置， 重做， 不可操作 */
  RESET = '#95afc0',
}

export default COLORS;
