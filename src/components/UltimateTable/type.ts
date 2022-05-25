import type {ProColumns, ProTableProps} from '@ant-design/pro-table';
import type {PageContainerProps} from '@ant-design/pro-layout';
import type SIZE from '@/constantPool/SIZE';
import type React from 'react';

type SelectUrl = string
type SelectOption = {
  url: string,
  prefix?: string,
  params?: Record<string, any>
}

/**
 * 重写 Columns 属性
 * @type ProColumns
 */
type proColumns = (ProColumns & {
  /** 处理表格中的图片 */
  img?: SIZE | boolean;
  /** 处理视频内容 */
  video?: SIZE | boolean;
  /** 处理数字信息 */
  number?: boolean;
  /** 处理时间显示字段 */
  date?: boolean;
  /** json 类型数据 */
  json?: boolean;
  /** 性别类型数据 */
  gender?: boolean;
  /** 列的搜索选项 （需要异步拿取数据的请求接口地址） */
  selectOptionUrl?: SelectUrl | SelectOption;
})[];

type customizeTableProps = {
  list: string;
  /** 是否携带外边框 true: 携带。 false: 不携带  */
  mode?: "with" | 'withOut',
  /** 是否开启多选功能 */
  selection?: {
    /** 批量删除接口 uri */
    batchDel?: string;
  };
  /** 批量新增 */
  batchAddNew?: string;
  /** 批量删除 */
  batchDelete?: string;

  /** 表格上部扩展 */
  beforeTable?: React.ReactNode | React.ReactNode[];
  afterTable?: React.ReactNode | React.ReactNode[];
  columns: proColumns;
};

/* 表格参数 */
type UltimateTableProps = ProTableProps<any, any> & PageContainerProps & customizeTableProps;

export {proColumns, UltimateTableProps, customizeTableProps, SelectUrl, SelectOption};
