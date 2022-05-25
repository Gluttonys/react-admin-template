// https://umijs.org/config/
import {defineConfig} from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    BASE_URL: 'http://manage.deprecated.dev.imechos.com',
    COMM0N_API: 'http://public.dev.imechos.com',
    JURISDICTION_API: 'http://game-lottory-api3-dev.imechos.com',
    PROJECT_ID: 555
  },
});
