import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible" // 适配
import "@/styles/reset.css" // 初始化样式
import router from '@/router' // 路由对象


// //测试使用推荐歌单API  recommendMusicAPI
// import recommendMusicAPI from './api/index'

// async function myFn() {
//   const res = await recommendMusicAPI()
//   //axios原地返回一个promise对象使用async/await获取结果
//   console.log(res);
// }
// myFn()


import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, Icon, Search, List } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
