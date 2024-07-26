import { createRouter, createWebHistory } from "vue-router";
import LayoutFull from '../layouts/LayoutFull.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: LayoutFull,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: "/categorias",
          name: "categorias",
          component: () => import('@/views/CategoriaView.vue'),
        },
        {
          path: "/categorias",
          name: "categorias",
          component: () => import('@/views/CategoriaView.vue'),
        },
        {
          path: "/modelos",
          name: "modelos",
          component: () => import('@/views/ModeloView.vue'),
        },
        {
          path: "/login",
          name: "login",
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: "/logout",
          name: "logout",
          component: () => import('@/views/LogoutView.vue'),
        },
        {
          path: "/veiculo",
          name: "veiculo",
          component: () => import('@/views/VeiculoView.vue'),
        },
        {
          path: "/acessorio",
          name: "acessorio",
          component: () => import('@/views/AcessorioView.vue'),
        },
        {
          path: "/cor",
          name: "cor",
          component: () => import('@/views/CorView.vue'),
        },
        {
          path: "/marca",
          name: "marca",
          component: () => import('@/views/MarcaView.vue'),
        },
      ]
    }
  ],
});

export default router;
