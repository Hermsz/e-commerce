import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Product from './views/ProductList.vue';
import UserCart from './views/userCart.vue';
import AdminDashBoard from './views/adminDashboard.vue';
import addProduct from './views/newProduct.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/products',
      name: 'products',
      component: Product,
    },
    {
      path: '/carts',
      name: 'userCart',
      component: UserCart,
    },
    {
      path: '/admin',
      name: 'adminDashBoard',
      component: AdminDashBoard,
      children: [
        {
          path: 'add',
          name: 'adminAdd',
          component: addProduct,
        },
      ],
    },

  ],
});
