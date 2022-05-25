/*
 * 本地存储时， 对应存储变量的key值
 * */
enum storageKeys {
  // 用户 token
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  // 登录过期时长
  EXPIRES_IN = 'EXPIRES_IN',
  // 用户信息
  ACCOUNT_INFO = "ACCOUNT_INFO",
  // 用户菜单
  ACCOUNT_MENU = "ACCOUNT_MENU",
  // 平展菜单
  FLATTENED_MENU = "FLATTENED_MENU",
  // 用户权限
  ACCOUNT_PERMISSION = "ACCOUNT_PERMISSION"
}

export { storageKeys };
