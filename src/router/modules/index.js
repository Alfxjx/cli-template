export default [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue")
  },
  {
    path: "/form",
    component: () => import("@/views/form.vue")
  },
];
