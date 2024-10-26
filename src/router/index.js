// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import Login from '../pages/LoginPage.vue';
import Register from '../pages/RegisterPage.vue';

const routes = [
  { path: '/Home', component: HomePage, },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
