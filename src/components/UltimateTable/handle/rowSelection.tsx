import type {UltimateTableProps} from '@/components/UltimateTable';
import {message, Space} from 'antd';
import XzButton from '@/components/XzButton';
import COLORS from '@/constantPool/COLORS';
import {DeleteOutlined} from '@ant-design/icons';
import {request} from 'umi';
import type {ActionType} from "@ant-design/pro-table";
import type {AlertRenderType} from "@ant-design/pro-table/es/components/Alert";
import React from "react";

/** 批量删除操作 */
const handleBatchDel = async (selectedRowKeys: any[], tableAction: React.MutableRefObject<ActionType | undefined>, uri: string) => {
  try {
    await request(uri, {
      method: 'delete',
      data: {
        ids: selectedRowKeys,
      },
    });

    await tableAction.current?.reload()
    message.success('操作成功！');
  } catch (e) {
    message.error('操作失败');
  }
};


const renderContextProvider = (tableProps: UltimateTableProps, tableAction: React.MutableRefObject<ActionType | undefined>) => {

  const {selection} = tableProps
  const tableAlertOptionRender: AlertRenderType<any> = ({intl, selectedRowKeys, selectedRows, onCleanSelected}) => {


    return (
      <Space>
        {
          selection?.batchDel &&  (
            <XzButton
              onClick={() => handleBatchDel(selectedRowKeys, tableAction, selection?.batchDel as string)}
              background={COLORS.DANGER}
              key="delete">
              <DeleteOutlined/> 批量删除
            </XzButton>
          )
        }
      </Space>
    )
  }

  return tableAlertOptionRender
}

export default renderContextProvider;
