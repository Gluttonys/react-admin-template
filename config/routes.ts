import basic from './routesModule/basic';
import others from './routesModule/others';

export default [
  {
    path: '/dashboard',
    name: '首页',
    icon: 'DashboardOutlined',
    component: './Dashboard',
    access: 'canEnter',
  },
  ...others,
  ...basic,
];
