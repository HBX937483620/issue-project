import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Container from '@/views/Container'
import Register from '@/views/Register'
import Index from '@/views/Index.vue';
import Create from '@/views/issue/Create.vue';
import Report from '@/views/issue/Report.vue';
import Manage from '@/views/account/Manage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // 重定向到index页面
    redirect: '/index',
    name: 'Container',
    component: Container,
    children: [
      { path: 'index', name: '首页', component: Index, },
      { path: 'create', name: '创建Issue', component: Create, },
      { path: 'report', name: 'Issue报表', component: Report, },
      { path: 'manage', name: '账号管理', component: Manage, },
    ]
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

export default router;
