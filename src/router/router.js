import Vue from "vue";
import VueRouter from "vue-router";
import Layouts from "@/layouts/index.vue";

const requireAll = requireContext => {
  let arr = [];
  requireContext.keys().forEach(key => {
    arr = arr.concat(requireContext(key).default);
  });
  return arr;
};

const reqLayout = require.context("./modules/layouts", false, /\.js$/);
const req = require.context("./modules", false, /\.js$/);

const resLayout = requireAll(reqLayout);
const res = requireAll(req);

Vue.use(VueRouter);

// ban掉router跳转自身时出现的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    component: Layouts,
    children: resLayout
  },
  ...res
];

const router = new VueRouter({
  routes
});

export default router;
