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
    { path: '/login', component: '@/pages/login/index' },
  ],
  links: [
    { rel: 'icon', href: '/images/qinglong.jpg' },
  ],
});
