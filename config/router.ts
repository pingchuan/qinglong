const Index = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/qinglong', redirect: '/' },
      { path: '/', redirect: '/qinglong/userPlan' },
      { path: '/qinglong/login', component: 'publicpages/login' },
      { path: '/qinglong/userList', component: 'backpages/userList' },
      { path: '/qinglong/userPlan', component: 'frontpages/userPlan' },
      { path: '/qinglong/userInfo', component: 'frontpages/userInfo' },
      {
        path: '/qinglong/userArticle/edit',
        component: 'frontpages/userArticle/articleEdit',
      },
      {
        path: '/qinglong/userArticle/info',
        component: 'frontpages/userArticle/articleInfo',
      },
      { path: '/qinglong/userArticle', component: 'frontpages/userArticle' },
      { path: '/qinglong/3', component: 'publicpages/404' },
      { path: '/test1', component: 'testpages/test1' },
      { path: '/test2', component: 'testpages/test2' },
      { path: '/*', component: 'publicpages/inDevelopment' },
    ],
  },
];

const tempPath = ['/test1', '/test2'];

export const fullScreenLayoutPath = ['/qinglong/login'].concat(tempPath);
export const noAuthenticatePath = ['/qinglong/login'].concat(tempPath);

export default Index;
