import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import RightContent from '@/components/RightContent';
import {sessionStorageGetItem} from '@/utils/storage';
import {storageKeys} from '@/constantPool/STORAGE_KEYS';
import request from "@/utils/request";


import '@/utils/momentConfig';
// import '@/utils/console'
// import '@/plugin'


export const initialStateConfig = {
  loading: <PageLoading/>,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  userInfo?: API.UserInfo;
  userMenus?: [];
  userPermission?: [];
  flattenedMenu?: string[];
  openPermission?: boolean;
}> {
  /* 本地读取用户名和头像信息 */
  const userInfo = sessionStorageGetItem(storageKeys.ACCOUNT_INFO) || '{}';
  return {
    userInfo: JSON.parse(userInfo), /** 用户信息 */
    settings: {}, /** 全局设置 */
    userMenus: [], /** 用户可用菜单 */
    userPermission: [], /** 用户可用权限 */
    flattenedMenu: [], /** 平展用户菜单列表 */
    openPermission: true, /** 是否开启鉴权模式 */
  };
}


export const layout: RunTimeLayoutConfig = ({initialState}) => {
  const userInfo = initialState?.userInfo;
  const loginPath = '/user/login';

  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,

    waterMarkProps: {
      content: userInfo?.name,
    },
    onPageChange: () => {
      const openPermission = initialState?.openPermission;
      if (!openPermission) return;

      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!userInfo?.email && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

export {
  request
}
