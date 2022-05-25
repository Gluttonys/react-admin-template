import type { registrarFun } from '@/components/UltimateTable/Column';
import { find } from 'lodash';
import type { ReactNode } from 'react';
import React from 'react';
import { Space } from 'antd';
import { Access, useAccess } from 'umi';
import { DelButton } from '@/components/UltimateTable/components/DelButton';

const useOperatingHandle: registrarFun = (proColumns, props) => {
  const access = useAccess();

  const option = props?.option;

  /** 如果开发者没有自己写操作列，则为其手动添加操作列 */
  if (!find(proColumns, { title: '操作' }) && option) {
    proColumns.push({
      title: '操作',
      valueType: 'option',
      align: 'center',

      render: (dom: ReactNode, entity: any, index: number, action: any) => {
        const edit = option.edit;
        const editForm = option.editForm;
        const del = option.delete;

        let btns: React.ReactNode[] = [];
        if (option.buttons) btns = option.buttons(dom, entity, index, action);

        return (
          <Space>
            {btns.map((button) => button)}

            {edit && editForm?.(entity, action)}

            {del && (
              <Access accessible={access.canVisible(option.delete_permission as string)}>
                <DelButton delUri={del} entity={entity} action={action} />
              </Access>
            )}
          </Space>
        );
      },
    });
  }

  return proColumns;
};

export default useOperatingHandle;
