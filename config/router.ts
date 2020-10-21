const Index = [
  { path: '/login', component: 'publicpages/login' },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/test1' },
      { path: '/test1', component: 'testpages/test1' },
      { path: '/test2', component: 'testpages/test2' },
      { path: '/3', component: 'publicpages/inDevelopment' },
      { path: '/*', component: 'publicpages/404' },
    ],
  },
];

export default Index;
