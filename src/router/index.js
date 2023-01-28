import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../services/Auth";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("../views/DetailView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isAuth = await isAuthenticated();
  if (to.name !== "login" && !isAuth) next({ name: "login" });
  else next();
});

export default router;
