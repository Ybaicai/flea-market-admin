import VueRouter from 'vue-router';
import HomeContainer from './components/container/HomeContainer.vue';
import LoginContainer from './components/container/LoginContainer.vue'
import RegisterContainer from './components/container/RegisterContainer.vue'
import AdminInfo from './components/container/AdminInfoContainer.vue'
import ReportContainer from './components/container/ReportContainer.vue'
import UserContainer from './components/container/UserContainer.vue'
import CategoryContainer from './components/container/CategoryContainer.vue'
import GoodsContainer from './components/container/GoodsContainer.vue'
import OrderContainer from './components/container/OrderContainer.vue'
import HomeGoodsContainer from './components/container/HomeGoodsContainer.vue'

var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home',
      meta: {
        auth: true,
      },
      component: HomeContainer
    },
    {
      path: '/login',
      meta: {
        auth: true,
      },
      component: LoginContainer
    },
    {
      path: '/register',
      meta: {
        auth: true,
      },
      component: RegisterContainer
    },
    {
      path: '/admininfo',
      meta: {
        auth: false,
      },
      component: AdminInfo
    },
    {
      path: '/report',
      meta: {
        auth: false
      },
      component: ReportContainer
    },
    {
      path: '/user',
      meta: {
        auth: false
      },
      component: UserContainer
    },
    {
      path: '/category',
      meta: {
        auth: false
      },
      component: CategoryContainer
    },
    {
      path: '/goods',
      meta: {
        auth: false
      },
      component: GoodsContainer
    },
    {
      path: '/order',
      meta: {
        auth: false
      },
      component: OrderContainer
    },
    {
      path: '/homegoods',
      meta: {
        auth: false
      },
      component: HomeGoodsContainer
    }

  ]
})
export default router;