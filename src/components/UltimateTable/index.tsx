/**
 * @desc 终极表格
 * @author 如意虎头鞋
 *
 * @see 【github_fouber_blog】 github大神 fouber 关于前端工程，组件设计一文
 *
 * @link https://github.com/fouber/blog/issues/10
 *
 * @desc 设计思路
 * 1. 页面上的每个 独立的 可视/可交互区域视为一个组件；
 * 2. 每个组件对应一个工程目录，组件所需的各种资源都在这个目录下就近维护；
 * 3. 由于组件具有独立性，因此组件与组件之间可以 自由组合；
 * 4. 页面只不过是组件的容器，负责组合组件形成功能完整的界面；
 * 5. 当不需要某个组件，或者想要替换组件时，可以整个目录删除/替换。
 *
 * */

import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Card, Table} from 'antd';
import React, {useRef} from 'react';
import {UltimateTableProps} from '@/components/UltimateTable/type';
import renderContextProvider from './handle/rowSelection';
import getContainerProps from './handle/detachProps';
import Column from '@/components/UltimateTable/Column';

import getTableData from './request/getTableData';

const UltimateTable: React.FC<UltimateTableProps> = (props) => {
  const {beforeTable, afterTable, list, columns, mode, selection} = props;
  const tableAction = useRef<ActionType>();

  /** 增强 columns */
  const enhanceColumns = new Column(columns, props).getColumn();
  /** 请求加载数据 */
  const getDataRequest = getTableData(list);
  /** 拆分两个组件属性 */
  const [containerProps, tableProps] = getContainerProps(props);


  const __Table = <ProTable
    bordered
    rowKey="id"
    rowSelection={ selection ? {selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]} : false}
    tableAlertOptionRender={ renderContextProvider(props, tableAction)}
    actionRef={tableAction}
    request={getDataRequest}
    columns={enhanceColumns}
    {...tableProps}
  />

  if (mode === 'withOut') {
    return __Table
  } else {
    return (
      <PageContainer fixedHeader {...containerProps}>
        {Array.isArray(beforeTable) ? beforeTable.map((component) => component) : beforeTable}
        <Card>
          {__Table}
        </Card>
        {Array.isArray(afterTable) ? afterTable.map((component) => component) : afterTable}
      </PageContainer>
    );
  }
};

export {UltimateTable, UltimateTableProps};
