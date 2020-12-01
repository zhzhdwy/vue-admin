import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/guard";
//element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
//自定义组件
import "./icons";

// import global from './utils/global';
// Vue.use(global);


Vue.use(VueCompositionApi);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
