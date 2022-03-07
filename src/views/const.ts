interface doctorType {
  value: string,
  label: string
}
interface doctorListType {
  value: string,
  label: string,
  children: doctorType[]
}
const DOCTORLIST:doctorListType[] = [
{
  value: '消化内科',
  label: '消化内科',
  children: [
    {
      value:'崔曼丽',
      label:'崔曼丽'
    },
    {
      value:'邬磊',
      label:'邬磊'
    },
  ]
},
{
  value: '放射科',
  label: '放射科',
  children: [
    {
      value:'黄耀辉',
      label:'黄耀辉'
    },
    {
      value:'曾铭',
      label:'曾铭'
    },
  ]
},
{
  value: '神经内科',
  label: '神经内科',
  children: [
    {
      value:'肖小华',
      label:'肖小华'
    },
    {
      value:'柳海峰',
      label:'柳海峰'
    },
  ]
},
{
  value: '重症医学科',
  label: '重症医学科',
  children: [
    {
      value:'陈峰华',
      label:'陈峰华'
    },
    {
      value:'黄辉穹',
      label:'黄辉穹'
    },
  ]
},
{
  value: '移植科',
  label: '移植科',
  children: [
    {
      value:'刘韶青',
      label:'刘韶青'
    },
    {
      value:'肖敏',
      label:'肖敏'
    },
  ]
},
{
  value: '泌尿外科',
  label: '泌尿外科',
  children: [
    {
      value:'邓康',
      label:'邓康'
    },
    {
      value:'温平平',
      label:'温平平'
    },
  ]
},{
  value: '呼吸科',
  label: '呼吸科',
  children: [
    {
      value:'尼尔',
      label:'尼尔'
    },
    {
      value:'武旭',
      label:'武旭'
    },
  ]
},]
const WARDTYPELIST:string[] = ['VIP单人病房','舒适双人病房','普通病房','新冠疫情特殊隔离病房'];
const WARDNUMLIST:string[] = ['01','02','03','04','05','06','07','08','09','10','11','隔离01','隔离02'];
const BEDNUMLIST:string[] = ['001','002','003','004']
const CONDITIONS: string[] = ['轻度','中度','严重','紧急']
const CONDITIONS_COLOR = {
  '轻度': 'success',
  '中度': 'default',
  '严重': 'warning',
  '紧急': 'danger'
}

const DESCRIPTIONS = [
{
  descriptTitle: '姓名',
  icons: 'User'
},{
  descriptTitle: '身份证号',
  icons: 'Postcard'
},{
  descriptTitle: '性别',
  icons: 'userFilled'
},{
  descriptTitle: '入院病情',
  icons: 'Tickets'
},{
  descriptTitle: '家庭住址',
  icons: 'officeBuilding'
}]

const MEDICINEINFO = [
{
  infoTitle:'药品编号',
  icons:'Document'
},{
  infoTitle:'药品名称',
  icons:'Cherry'
},{
  infoTitle:'药品库存数量',
  icons:'HelpFilled'
},{
  infoTitle:'药品价格',
  icons:'Money'
}]

const COUNTALL = [
{
  descriptions: '入院时间',
  icons: 'Calendar'
},{
  descriptions: '出院时间',
  icons: 'Calendar'
},{
  descriptions: '病房类型',
  icons: 'HomeFilled'
},{
  descriptions: '药单总价',
  icons: 'Money'
},{
  descriptions: '费用合计',
  icons: 'Wallet'
}]
export {
  DOCTORLIST,
  WARDTYPELIST,
  WARDNUMLIST,
  BEDNUMLIST,
  CONDITIONS,
  CONDITIONS_COLOR,
  DESCRIPTIONS,
  MEDICINEINFO,
  COUNTALL
}