import { Tag } from 'antd';
import COLORS from '@/constantPool/COLORS';

/**
 * @description 设置表格性别列信息
 * @param dom
 * @returns {JSX.Element}
 */
const getGenderTag = (dom: any) => {
  /* 性别标记 */
  const tempDomFlag = ~~dom;

  switch (tempDomFlag) {
    case 0:
      return <Tag color={COLORS.UPLOAD}>女性</Tag>;
    case 1:
      return <Tag color={COLORS.EDIT}>男性</Tag>;
    default:
      return <Tag color={COLORS.CONSIDER}>第三类性别</Tag>;
  }
};

/**
 * @description 获取query对象
 * @returns {Record<string, string>}
 */
const getQueryObj = (): Record<string, string> => {
  const queryObj: Record<string, string> = {};
  const queryList = location.search.slice(1).split('&');

  queryList.forEach((query) => {
    const [key, value] = query.split('=');
    queryObj[key] = decodeURIComponent(value);
  });

  return queryObj;
};

/**
 * @description 获取指定 key 的 query 参数
 * @param {string} key
 * @returns {string | undefined}
 */
const getQueryByKey = (key: string): string | undefined => {
  const queryObj = getQueryObj();
  return queryObj[key];
};

/**
 * @description 获取 OSS 文件地址的文件名
 * @param {string} ossPath
 * @returns {string}
 */
const getFileNameByOSSPath = (ossPath: string): string => {
  return ossPath.split('/').reverse()[0];
};

/**
 * @description 空方法
 * @constructor
 */
const NOOP = () => {};

export { getGenderTag, getQueryObj, NOOP, getQueryByKey, getFileNameByOSSPath };
