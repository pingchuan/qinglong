import { defineConfig } from 'umi';

export default defineConfig({
  alias: {
    '@': '/',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/layouts/index' },
  ],
});
