import type {registrarFun} from '@/components/UltimateTable/Column';
import type {proColumns} from '@/components/UltimateTable/type';
import {Image} from "antd";

/** 处理表格中列的图片字段 */
const imgHandle: registrarFun = (proCols: proColumns): proColumns => {
  proCols.forEach((col) => {
    if (col?.img) {

      col.search = false;
      col.copyable = false;
      col.render = (dom, columns, _, __, cc) => {
        let src = '';
        if (typeof cc.dataIndex === 'string') {
          src = columns?.[cc.dataIndex as string];
        } else if (Array.isArray(cc.dataIndex)) {
          src = cc.dataIndex.reduce((pre, cur) => pre[cur], columns);
        }

        return <Image src={src} alt={src} width={120}/>;
      };
    }
  });

  return proCols;
};

export default imgHandle;
