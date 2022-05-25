/**
 *
 * @desc 针对一些未作转换的参数在请求时， 做出转换
 *
 * @desc 转换处理器
 *
 * @example
 *    ```
 *      const covert = new ConvertParams({name: "xie"})
 *      covert
 *        .convert(注册程序)
 *        .convert(注册程序)
 *        .convert(注册程序)
 *        .getConvertParams()
 *    ```
 */
class ConvertParams {
  /** 待转换的参数 */
  __params: Params = {};

  constructor(params: Params) {
    this.__params = params;
  }

  convert(handle: CovertFun) {
    this.__params = handle.call(this, this.__params);
    return this;
  }

  getParams() {
    return this.__params;
  }
}

export type Params = Record<string, any>;
export type CovertFun = (params: Params) => Params;

export default ConvertParams;
