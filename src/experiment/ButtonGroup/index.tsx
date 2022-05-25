import React from "react";
import s from './index.less'
import {cc} from "@/utils";


/**
 * @desc 此组件只为解决 宋娟 的样式问题， 并不提供真实可用的逻辑
 * @constructor
 */
const ButtonGroup: React.FC = () => {
  return (
    <section className={s.button_group}>
      <button className={cc(s.button_item, s.button_item__active)}>恢复</button>
      <button className={cc(s.button_item, s.button_item__active)}>磁盘挂载</button>
      <button className={s.button_item}>发大财</button>
      <button className={cc(s.button_item)}>娶媳妇</button>
    </section>
  )
}

export default ButtonGroup
