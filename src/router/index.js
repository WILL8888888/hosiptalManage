import { createRouter, createWebHashHistory } from "vue-router";
import Arrange from '../components/Arrange/index.vue';

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path:"/login",
    name:'login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/in-hospital',
    name: "入院管理",   
    component: Arrange,
    children: [
      {
        path: "login-admit",
        name: "loginAdmit",
        component: () => import('../views/inHospital/loginAdmit.vue')
      },
      {
        path: "search-live",
        name: "住院查询",
        component: () => import('../views/inHospital/searchLive.vue')
      }
    ]
  },{
    path: '/out-hospital',
    name: "出院管理",
    component: Arrange,
    children: [
      {
        path: "fee-settle",
        name: "费用结算",
        component: () => import('../views/outHospital/feeSettle.vue')
      },
      {
        path: "search-out",
        name: "出院查询",
        component: () => import('../views/outHospital/searchOut.vue')
      }
    ]
  },{
    path: '/room-manage',
    name: "病房管理",
    component: Arrange,
    children: [
      {
        path: "fee-adjust",
        name: "病房管理",
        component: () => import('../views/roomManage/feeAdjust.vue')
      }
    ]
  },{
    path: '/nursing-center',
    name: "护理数据",
    component: Arrange,
    children: [
      {
        path: "biometric",
        name: "录入体征数据",
        component: () => import('../views/nursingCenter/biometric.vue')
      },{
        path: "biometricSearch",
        name: "体征数据分析",
        component: () => import('../views/nursingCenter/biometricSearch.vue')
      }
    ]
  },{
    path: '/medicine-manage',
    name: "药品管理",
    component: Arrange,
    children: [
      {
        path: "medicineProvide",
        name: "药品发放",
        component: () => import('../views/medicineManage/medicineProvide.vue')
      },{
        path: "inventorySearch",
        name: "库存查询",
        component: () => import('../views/medicineManage/inventorySearch.vue')
      }
    ]
  },{
    path: '/defend-manage',
    name: "防护用品管理",
    component: Arrange,
    children: [
      {
        path: "defendProvide",
        name: "防护用品发放",
        component: () => import('../views/defendManage/defendProvide.vue')
      },{
        path: "defendSearch",
        name: "防护用品查询",
        component: () => import('../views/defendManage/defendSearch.vue')
      }
    ]
  },{
    path: '/user-manage',
    name: "用户管理",
    component: Arrange,
    children: [
      {
        path: "doctorSearch",
        name: "医生查询",
        component: () => import('../views/userManage/doctorSearch.vue')
      },{
        path: "nurseSearch",
        name: "护士查询",
        component: () => import('../views/userManage/nurseSearch.vue')
      }
    ]
  },{
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import('../views/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 判断是否存在token
    if (!sessionStorage.getItem('token')) {
    // 判断去往的页面是不是登录页
      if (to.path !== '/login') {
        next('/login')
      }
    };
    next();
  })

export default router;