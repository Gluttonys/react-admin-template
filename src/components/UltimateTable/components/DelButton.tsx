import { request } from 'umi';
import type {ButtonProps} from 'antd';
import {Button, message, Popconfirm} from 'antd';
import { useBoolean } from 'ahooks';
import { DeleteOutlined } from '@ant-design/icons';

import React from "react";

type DelButtonProps = {
  /** @desc 删除请求地址 */
  delUri: string;
  /** @desc 记录实体 */
  entity: any;
  /**
   * @desc 表格事件对象
   * todo ProCoreActionType 类型找不到
   * */
  action: any;
  prefix?: string
} & ButtonProps

const DelButton: React.FC<DelButtonProps> = (props) => {
  const { delUri, entity, action, prefix, ...restButtonProps } = props;

  /** 记录ID */
  const recordID: string | number = `${entity?.id}`;
  const [visible, { setTrue: setVisibleTrue, setFalse: setVisibleFalse }] = useBoolean(false);

  const handleToDel = async () => {
    try {
      await request(`${delUri}/${recordID}`, { method: 'delete', prefix: prefix || BASE_URL});
      message.success('删除成功！');
    } catch (e) {
      message.error('删除失败~');
    } finally {
      await action.reload();
      setVisibleFalse();
    }
  };

  return (
    <Popconfirm
      visible={visible}
      title={`确认删除记录ID为 ${recordID} 的记录？`}
      onConfirm={handleToDel}
      onCancel={setVisibleFalse}
      okText="确定"
      cancelText="取消"
    >
      <Button danger type="primary" onClick={setVisibleTrue} {...restButtonProps}>
        <DeleteOutlined /> 删除
      </Button>
    </Popconfirm>
  );
};

export { DelButton, DelButtonProps };
