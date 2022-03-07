
<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>
<div class="searchArea">
  <el-input
      v-model="searchInput"
      size="large"
      placeholder="请输入病人姓名"
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
    <el-table-column prop="gender" label="性别" align="center"/>
    <el-table-column prop="address" label="家庭住址" align="center"/>

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
  
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'
import { ref, computed} from 'vue'
import type { ElTable } from 'element-plus'

import { CONDITIONS,CONDITIONS_COLOR } from '../const'

const searchTitle = '住院病人信息查询'
const searchInput = ''
const tableTitle = '现住院病人名单 & 查询结果'

interface User {
  date: string,
  name: string,
  departmentDoctor:string,//科室加医生
  wardbednum:string,//病房号加床位号
  wardtype:string,//病房类型
  idnum:string,
  gender:string,
  address: string,
  tag: string,
}

interface TagType {
  text: string,
  value: string
}

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
    gender:'女',
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
    gender:'',
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
    gender:'',
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
    gender:'',
    address: 'No. 189, Grove St, Los Angeles',
    tag: '紧急',
  },
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

</style>