const Index = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/test1' },
      { path: '/login', component: 'publicpages/login' },
      { path: '/test1', component: 'testpages/test1' },
      { path: '/test2', component: 'testpages/test2' },
      { path: '/3', component: 'publicpages/404' },
      { path: '/userList', component: 'backpages/userList' },
      { path: '/userPlan', component: 'frontpages/userPlan' },
      { path: '/*', component: 'publicpages/inDevelopment' },
    ],
  },
];

const tempPath = ['/test2'];

export const fullScreenLayoutPath = ['/login'].concat(tempPath);
export const noAuthenticatePath = ['/login'].concat(tempPath);

export default Index;
