import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Alert} from 'antd';
import {history, useModel} from 'umi';
import React, {Fragment, useEffect, useState} from 'react';
import {LoginForm, ProFormText} from '@ant-design/pro-form';
import styles from './index.less';
import {getAccountInfo, getAccountMenu, getAccountPermission, login} from '@/services/common';
import {sessionStorageSetItem} from '@/utils/storage';
import {storageKeys} from '@/constantPool/STORAGE_KEYS';
import {getQueryObj, NOOP} from '@/utils/communal';
import {findFirstUsableMenu, flattenMenu} from "@/utils/flattenMenu";
import {LOGO} from "@/constantPool/COMMON";

type Status = "success" | "error"

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (<Alert style={{marginBottom: 24,}} message={content} type="error" showIcon/>);

const Login: React.FC = () => {
  /** 用户登录状态 */
  const [userStatus, setUserStatus] = useState<Status>("success")
  const {setInitialState, initialState} = useModel('@@initialState');

  /** 获取项目信息 */
  const getProjectInfo = async (access_token: string, expires_in: number = 86400) => {
    try {
      /** 本地保存值 */
      sessionStorageSetItem(storageKeys.ACCESS_TOKEN, access_token);
      const expiresUp = Date.now() + expires_in * 1e3;
      sessionStorageSetItem(storageKeys.EXPIRES_IN, `${expiresUp}`);

      /** 获取用户相关接口 */
      const {result: account_info} = await getAccountInfo();
      const {result: {list: account_menu}} = await getAccountMenu();

      const {result: {list: account_permission}} = await getAccountPermission();
      /**
       * 菜单平展
       *   方便后续计算权限菜单
       *   src/utils/flattenMenu.ts
       * */
      const flattenedMenu = flattenMenu(account_menu);
      await setInitialState((s) => ({
        ...s,
        userInfo: account_info,
        userMenus: account_menu,
        userPermission: account_permission,
        flattenedMenu: flattenedMenu,
      }));

      /*
       * 本地存储相关数据
       * */
      setUserStatus("success")
      await sessionStorageSetItem(storageKeys.ACCOUNT_INFO, JSON.stringify(account_info));
      await sessionStorageSetItem(storageKeys.ACCOUNT_MENU, JSON.stringify(account_menu));
      await sessionStorageSetItem(storageKeys.FLATTENED_MENU, JSON.stringify(flattenedMenu));
      await sessionStorageSetItem(
        storageKeys.ACCOUNT_PERMISSION,
        JSON.stringify(account_permission),
      );

      const firstUsableMenu = findFirstUsableMenu(account_menu);
      history.push(firstUsableMenu || '/404');
    } catch (e) {
      throw new Error('登录失败');
    }
  };

  type LoginParams = {
    email: string,
    password: string
  }

  /**
   * @desc 登录操作
   * */
  const handleSubmit = async (values: LoginParams) => {
    try {
      const openPermission = initialState?.openPermission;
      if (!openPermission) return history.push('/dashboard');

      const {email, password} = values

      /** 调取登录接口 */
      const {
        result: {accessToken, expiresIn},
      } = await login(email, password);

      /** 获取项目信息 */
      await getProjectInfo(accessToken, expiresIn);
    } catch (e: any) {
      setUserStatus('error')
    }
  };

  const onFinish = async (value: Record<string, any>) => {
    await handleSubmit(value as LoginParams);
  }

  /** 尝试获取token自动登录 */
  useEffect(() => {
    const {token} = getQueryObj();
    if (token) getProjectInfo(token).catch(NOOP);
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={LOGO}/>}
          title="耳畔XXXXXXX平台"
          subTitle={'杭州耳畔科技有限公司， 耳畔还不知道啥平台'}
          onFinish={onFinish}
        >
          {userStatus === 'error' && <LoginMessage content={'错误的用户名和密码'}/>}
          <Fragment>
            <ProFormText
              name="email"
              fieldProps={{size: 'large', prefix: <MailOutlined className={styles.prefixIcon}/>}}
              placeholder="请输入用户名"
              rules={[{required: true, message: '用户名是必填项！'}]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{size: 'large', prefix: <LockOutlined className={styles.prefixIcon}/>}}
              placeholder="请输入密码"
              rules={[{required: true, message: '密码是必填项！'}]}
            />
          </Fragment>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
