import type { registrarFun } from '@/components/UltimateTable/Column';
import type { proColumns } from '@/components/UltimateTable/type';
import SIZE from '@/constantPool/SIZE';
import { getSizeStyle } from '@/components/UltimateTable/utils';

/**
 * @desc 处理表格中列的视频字段
 * */
const videoHandle: registrarFun = (proCols: proColumns): proColumns => {
  proCols.forEach((col) => {
    if (col?.video) {
      const video: true | SIZE = col.video === true ? SIZE.NORMAL : col.video;

      col.search = false;
      col.copyable = false;
      col.render = (dom, columns, _, __, cc) => {
        let src = '';
        if (typeof cc.dataIndex === 'string') {
          src = columns?.[cc.dataIndex as string];
        } else if (Array.isArray(cc.dataIndex)) {
          src = cc.dataIndex.reduce((pre, cur) => pre[cur], columns);
        }

        // @ts-ignore
        return <video src={src} controls style={getSizeStyle(video as SIZE)} />;
      };
    }
  });

  return proCols;
};

export default videoHandle;
