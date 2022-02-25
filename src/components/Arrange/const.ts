interface route {
  routePath: string,
  routeName: string
}
interface menuModuleObj {
  routeHead:string,
  route: route[],
  icon:string
}

const MENUMODULE:menuModuleObj[] = [
{
  routeHead:'入院管理',
  route:[{
    routePath:'/in-hospital/login-admit',
    routeName:'入院登记'
  },{
    routePath:'/in-hospital/search-live',
    routeName:'住院查询'
  }],
  icon:'addLocation'
},
{
  routeHead:'出院管理',
  route:[{
    routePath:'/out-hospital/fee-settle',
    routeName:'费用结算'
  },{
    routePath:'/out-hospital/search-out',
    routeName:'出院查询'
  }],
  icon:'DeleteLocation'
},
{
  routeHead:'病房管理',
  route:[{
    routePath:'/room-manage/fee-adjust',
    routeName:'病房费用调整'
  }],
  icon:'HomeFilled'
},
{
  routeHead:'护理数据',
  route:[{
    routePath:'/nursing-center/biometric',
    routeName:'录入体征数据'
  },{
    routePath:'/nursing-center/biometricSearch',
    routeName:'体征数据分析'
  }],
  icon:'TrendCharts'
},
{
  routeHead:'药品管理',
  route:[{
    routePath:'/medicine-manage/medicineProvide',
    routeName:'药品发放'
  },{
    routePath:'/medicine-manage/inventorySearch',
    routeName:'库存查询'
  }],
  icon:'Grape'
},
{
  routeHead:'医生管理',
  route:[{
    routePath:'/doctor-manage/doctorLogin',
    routeName:'医生录入'
  },{
    routePath:'/doctor-manage/doctorSearch',
    routeName:'医生查询'
  }],
  icon:'Avatar'
},
]

export {
  MENUMODULE
}