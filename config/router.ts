const Index = [
  { path: "/login", component: "@/pages/login/index" },
  {
    path: "/",
    component: "@/layouts/index",
    routes: [
      { path: "/", redirect: "/test1" },
      { path: "/test1", component: "test1" },
      { path: "/test2", component: "test2" },
      { path: "/3", component: "inDevelopment" },
      { path: "/*", component: "404" },
    ],
  },
];

export default Index;