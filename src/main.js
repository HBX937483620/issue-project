import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 使用elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.stylus'
// 导入moment日期处理库
import moment from "moment";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
