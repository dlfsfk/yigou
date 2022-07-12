import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './plugins/echarts';

store.dispatch("loginUser/whoAmI");
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
