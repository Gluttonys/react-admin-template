/**
 * @desc 用于常见的表格中的数字显示问题
 * */

import type { registrarFun } from '@/components/UltimateTable/Column';
import s from './index.less';
import { Popover } from 'antd';
import { CONVERSION_UNIT } from '@/constantPool/COMMON';

const { numberToChinese } = require('@amin22761/number-to-chinese');

const numberHandle: registrarFun = (proColumns) => {
  proColumns.forEach((col) => {
    if (col?.number) {
      col.render = (_, entity, index, __, column) => {
        let numberValue: any;
        if (typeof column.dataIndex === 'string') {
          numberValue = entity?.[column.dataIndex as string];
        } else if (Array.isArray(column.dataIndex)) {
          numberValue = column.dataIndex.reduce((pre, cur) => pre[cur], entity);
        }

        const transformNumber = numberToChinese(numberValue);
        const formatNumber =
          typeof numberValue === 'string'
            ? ~~numberValue.toLocaleString()
            : numberValue.toLocaleString();

        const realNumber = numberValue / CONVERSION_UNIT;
        const upperRealNumber =
          parseInt(realNumber.toString()) === realNumber && numberToChinese(realNumber);
        const formatRealNumber = realNumber.toLocaleString();

        const content = (
          <section className={s.content}>
            <span className={s.real}>￥{formatRealNumber}</span>
            <span className={s.trans}>
              <small>{upperRealNumber}</small>
            </span>
          </section>
        );

        return (
          <Popover content={content} trigger="click">
            <section className={s.date_wrapper}>
              <section className={s.lower}>{formatNumber}</section>
              <section className={s.upper}>
                <small>{transformNumber}</small>
              </section>
            </section>
          </Popover>
        );
      };
    }
  });

  return proColumns;
};

export default numberHandle;
