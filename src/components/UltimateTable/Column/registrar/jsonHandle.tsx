/*
 * 处理表格中一些 json 格式的字段
 * */

import type { registrarFun } from '@/components/UltimateTable/Column';
import JSONTree from 'react-json-tree';
import { jsonViewTheme } from '@/components/UltimateTable/basicConfig';

const jsonHandle: registrarFun = (proColumns) => {
  proColumns.forEach((col) => {
    if (col?.json) {
      col.align = 'left';
      col.copyable = false;
      col.search = false;
      col.render = (dom) => {
        let temp: any;
        try {
          temp = JSON.parse(dom as string);
        } catch (e) {
          temp = dom;
        }

        return <JSONTree data={temp} theme={jsonViewTheme} />;
      };
    }
  });

  return proColumns;
};

export default jsonHandle;
