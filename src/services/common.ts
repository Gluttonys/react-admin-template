/*
 * 存放公共请求
 *   如用户登录退出操作
 *  */
import {request} from 'umi';

/**
 * 图片上传 阿里 oss
 * */
export async function ossSts() {
  return request('/api/oss/sts', {
    method: 'post',
    prefix: COMM0N_API,
  });
}

/**
 * 鉴权用户登录接口
 * @param {string} email 用户邮箱
 * @param {string} password 用户密码
 * @return {Promise<any>}
 */
export async function login(email: string, password: string): API_WRAPPER<API.AccessToken> {
  return request('/account/signin', {
    method: 'post',
    prefix: JURISDICTION_API,
    data: {
      email,
      password
    },
  });
}

/** 获取账号信息 */
export async function getAccountInfo(): API_WRAPPER<API.UserInfo> {
  return request('/account/info', {
    prefix: JURISDICTION_API,
  });
}

/*
 * 获取用户菜单
 * */
export async function getAccountMenu() {
  return request('/account/menu', {
    prefix: JURISDICTION_API,
    params: {
      project_id: PROJECT_ID,
    },
  });
}

/*
 * 获取用户权限
 * */
export async function getAccountPermission() {
  return request('/account/permission', {
    prefix: JURISDICTION_API,
    params: {
      projectId: PROJECT_ID,
    },
  });
}
