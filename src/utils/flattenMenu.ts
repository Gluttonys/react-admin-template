/** 后台返回的菜单列表 */
type menuType = {
  id: number;
  name: string;
  route: string;
  style: string;
  children: menuType;
}[];

/**
 * @description 平展多级菜单
 * @param {menuType} account_menu
 * @returns {string[]}
 */
const flattenMenu = (account_menu: menuType): string[] => {
  const result: string[] = [];
  account_menu.forEach((menu) => {
    result.push(menu.route);
    if (menu.children) {
      result.push(...flattenMenu(menu.children));
    }
  });
  return result;
};

/**
 * @desc 查找第一个可用菜单
 * @param {menuType} account_menu
 * @returns {string}
 */
const findFirstUsableMenu = (account_menu: menuType): string => {
  let result: string = '';

  for (const accountMenu of account_menu) {
    if (!accountMenu.children) {
      /* 如果不存在子菜单 */
      result = accountMenu.route;
      return result;
    } else {
      result = findFirstUsableMenu(accountMenu.children);
    }
  }

  return result;
};

export { menuType, flattenMenu, findFirstUsableMenu };
