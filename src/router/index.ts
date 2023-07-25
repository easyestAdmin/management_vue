import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "@/store";
import { nextTick } from "vue";
import { filterRoute } from "@/utils/filterRoute";
import { filterBreadCrumb } from "@/utils/filterBreadCrumb";
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "Layout",
      component: () =>
        import(/* webpackChunkName: "Layout" */ "../layout/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/404.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/login.vue"),
    },
  ],
});
const writeLists = ["login"];
router.beforeEach(async (to, from, next) => {
  console.log(to);

  if (writeLists.includes(to.name as string)) {
    next();
    return;
  }
  await nextTick();
  const homeStore = home();

  if (homeStore.menuList.length) {
    homeStore.$patch({
      breadcrumbs: filterBreadCrumb(to.path, homeStore.menuList),
    });
    next();
    return;
  }
  const data = await homeStore.GenerateRoutes();

  const routers = filterRoute(data);
  console.log(routers);
  routers.forEach((route: RouteRecordRaw) => {
    router.addRoute("Layout", route);
  });

  next({ ...to, replace: true });
});

export default router;
