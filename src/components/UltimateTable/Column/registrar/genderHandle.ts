/*
 * 用于常见的表格中的性别显示问题
 * */

import type { registrarFun } from '@/components/UltimateTable/Column';
import { getGenderTag } from '@/utils/communal';

const genderHandle: registrarFun = (proColumns) => {
  proColumns.forEach((col) => {
    if (col?.gender) {
      col.title = '性别';
      col.render = getGenderTag;
    }
  });

  return proColumns;
};

export default genderHandle;
