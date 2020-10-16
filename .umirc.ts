import { defineConfig } from 'umi';
import routes from './config/router';

export default defineConfig({
  alias: {
    '@': '/',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  links: [
    { rel: 'icon', href: '/icon.jpg' },
  ],
});
