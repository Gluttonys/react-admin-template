/**
 * @author 如意虎头鞋
 * @date 2022/3/17
 * */


import React from "react";
import type {ModalFormProps} from "@ant-design/pro-form";
import XzButton from "@/components/XzButton";
import COLORS from "@/constantPool/COLORS";
import {request} from "umi";
import {message} from "antd";
import {getFileNameByOSSPath} from "@/utils/communal";
import type {ActionType} from "@ant-design/pro-table";

export type WithFormOptions = {
  /** 提交表单的地址 */
  uri: string,
  prefix?: string
}

export type EnhanceForm = {
  /** 按钮名称 */
  buttonName?: string,
  /** 新增表单还是编辑表单 */
  type: "edit" | 'add',
  /** 编辑表单时， 需要提供记录对象 */
  entity?: Record<string, any>,
  /** 当记录实体中包含图片上传字段时候， 填写指定字段，组件自动帮转图片对象， 做编辑回显使用 */
  entityimgtransform?: string[],
  /** 表格快捷方法对象， 提供刷新重置表格等操作 */
  actions: ActionType | undefined
} & ModalFormProps

const withForm = (FormComponent: React.FC<EnhanceForm>, options: WithFormOptions) => {
  const {uri, prefix} = options

  const WrapperComp: React.FC<EnhanceForm> = (props) => {
    const {type, entity, entityimgtransform, actions, buttonName, ...restRawFormProps} = props

    /** 处理表单title */
    let title: string = buttonName || "新增记录"
    let triggerBtn = <XzButton background={COLORS.SUCCESS}>{title}</XzButton>

    if (type === 'edit') {
      title = buttonName || "编辑"
      triggerBtn = <XzButton background={COLORS.EDIT}>{title}</XzButton>
    }

    /** 处理计算表单默认值 */
    const computedEntity = async (rawData: Record<string, any>): Promise<Record<string, any>> => {

      const _rawData = JSON.parse(JSON.stringify(rawData))

      /**
       * @desc 有需要转换的图片表单
       * @example ['icon', 'avatar']
       * */
      if (entityimgtransform && entityimgtransform.length) {
        entityimgtransform.forEach((transKey: string) => {
          const entityTransKeyValue = entity?.[transKey];

          if (typeof entityTransKeyValue === 'string') {
            _rawData[transKey] = [
              {
                name: getFileNameByOSSPath(entityTransKeyValue),
                url: entityTransKeyValue,
              },
            ];
          } else if (Array.isArray(entityTransKeyValue)) {
            _rawData[transKey] = entityTransKeyValue.map((ossFilePath: string) => {
              return {
                name: getFileNameByOSSPath(ossFilePath),
                url: ossFilePath,
              };
            });
          }
        });
      }
      return _rawData
    }


    /** 处理表单提交 */
    const onFinish = async (values: Record<string, any>) => {
      const requestUrl = (type === 'add' ? uri : `${uri}/${entity?.id}`);
      const method = (type === 'add' ? 'post' : 'put');

      // @ts-ignore
      const _action = actions?.current ? actions.current : actions;

      try {
        await request(requestUrl, {method, data: {...values}, prefix: prefix || BASE_URL});
        _action.reload();
        return true;
      } catch (e) {
        console.error(e);
        message.error('出了点问题！');
        return false;
      }
    };

    /** footer 按钮配置 */
    const submitter: ModalFormProps['submitter'] = {
      searchConfig: {
        submitText: "提交",
        resetText: "取消"
      },
      render: ((submitterProps, defaultDoms) => {
        return [
          <XzButton key="reset" background={COLORS.RESET} onClick={() => submitterProps.reset()}>重置表单</XzButton>,
          ...defaultDoms,
        ]
      })
    }

    /** 基础表单属性 */
    const baseFormProps: ModalFormProps = {
      title,
      onFinish,
      submitter,
      /** 初始化表单只存在于 编辑表单中 */
      request: entity ? () => computedEntity(entity || {}) : undefined,
      trigger: triggerBtn,
      omitNil: true,
      autoFocusFirstInput: true,
      isKeyPressSubmit: true,
    }

    /**
     * @ 扩展属性
     * @type {{entityimgtransform: string[] | undefined, type: "edit" | "add", actions: any, entity: Record<string, any> | undefined}}
     */
    const expandProps: EnhanceForm = {
      type,
      actions,
      entityimgtransform,
      entity: entity ? entity : undefined
    }

    return <FormComponent {...expandProps} {...restRawFormProps} {...baseFormProps}/>
  }

  return WrapperComp
}

export default withForm

