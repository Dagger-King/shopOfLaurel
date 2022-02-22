import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'

Vue.component(TypeNav.name,TypeNav);
Vue.config.productionTip = false;

// import {reqCategoryList} from '@/api'
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 注册路由，kv一致省略v，router小写
  router,
  store
}).$mount('#app')
