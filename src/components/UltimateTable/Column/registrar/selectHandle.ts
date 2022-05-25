import type {registrarFun} from '@/components/UltimateTable/Column';
import {request} from 'umi';
import {convertData} from "@/utils";
import type {SelectOption} from "@/components/UltimateTable/type";

const selectHandle: registrarFun = (proColumns) => {
  proColumns.forEach((col) => {

    if (col.selectOptionUrl !== undefined) {
      const {valueType} = col
      col.valueType = valueType || 'cascader';

      if (typeof col.selectOptionUrl === 'string') {
        col.request = async () => {
          const {result: {list}} = await request(col.selectOptionUrl as string);
          return convertData(list)
        };
      } else {
        const {url, prefix, params} = col.selectOptionUrl as SelectOption

        col.request = async () => {
          const {result: {list}} = await request(url, {
            prefix,
            params
          });
          return convertData(list)
        };
      }
    }
  });

  return proColumns;
};

export default selectHandle;
