import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Container from '@/views/Container'
import Register from '@/views/Register'
import Index from '@/views/Index.vue';
import Create from '@/views/issue/Create.vue';
import Report1 from '@/views/issue/Report1.vue';
import Manage1 from '@/views/account/Manage1.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // 重定向到index页面
    redirect: '/index',
    name: 'Container',
    component: Container,
    // 子路由
    children: [
      { path: 'index', name: '首页', component: Index, },
      { path: 'create', name: '创建Issue', component: Create, },
      { path: 'report', name: 'Issue报表', component: Report1, },
      { path: 'manage', name: '账号管理', component: Manage1, },
    ],
    //需要登录，才能访问
    // meta: {
    //   requireAuth: true
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
//     if (!sessionStorage.getItem("user")) {  // 没有登录信息跳转到登录页
//       next({
//         path: "/login",
//         query: { redirect: to.fullPath }  // 'to.fullPath'跳转到登录之前页面的路径
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
