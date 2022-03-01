import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServe'
import "swiper/css/swiper.css"

// import { reqSearch } from "@/api";
// console.log(reqSearch({}))


Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.config.productionTip = false;

// import {reqCategoryList} from '@/api'
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 注册路由，kv一致省略v，router小写
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount('#app')
