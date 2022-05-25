import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  // splitMenus: true,
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '修真XXXXXXX平台',
  pwa: false,
  logo: 'https://imechos-dev.oss-cn-hangzhou.aliyuncs.com/default/avatar/1.png',
  iconfontUrl: '',
  footerRender: false,
};

export default Settings;
