import {treeMake} from '@/utils/index'

interface Type {
  value: string,
  label: string
}
interface ListType {
  value: string,
  label: string,
  children: Type[]
}
const DOCTORLIST:ListType[] = [
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
},
{
  value: 'COVID-19特殊处理科',
  label: 'COVID-19特殊处理科',
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


const documentList = [{info : '消化内科'},{info : '放射科'},{info : '神经内科'},{info : '重症医学科'},{info : '移植科'},{info : '泌尿外科'},{info : '呼吸科'},{info : 'COVID-19特殊处理科'}]
const ROLEINFO = [
{
  info:'医生',
  children:[
  {
    info: '医师',
    children: documentList
  },
  {
    info: '主治医师',
    children: documentList
  },
  {
    info: '副主任医师',
    children: documentList
  },
  {
    info: '主任医师',
    children: documentList
  },]
},
{
  info:'护士',
  children:[
  {
    info: '护士',
    children: documentList
  },
  {
    info: '主管护师',
    children: documentList
  },
  {
    info: '副主任护师',
    children: documentList
  },
  {
    info: '主任护师',
    children: documentList
  },]
}]

let ROLELIST = treeMake(ROLEINFO)

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
  icons: 'User',
  key: 'name'
},{
  descriptTitle: '身份证号',
  icons: 'Postcard',
  key: 'idnum'
},{
  descriptTitle: '性别',
  icons: 'userFilled',
  key: 'gender'
},{
  descriptTitle: '入院病情',
  icons: 'Tickets',
  key: 'condition'
},{
  descriptTitle: '科室/医生',
  icons: 'Stamp',
  key: 'departmentDoctor'
},{
  descriptTitle: '病房类型',
  icons: 'ScaleToOriginal',
  key: 'wardType'
},{
  descriptTitle: '病室',
  icons: 'ScaleToOriginal',
  key: 'wardRoom'
},{
  descriptTitle: '病床号',
  icons: 'ScaleToOriginal',
  key: 'wardBed'
},{
  descriptTitle: '家庭住址',
  icons: 'officeBuilding',
  key: 'address'
}]

const MEDICINEINFO = [
{
  infoTitle:'药品编号',
  icons:'Document',
  key: 'medicineid'
},{
  infoTitle:'药品名称',
  icons:'Cherry',
  key: 'medicineName'
},{
  infoTitle:'药品价格',
  icons:'Money',
  key: 'price'
},{
  infoTitle:'药品库存数量',
  icons:'HelpFilled',
  key: 'inventory'
}]

const COUNTALL = [
{
  descriptions: '入院时间',
  icons: 'Calendar',
  key: 'inDate'
},{
  descriptions: '出院时间',
  icons: 'Calendar',
  key: 'outDate'
},{
  descriptions: '病房类型',
  icons: 'HomeFilled',
  key: 'wardType'
},{
  descriptions: '病房单价',
  icons: 'Ticket',
  key: 'wardPrice'
},{
  descriptions: '药单总价',
  icons: 'Money',
  key: 'medicineTotal'
},{
  descriptions: '费用合计',
  icons: 'Wallet',
  key: 'totalPrice'
}]

const DEFENDSTATUSMAP = {
  'waitAsk' : '待申请',
  'asking' : '申请中...'
}

const roleManage = {
  'manager' : '管理员',
  'user' : '使用者'
}

const roleManageChinToEng = {
  '管理员': 'manager',
  '使用者': 'user'
}
const SUCCESS = 200;

const NursetitleName = [
  {
    value: '护士',
    label: '护士',
  },
  {
    value: '主管护师',
    label: '主管护师',
  },
  {
    value: '副主任护师',
    label: '副主任护师',
  },
  {
    value: '主任护师',
    label: '主任护师',
  }
]

const DoctortitleName = [
  {
    value: '住院医师',
    label: '住院医师',
  },
  {
    value: '主治医师',
    label: '主治医师',
  },
  {
    value: '副主任医师',
    label: '副主任医师',
  },
  {
    value: '主任医师',
    label: '主任医师',
  }
]

const manageIdentify = [
  {
    value: '管理员',
    label: '管理员'
  },
  {
    value: '使用者',
    label: '使用者'
  }
]
export {
  DOCTORLIST,
  ROLELIST,
  CONDITIONS,
  CONDITIONS_COLOR,
  DESCRIPTIONS,
  MEDICINEINFO,
  COUNTALL,
  SUCCESS,
  DEFENDSTATUSMAP,
  roleManage,
  roleManageChinToEng,
  NursetitleName,
  DoctortitleName,
  manageIdentify
}