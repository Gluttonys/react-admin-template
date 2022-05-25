export default (url: string, options: any) => {
  const { params } = options;

  const resultParams = {};

  Object.keys(params).forEach((key) => {
    /* 去除空字符串 */
    if (typeof params[key] === 'string' && params[key].trim() === '') return;
    resultParams[key] = params[key];
  });

  options.params = resultParams;

  return { options };
};
