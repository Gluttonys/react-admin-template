import {sessionStorageGetItem} from '@/utils/storage';
import {storageKeys} from '@/constantPool/STORAGE_KEYS';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

export default function access(initialState: {
  flattenedMenu: string[];
  userPermission: string[];
  openPermission: boolean;
}) {
  let flattenedMenu: string[] = [];

  // 获取内容中的缓存值
  flattenedMenu = initialState.flattenedMenu;
  const {openPermission} = initialState;

  // 尝试获取本地存储的值
  if (flattenedMenu.length === 0)
    flattenedMenu = JSON.parse(sessionStorageGetItem(storageKeys.FLATTENED_MENU) || '[]');

  let userPermissions: string[] = initialState.userPermission;
  if (userPermissions.length === 0)
    userPermissions = JSON.parse(sessionStorageGetItem(storageKeys.ACCOUNT_PERMISSION) || '[]');

  return {
    /* 是否能正确进入页面 */
    canEnter: (router: { path: string }): boolean => {
      /* 如果关闭权限， 则路由不设置拦截 */
      if (!openPermission) return true;

      const {path} = router;
      return flattenedMenu.includes(path);
    },
    /*
     * 元素权限
     * 页面元素是否可见
     * */
    canVisible: (permission: Auth): boolean => {
      /* 如果关闭权限， 则路由不设置拦截 */
      if (!openPermission) return true;
      return userPermissions.includes(permission);
    },
  };
}
