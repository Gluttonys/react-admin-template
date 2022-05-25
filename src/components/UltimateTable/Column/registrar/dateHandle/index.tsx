/**
 * @desc 用于常见的表格中的时间显示问题
 * */

import type { registrarFun } from '@/components/UltimateTable/Column';
import moment from 'moment';
import { DATE_FORMATTER } from '@/constantPool/COMMON';

import s from './index.less';

const dateHandle: registrarFun = (proColumns) => {
  proColumns.forEach((col) => {
    if (col?.date) {
      col.render = (_, entity, index, __, column) => {
        /**
         * ! 警告 column.dataIndex 为数组的情况下会报错
         * @todo 修改该警告
         * @type {any}
         */
        const tempDate = entity[column.dataIndex as string];
        const showDate = moment(tempDate).format(DATE_FORMATTER);
        const semanticsDate = moment(tempDate).fromNow();
        return (
          <section className={s.date_wrapper}>
            <section className={s.date_wrapper_show}>{showDate}</section>
            <section className={s.date_wrapper_semantics}>{semanticsDate}</section>
          </section>
        );
      };
    }
  });

  return proColumns;
};

export default dateHandle;
