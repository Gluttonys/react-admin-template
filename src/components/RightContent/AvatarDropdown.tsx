import React, {useCallback} from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {Avatar, Menu} from 'antd';
import {history, useModel} from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import s from './index.less';
import type {MenuInfo} from 'rc-menu/lib/interface';
import {cc} from "@/utils";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/** 退出登录 */
const loginOut = async () => {
  /* 清除本地信息 */
  sessionStorage.clear();
  localStorage.clear();
  if (window.location.pathname !== '/user/login') {
    history.replace("/user/login");
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const {initialState, setInitialState} = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        /** 清除用户信息 */
        setInitialState((s: any) => ({...s, userInfo: {}})).catch();
        loginOut().catch()
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const menuHeaderDropdown = (
    <Menu className={s.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined/>
        退出登录
      </Menu.Item>
    </Menu>
  );

  const userInfo = initialState?.userInfo;

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={cc(s.action, s.account)}>
        <Avatar size="small" className={s.avatar} src={userInfo?.avatar} alt="avatar"/>
        <span className={cc(s.name, "anticon")}>{userInfo?.nickname}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
