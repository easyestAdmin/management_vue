import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "@/store";
import { nextTick } from "vue";
import { filterRoute } from "@/utils/filterRoute";
import { loadView } from "@/utils/filterRoute";
const modules = import.meta.glob("../views/**/*.vue");
console.log(modules);

// const routes: RouteRecordRaw[] = [
//   {
//     path: "/",
//     name: "Layout",
//     component: () =>
//       import(/* webpackChunkName: "Layout" */ "../layout/index.vue"),
//   },
//   {
//     path: "/login",
//     name: "Login",
//     component: () =>
//       import(/* webpackChunkName: "login" */ "../views/login.vue"),
//   },
// ];

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

router.beforeEach(async (to, from, next) => {
  if (to.name === "login") {
    next();
    return;
  }
  await nextTick();
  const homeStore = home();
  console.log(homeStore.menuList.length);

  if (homeStore.menuList.length) {
    next();
    return;
  }
  const data = await homeStore.GenerateRoutes();

  const routers = filterRoute(data);
  console.log(routers);
  routers.forEach((route: RouteRecordRaw) => {
    // console.log(loadView("child_1_1"));
    // router.addRoute("Layout", {
    //   name: "aa",
    //   path: "aa",
    //   children: [
    //     {
    //       path: "child_1_1",
    //       name: "子菜单1",
    //       component: loadView("child_1_1") as any,
    //     },
    //   ],
    // });

    router.addRoute("Layout", route);
  });

  next({ ...to, replace: true });
});

export default router;
