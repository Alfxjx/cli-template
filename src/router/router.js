import Vue from "vue";
import VueRouter from "vue-router";
import { HomeRoutes } from "./modules/home.js";

Vue.use(VueRouter);

const routes = [...HomeRoutes];

const router = new VueRouter({
  routes
});

export default router;
