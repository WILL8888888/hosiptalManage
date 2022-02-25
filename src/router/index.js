import { createRouter, createWebHashHistory } from "vue-router";
import Arrange from '../components/Arrange/index.vue';

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path:"/login",
    name:'Login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/main',
    component: Arrange,
    redirect: '/home',
    children: [{
      path: "/home",
      name:"Home",
      component: () => import("../views/Home.vue")
    }]
  },
  {
    path: '/in-hospital',
    name: "入院管理",   
    component: Arrange,
    children: [
      {
        path: "login-admit",
        name: "入院登记",
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
        name: "病房费用调整",
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
    path: '/doctor-manage',
    name: "医生管理",
    component: Arrange,
    children: [
      {
        path: "doctorLogin",
        name: "医生录入",
        component: () => import('../views/doctorManage/doctorLogin.vue')
      },{
        path: "doctorSearch",
        name: "医生查询",
        component: () => import('../views/doctorManage/doctorSearch.vue')
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

export default router;