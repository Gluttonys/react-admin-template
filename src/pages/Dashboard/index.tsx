import {PageContainer} from '@ant-design/pro-layout';
import {Card, Form, Input} from 'antd';
import React from 'react';
import UltimateRichText from "@/components/UltimateRichText";
import ButtonGroup from "@/experiment/ButtonGroup";
import XzButton from "@/components/XzButton";
import type {UltimateTableProps} from "@/components/UltimateTable";
import {UltimateTable} from "@/components/UltimateTable";


const {Item} = Form

export default (): React.ReactNode => {

  const onFinish = (values: Record<string, any>) => {
    console.log(values)
  }

  const tableProps: UltimateTableProps = {
    list: '/',
    mode: 'withOut',
    columns: [
      {
        title: "用户编号",
        dataIndex: "no",
        search: false,
        copyable: true
      },
      {
        title: "用户ID",
        dataIndex: "id",
        copyable: true,
        selectOptionUrl: {
          url: '',
          prefix: ''
        }
      },
      {
        title: "设备ID",
        dataIndex: "id",
        search: false,
        copyable: true,
        filters: true,
        onFilter: true,
        valueEnum: (row: Record<string, any>) => {
          return row?.id
            ? {
              id: {
                text: 'xing'
              }
            }
            : {
              id: {
                text: 'buxing'
              }
            }
        },
      },
      {
        title: "IP",
        dataIndex: "ip",
        search: false,
        copyable: true,
        filters: true,
        onFilter: true,
        valueEnum: {
          "127.0.0.1": {
            text: '127.0.0.1'
          },
          "127.0.0.2": {
            text: '127.0.0.2'
          },
          "127.0.0.3": {
            text: '127.0.0.3'
          },
        },
      },
      {
        title: "用户昵称",
        dataIndex: "nick",
        search: false,
        copyable: true,
      },
      {
        title: "累计充值(人民币)",
        dataIndex: 'countRecharge',
        search: false,
        sorter: true,
      },
      {
        title: "累计登录天数",
        dataIndex: "countActive",
        search: false,
        sorter: true,
      },
      {
        title: "注册时间",
        dataIndex: "registerTime",
        search: false,
        date: true
      },
      {
        title: "注册时间",
        search: false,
        hideInTable: true,
        dataIndex: "createdAt",
        valueType: 'dateTimeRange'
      },
      {
        title: "邀请人",
        search: false,
        dataIndex: "inviteeName",
        copyable: true
      }
    ]
  }

  return (
    <PageContainer>
      <section className="grid grid-cols-4 gap-4">

        <Card title={<em>固定类别筛选</em>} className="col-span-4">
          <UltimateTable {...tableProps} />
        </Card>
        <Card title={<em>富文本编辑器</em>} className="col-span-3">
          <Form initialValues={{title: "默认文章标题"}} onFinish={onFinish}>
            <Item required rules={[{required: true, message: "请输入文章标题"}]} name="title" label="文章标题">
              <Input allowClear/>
            </Item>

            <Item required rules={[{required: true, message: '请输入文章内容'}]} name="content" label="文章内容">
              <UltimateRichText/>
            </Item>

            <Item>
              <XzButton type="primary" htmlType="submit">
                提交
              </XzButton>
            </Item>
          </Form>
        </Card>

        <Card className="col-span-1">

          <h2 className="text-red-400">🚀🚀🚀： 针对antd menu 报的警告信息</h2>
          <mark className="mb-4 block">
            Warning: [antd: Menu] `children` will be removed in next major version. Please use `items` instead.
          </mark>

          <a href="https://github.com/ant-design/pro-components/issues/5130">请查看Issues：
            https://github.com/ant-design/pro-components/issues/5130</a>
        </Card>

        <Card title={<em>按钮组样式问题</em>} className="col-span-2">
          <ButtonGroup/>
        </Card>


      </section>
    </PageContainer>
  );
};
