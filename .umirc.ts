import { defineConfig } from 'umi';
import path from 'path'
import routes from './config/router';

export default defineConfig({
  alias: {
    'config': path.resolve(__dirname, './config/'),
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  links: [
    { rel: 'icon', href: '/icon.jpg' },
  ],
  title: 'qinglong',
  dynamicImport: {
    loading: '@/components/globalLoading',
  },
  theme: {
    "primary-color": "#16a085",
  },
  proxy: {
    '/qinglong/api': {
      'target': 'http://localhost:8001/',
      'changeOrigin': true,
      'pathRewrite': { '^/qinglong': '' },
    },
  },
});
