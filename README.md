# 耳畔语音中后台标准模板项目

## 1. 安装项目

```bash
yarn
```



## 2. 启动项目

```bash
start:dev
```



## 3. 打包应用

```bash
# 测试环境
build:dev

# 生产环境
build:prod
```



## 4. 项目结构

```tex
├─config
│  │  config.dev.ts					测试环境配置文件
│  │  config.ts						正式环境配置文件
│  │  defaultSettings.ts			项目配置文件
│  │  proxy.ts						项目代理文件
│  │  routes.ts						项目路由文件
│  │  
│  └─routesModule					路由分组
│          basic.ts					项目基础路由 勿动
│          others.ts				项目其他路由文件
│                  
├─public							公共文件夹 不要动就好了
│  │  CNAME
│  │  favicon.ico
│  │  logo.png
│  │  logo.svg
│  │  pro_icon.svg
│  │  
│  └─icons
│          icon-128x128.png
│          icon-192x192.png
│          icon-512x512.png
│          
└─src								项目开发文件夹
    │  access.ts					权限控制
    │  app.tsx						项目入口
    │  global.less					全局样式文件
    │  global.tsx					勿动	【如有真实需求可改】
    │  service-worker.js			WS 文件  【勿动】
    │  typings.d.ts					全局类型定义文件
    │  
    ├─components					组件文件夹
    │  │  XzUpload.tsx				文件上传组件
    │  │  
    │  ├─Footer						页脚 【项目暂时不用， 可以删除】
    │  │      index.tsx
    │  │      
    │  ├─HeaderDropdown				页头 【可根据项目需要修改】
    │  │      index.less
    │  │      index.tsx
    │  │      
    │  ├─RightContent				页头右侧个人信息组件
    │  │      AvatarDropdown.tsx
    │  │      index.less
    │  │      index.tsx
    │  │      
    │  ├─UltimateRichText			终极文本 【使用 wangEditor】
    │  │  │  index.tsx		
    │  │  │  
    │  │  └─config
    │  │          editor.ts			editor 配置文件
    │  │          toolbar.ts		editor toolbar 配置文件
    │  │          
    │  ├─UltimateTable				终极表格 【具体使用方法会在 wiki 中单独阐述】
    │  │  │  basicConfig.ts
    │  │  │  index.tsx
    │  │  │  type.ts
    │  │  │  utils.ts
    │  │  │  
    │  │  ├─Column
    │  │  │  │  index.ts
    │  │  │  │  
    │  │  │  └─registrar
    │  │  │      │  genderHandle.ts
    │  │  │      │  imgHandle.tsx
    │  │  │      │  jsonHandle.tsx
    │  │  │      │  operatingHandle.tsx
    │  │  │      │  selectHandle.ts
    │  │  │      │  videoHandle.tsx
    │  │  │      │  
    │  │  │      ├─dateHandle
    │  │  │      │      index.less
    │  │  │      │      index.tsx
    │  │  │      │      
    │  │  │      └─numberHandle
    │  │  │              index.less
    │  │  │              index.tsx
    │  │  │              
    │  │  ├─components
    │  │  │      DelButton.tsx
    │  │  │      
    │  │  ├─handle
    │  │  │      detachProps.tsx
    │  │  │      rowSelection.tsx
    │  │  │      
    │  │  └─request
    │  │      │  getTableData.ts
    │  │      │  
    │  │      └─convertParams
    │  │          │  index.ts
    │  │          │  
    │  │          └─coverts
    │  │                  createdAt.ts
    │  │                  
    │  └─XzButton
    │          index.tsx
    │          
    ├─constantPool							项目常量
    │  │  COLORS.ts							颜色值常量 （请根据固定需要使用）
    │  │  COMMON.ts							公共项目常量
    │  │  HTTP_CODE.ts						HTTP_CODE 常量 【勿动】
    │  │  OSS_DIRS.ts						OSS 上传文件夹分组 【勿动】
    │  │  REQUEST_CUSTOMIZE_OPTIONS.ts		自定义请求选项文件夹 仅定义使用
    │  │  SIZE.ts							项目中对元素大小尺寸的定义
    │  │  STORAGE_KEYS.ts					本地存储 Key 值常量
    │  │  TABLE_FORM.ts						【待删除】
    │  │  
    │  └─selector							项目中下拉列表文件夹
    │          PRIZE_POOL.ts
    │          USER_TAG.ts
    │          
    ├─experiment							实验属性 【由此做一些新功能的开发】
    │  └─ButtonGroup
    │          index.less
    │          index.tsx
    │          
    ├─HOC									高阶组件
    │      withForm.tsx						常见表格的添加，修改工具 【具体使用方法会在 wiki 中单独阐述】
    │      
    ├─Model									全局数据流
    │      userInfo.ts						demo 【可删除】
    │      
    ├─pages									项目页面文件夹
    │  │  404.tsx							404 页面 【勿动】
    │  │  Auth.ts							页面权限文件 【接入鉴权系统权限使用】
    │  │  document.ejs						模板 html 页面，此文件可直接修改打包后的html原型
    │  │  
    │  ├─Dashboard							仪表盘页， 首页
    │  │      index.tsx
    │  │      
    │  └─user								用户分组
    │      └─Login							登录页面
    │              index.less
    │              index.tsx
    │              
    ├─services								请求文件夹
    │      common.ts						公共请求文件夹
    │      typings.d.ts						类型文件
    │      
    └─utils									公共文件夹
        │  communal.tsx						公共工具 【tsx】
        │  date.ts							时间工具
        │  flattenMenu.ts					展平菜单工具 【勿动】
        │  index.ts							公共工具 【ts】
        │  momentConfig.ts					moment 库 配置
        │  ossProvider.ts					oss 上传工具
        │  pieChartConfig.ts				饼图基本配置
        │  storage.ts						本地存储加密工具
        │  
        ├─netInterceptors					拦截器
        │  └─request						请求拦截器	
        │          noFalseValue.ts			消除假值 
        │          withToken.ts				携带token
        │          
        └─request							项目请求封装
                index.ts
```



