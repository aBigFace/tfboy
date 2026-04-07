import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import LoginView from "../views/LoginView.vue";
import GoodsView from "../views/GoodsView.vue";
import ProductView from "../views/ProductView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import RushView from "../views/RushView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/goods" },
    { path: "/rush", name: "rush", component: RushView },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/goods",
      name: "goods",
      component: GoodsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/product/:goodsId",
      name: "product",
      component: ProductView,
      meta: { requiresAuth: true },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.accessToken) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.name === "login" && auth.accessToken) {
    return { name: "goods" };
  }
  return true;
});

export default router;
