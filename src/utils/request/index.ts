import type {RequestConfig} from "@@/plugin-request/request";
import withToken from "@/utils/netInterceptors/request/withToken";
import noFalseValue from "@/utils/netInterceptors/request/noFalseValue";
import {history} from "@@/core/history";
import {notification} from "antd";
import HTTP_CODE from "@/constantPool/HTTP_CODE";

const request: RequestConfig = {
  timeout: 5E+3,
  errorConfig: {
    errorPage: './404',
  },
  middlewares: [],
  requestInterceptors: [withToken, noFalseValue],
  responseInterceptors: [],

  // todo <开发模式>针对与错误的请求， 请默认复制错误日志地址到剪切板
  errorHandler: (error: any) => {
    try {
      const status = error.response?.status || 500;
      if (status === 401) {
        notification.error({
          description: "您需要重新登录，发生这种情况的可能原因是因为您的登录过期了，" +
            "亦或您没有权限查看某项内容。我们做了最坏的处理，使您重新登录该系统。",
          message: "无权限",
        });
        return history.replace('/user/login')
      }

      const message = error.data?.message;

      notification.error({
        description: `${status} -- ${HTTP_CODE[`HTTP_${status}`]}`,
        message: message || '发生了点错误',
      });
    } catch (e) {
      console.error(e)
      throw error;
    }
  },
  prefix: BASE_URL,
};

export default request
