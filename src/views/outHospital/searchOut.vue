<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>
<div class="searchArea">
  <el-input
      v-model="searchInput.idnum"
      size="large"
      placeholder="请输入已出院患者身份证号"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-inputcss"
    >
    <template #append>
      <el-button :icon="Search" type="primary"></el-button>
    </template>
  </el-input>
</div>

<diliver-module :diliver-title="tableTitle"></diliver-module>

<div class="tableArea">
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%" max-height="600">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="180"
      column-key="date"
      align="center"
    />
    <el-table-column prop="name" label="姓名" align="center"/>
    <el-table-column prop="departmentDoctor" label="科室/医生" align="center"/>
    <el-table-column prop="wardbednum" label="病房/床号" align="center"/>
    <el-table-column prop="wardtype" label="病房类型" align="center"/>
    <el-table-column prop="idnum" label="身份证号" align="center"/>
    <el-table-column prop="address" label="家庭住址" align="center"/>
    <el-table-column prop="count" label="缴费金额" align="center"/>
    <el-table-column
      prop="tag"
      label="入院病情"
      width="100"
      align="center"
      :filters="tagFilter"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="CONDITIONS_COLOR[scope.row.tag]"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</div>

<div>
  <diliver-module :diliver-title="medicineCount"></diliver-module>
  <el-table ref="tableRef" row-key="date" :data="medicineTableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column prop="id" label="药物编号" align="center"/>
    <el-table-column prop="name" label="药物名称" align="center"/>
    <el-table-column prop="price" label="药品价格" align="center"/>
    <el-table-column prop="num" label="药品剂量数" align="center"/>
  </el-table>
</div>

</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'
import { ref, computed, reactive} from 'vue'
import type { ElTable } from 'element-plus'

import { CONDITIONS,CONDITIONS_COLOR } from '../const'

interface User {
  date: string,
  name: string,
  departmentDoctor:string,//科室加医生
  wardbednum:string,//病房号加床位号
  wardtype:string,//病房类型
  idnum:string,
  count:string,
  address: string,
  tag: string,
}

interface TagType {
  text: string,
  value: string
}


interface Medicine {
  id: string,
  name: string,
  price:number,
  num:number,
}


const searchInput = reactive({
  idnum: ''
})
const searchTitle = '出院病人历史信息查询'
const tableTitle = '出院病人名单 & 查询结果'
const medicineCount = '用药历史'
const tableRef = ref<InstanceType<typeof ElTable>>()
const filterTag = (value: string, row: User) => {
  return row.tag === value
}

const tagFilter = computed(() => {
  let tagArray: TagType[] = []
    CONDITIONS.forEach(item => {
      tagArray.push({text: item, value: item})
    })
  return tagArray
})


const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    departmentDoctor:'消化内科/陈康华',//科室加医生
    wardbednum:'01 / 001',//病房号加床位号
    wardtype:'VIP单人房',//病房类型
    idnum:'440303200012231001',
    count:'2800.00元',
    address: 'No. 189, Grove St, Los Angeles',
    tag: '轻度',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    departmentDoctor:'',//科室加医生
    wardbednum:'',//病房号加床位号
    wardtype:'',//病房类型
    idnum:'',
    count:'',
    address: 'No. 189, Grove St, Los Angeles',
    tag: '中度',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    departmentDoctor:'',//科室加医生
    wardbednum:'',//病房号加床位号
    wardtype:'',//病房类型
    idnum:'',
    count:'',
    address: 'No. 189, Grove St, Los Angeles',
    tag: '严重',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    departmentDoctor:'',//科室加医生
    wardbednum:'',//病房号加床位号
    wardtype:'',//病房类型
    idnum:'',
    count:'',
    address: 'No. 189, Grove St, Los Angeles',
    tag: '紧急',
  },
]

const medicineTableData: Medicine[] = [
  {
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5
  },
  {
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5
  },
  {
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5
  },
  {
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5
  },
  {
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5
  },
  {
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5
  }
]
</script>

<style scoped lang="scss">
.searchArea{
  margin: 60px 0 60px 50px;
  &-inputcss{
  width: 400px;
  }
}
:deep(.el-input-group__append){
  background-color: #409Eff;
  color: #fff;
}

.tableArea{
  margin: 60px 0 60px 50px;
}

.medicineTable{
  width: 100%;
  margin: 60px 0 50px 50px;
}
</style>