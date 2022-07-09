import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

//使用了vue-routerd的[Lazy Loading Routes

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

//异步挂载的路由
//动态需要根据权限加载的路由表
// export const constantRoutes = [
//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "Hadoop文件管理系统",
          icon: "dashboard",
        },
      },
    ],
  },
];
//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRoutes,
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRoutes = [
  {
    path: "/fileList",
    component: Layout,
    meta: {
      title: "文件管理",
      icon: "table",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/fileList/index"),
        name: "Icons",
        meta: {
          title: "文件管理",
          icon: "table",
          roles: ["ROLE_ADMIN", "ROLE_USER"],
        },
      },
    ],
  },
  {
    path: "/echarts",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Dashboard",
        component: () => import("@/views/echarts/index"),
        meta: {
          title: "数据统计",
          icon: "table",
          roles: ["ROLE_ADMIN", "ROLE_USER"],
        },
      },
    ],
  },
  {
    path: "/history",
    component: Layout,
    meta: {
      title: "使用情况统计",
      icon: "Nested",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/umbrella/history"),
        name: "Icons",
        meta: {
          title: "使用情况统计",
          icon: "el-icon-s-help",
          roles: ["ROLE_ADMIN", "ROLE_USER"],
        },
      },
    ],
  },
  {
    path: "/activity",
    component: Layout,
    meta: {
      title: "Ganglia监听集群情况",
      icon: "Nested",
      roles: ["ROLE_ADMIN"],
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/activity/index"),
        name: "Icons",
        meta: {
          title: "Ganglia监听集群情况",
          icon: "el-icon-s-help",
          roles: ["ROLE_ADMIN"],
        },
      },
    ],
  },

  {
    path: "/signup",
    component: Layout,
    meta: {
      title: "HA集群信息",
      icon: "table",
      roles: ["ROLE_ADMIN"],
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/signup/index"),
        name: "Icons",
        meta: { title: "Azkaban调度任务", icon: "form", roles: ["ROLE_ADMIN"] },
      },
    ],
  },
  {
    path: "/NameNode",
    component: Layout,
    meta: {
      title: "NameNode管理",
      icon: "el-icon-star-off",
      roles: ["ROLE_ADMIN"],
    },
    children: [
      {
        path: "borrow",
        component: () => import("@/views/umbrella/borrow.vue"),
        name: "Icons",
        meta: {
          title: "NameNode管理",
          icon: "el-icon-star-on",
          roles: ["ROLE_ADMIN"],
        },
      },
    ],
  },
  {
    path: "/miniPrograms",
    component: Layout,
    meta: {
      title: "集群日志管理",
      icon: "el-icon-star-on",
      roles: ["ROLE_ADMIN"],
    },
    children: [
      {
        path: "swiper",
        component: () => import("@/views/umbrella/history.vue"),
        name: "Icons",
        meta: {
          title: "日志采集",
          icon: "el-icon-star-off",
          roles: ["ROLE_ADMIN"],
        },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
