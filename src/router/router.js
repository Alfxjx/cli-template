import Vue from "vue";
import VueRouter from "vue-router";
import { HomeRoutes } from "./modules/home.js";

Vue.use(VueRouter);

// ban掉router跳转自身时出现的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [...HomeRoutes];

const router = new VueRouter({
  routes
});

export default router;
