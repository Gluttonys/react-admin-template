/**
 * @desc 所有页面的操作权限定义
 */

/** 公司管理 */
type CompanyManagement = "company:add"
  | "company:update"
  | "company:del"


/** 部门管理 */
type DepartmentManagement = "department:add"
  | "department:update"
  | "department:del"


/** 角色管理 */
type RoleManagement = "role:add"
  | "role:update"
  | "role:del"


/** 员工管理 */
type StaffManagement = "staff:add"
  | "staff:update"
  | "staff:del"


/** 应用管理 */
type ApplicationManagement = "app:add"
  | "app:update"
  | "app:del"


/** 菜单管理 */
type MenuManagement = "menu:add"
  | "menu:update"
  | "menu:del"


declare type Auth = CompanyManagement
  | DepartmentManagement
  | RoleManagement
  | StaffManagement
  | ApplicationManagement
  | MenuManagement

