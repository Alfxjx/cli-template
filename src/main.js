import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import "./components/element.js";
import Clickoutside from "./directives/clickOut.js";

Vue.config.productionTip = false;

Vue.directive("clickout", Clickoutside);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
