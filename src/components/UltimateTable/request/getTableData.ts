import {request} from '@@/plugin-request/request';
import type {SortOrder} from 'antd/es/table/interface';
import ConvertParams from '@/components/UltimateTable/request/convertParams';
import createdAt from './convertParams/coverts/createdAt';
import {filterListChildren} from "@/components/UltimateTable/utils";

/**
 * @desc 表格请求数据函数
 * @param {string} listRequestUrl 列表请求地址
 * @returns {(params: {pageSize: number, current: number}) =>
 *              Promise<{total: any, data: any, success: boolean} | {total: number, data: any[], success: boolean}>}
 */
const getTableData = (listRequestUrl: string) => {
  return async (params: { pageSize: number; current: number }, sort: Record<string, SortOrder>, filters: Record<string, any>) => {

    /** 排序项目操作 */
    const sortKey = Object.keys(sort)?.[0]
    const orderObj: Record<string, any> = {}
    if (sortKey) {
      orderObj.file = sortKey
      orderObj.order = sort[sortKey]
    }

    /** @bug get请求无法传递数组类型， 需要提前将数组转换为字符串类型 */
    const filterObj = Object.keys(filters).reduce((pre, curKey) => {
      if (Array.isArray(filters[curKey])) {
        pre[curKey] = JSON.stringify(filters[curKey])
      } else {
        pre[curKey] = filters[curKey]
      }
      return pre
    }, {})
    
    const {pageSize, current, ...restParams} = params;


    /** 转换参数 */
    const covert = new ConvertParams(restParams);
    const convertedRestParams = covert.convert(createdAt).getParams();

    try {
      console.time('列表数据请求时间');
      const {result: {list, total, ...annex}} = await request(listRequestUrl, {
        params: {
          page: current,
          perPage: pageSize,
          ...filterObj,             /** 筛选字段 */
          ...orderObj,              /** 排序字段 */
          ...convertedRestParams,   /** 剩余其他参数 */
        },
      });
      console.timeEnd('列表数据请求时间');

      /** 冗余列表附件信息到 列表项上 item */
      const __filterChildrenList = filterListChildren(list)
      if (Object.keys(annex).length) __filterChildrenList.forEach(item => item.annex = annex)

      return {
        data: __filterChildrenList,
        success: true,
        total: total || list.length,
      };
    } catch (e) {
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };
};

export default getTableData;
