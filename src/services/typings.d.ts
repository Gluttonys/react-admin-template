// @ts-ignore
/* eslint-disable */

declare type API_WRAPPER<T> = Promise<{
  code: number,
  message: string,
  result: T
}>

declare type ObjectFalse = Record<string, any> | null

declare namespace API {

  /** 登录token */
  type AccessToken = {
    accessToken: string,
    expiresIn: number
  }

  /** 用户信息 */
  type UserInfo = {
    avatar: string
    company: ObjectFalse
    companyId: string
    department: ObjectFalse
    departmentId: string
    email: string
    id: string
    lastLoginAt: string
    lastLoginIp: string
    mobile: string
    name: string
    nickname: string
    realname: string
    roles: ObjectFalse
    status: boolean
  };

  /** 权限 */
  type Permission = {
    id: number;
    name: string;
    display_name: string;
  };

  /** 公司信息 */
  type CompanyInformation = {
    address: string
    createdAt: string
    fullname: string
    id: string
    logo: string
    name: string
    parentId: string
    telephone: string
    updatedAt: string
  };


  /** 下拉列表 */
  type SelectList = Select[]

  /** 公司下拉列表 */
  type CompanyTree = Select[];

  type Select = {
    id: string;
    label: string;
    title: string;
    children?: Select[];
  }

  type CompanyInfo = {
    parentId?: number;
    fullname: string;
    name: string;
    logo: string;
    telephone: string;
    address: string;
  };

  /*
   * 项目
   * */
  type Project = {
    id: number;
    name: string;
    icon: string;
    url: string;
  };

  /*
   * 项目列表
   * */
  type ProjectList = Project[];

  /*
   * 分页参数
   * */
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  /*
   * 兼容分页参数
   * */
  type Pagination = {
    page?: number;
    perPage?: number;
  };
}
