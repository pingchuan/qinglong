const Index = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/test1' },
      { path: '/login', component: 'publicpages/login' },
      { path: '/test1', component: 'testpages/test1' },
      { path: '/test2', component: 'testpages/test2' },
      { path: '/3', component: 'publicpages/inDevelopment' },
      { path: '/userList', component: 'backpages/userList' },
      { path: '/*', component: 'publicpages/404' },
    ],
  },
];

export const fullScreenLayoutPath = ['/login'];
export const noAuthenticatePath = ['/login'];

export default Index;
