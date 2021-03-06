enum HTTP_CODE {
  HTTP_100 = '客户端继续其请求',
  HTTP_101 = '切换协议',
  HTTP_200 = '请求成功',
  HTTP_201 = '资源已创建',
  HTTP_202 = '资源已接收',
  HTTP_203 = '请求成功，非授权信息',
  HTTP_204 = '请求成功，无返回内容',
  HTTP_205 = '请求表单内容重置',
  HTTP_206 = '成功处理部分内容',
  HTTP_300 = '多种选择',
  HTTP_301 = '资源已被移动到别处',
  HTTP_302 = '资源已被临时移动到别处',
  HTTP_303 = '请尝试请求其他地址',
  HTTP_304 = '资源未被修改，请从缓存中读取数据',
  HTTP_305 = '请使用代理访问该资源',
  HTTP_306 = '该状态码已废弃，联系后端删除',
  HTTP_307 = '临时重定向，请使用get方式',
  HTTP_400 = '请求错误，服务器无法理解',
  HTTP_401 = '请求要求用户的身份验证，验证权限',
  HTTP_402 = '未开启使用的状态码',
  HTTP_403 = '服务器拒绝执行该请求',
  HTTP_404 = '服务器无法找到资源',
  HTTP_405 = '客户端请求方法被禁止',
  HTTP_406 = '服务器无法完成该请求',
  HTTP_407 = '请使用代理身份认证',
  HTTP_408 = '客户端超时',
  HTTP_409 = '服务器处理冲突',
  HTTP_410 = '客户端请求了已删除的接口',
  HTTP_411 = '字段缺失',
  HTTP_412 = '客户端请求信息的先决条件错误',
  HTTP_413 = '请求实体过大',
  HTTP_414 = '请求的URI过长',
  HTTP_415 = '服务器无法处理请求附带的媒体格式',
  HTTP_416 = '客户端请求的范围无效',
  HTTP_417 = '服务器无法满足Expect的请求头信息',
  HTTP_422 = '请求参数格式错误',
  HTTP_500 = '服务器内部错误',
  HTTP_501 = '服务器不支持请求的功能，无法完成请求',
  HTTP_502 = '充当网关或代理的服务器，从远端服务器接收到了一个无效的请求',
  HTTP_503 = '由于超载或系统维护，服务器暂时的无法处理客户端的请求',
  HTTP_504 = '充当网关或代理的服务器，未及时从远端服务器获取请求',
  HTTP_505 = '服务器不支持请求的http协议的版本，无法完成处理',
}

export default HTTP_CODE;
