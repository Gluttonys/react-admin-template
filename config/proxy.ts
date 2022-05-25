export default {
  dev: {
    '/api/': {
      target: 'http://manage.deprecated.dev.imechos.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/common/api/': {
      target: 'http://public.dev.imechos.leonsw.com',
      changeOrigin: true,
      pathRewrite: { '^/common': '' },
    },
  },
  test: {
    '/api/': {
      target: 'http://manage.deprecated.dev.imechos.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
