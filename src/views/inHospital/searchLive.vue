
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
      <el-button :icon="Search" type="primary" @click="findPatient"></el-button>
    </template>
  </el-input>
</div>

<diliver-module :diliver-title="tableTitle"></diliver-module>

<div class="tableArea">
  <el-table ref="tableRef" row-key="date" :data="state.tableData" style="width: 100%" max-height="600">
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
    <el-table-column prop="wardInfo" label="病房/床号" align="center"/>
    <el-table-column prop="idnum" label="身份证号" align="center"/>
    <el-table-column prop="gender" label="性别" align="center"/>
    <el-table-column prop="address" label="家庭住址" align="center"/>

    <el-table-column
      prop="condition"
      label="入院病情"
      width="100"
      align="center"
      :filters="tagFilter"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="CONDITIONS_COLOR[scope.row.condition]"
          disable-transitions
          >{{ scope.row.condition }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</div>
  
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search, User } from '@element-plus/icons'
import { ref,reactive ,computed, onMounted } from 'vue'
import type { ElTable } from 'element-plus'
import { patientAllList, patientPersonalInfo } from '@/utils/api/patientAbout'
import { CONDITIONS,CONDITIONS_COLOR } from '../const'

const searchTitle = '住院病人信息查询'
const searchInput = ref('')
const tableTitle = '现住院病人名单 & 查询结果'

interface User {
  date: string,
  name: string,
  departmentDoctor:string,//科室加医生
  wardInfo:string,
  wardType:string,
  wardRoom:string,
  wardBed:string,
  idnum:string,
  gender:string,
  address: string,
  condition: string,
}

interface TagType {
  text: string,
  value: string
}

const tableRef = ref<InstanceType<typeof ElTable>>()

let state = reactive({
  tableData:  [] as User[]
})
onMounted(async ()=>{
  let {data} = await patientAllList(null)
  state.tableData = data.result
  state.tableData.forEach((item)=>{
    item.wardInfo =  `${item.wardType}/${item.wardRoom}/${item.wardBed}`
  })
  
})

const filterTag = (value: string, row: User) => {
  return row.condition === value
}

const tagFilter = computed(() => {
  let tagArray: TagType[] = []
    CONDITIONS.forEach(item => {
      tagArray.push({text: item, value: item})
    })
  return tagArray
})

const findPatient = (async ()=>{
  let requestConfig = {
    'name' : searchInput.value
  }
  let {data} = await patientPersonalInfo(requestConfig)
  state.tableData = data.result
  state.tableData.forEach((item)=>{
    item.wardInfo =  `${item.wardType}/${item.wardRoom}/${item.wardBed}`
  })
})
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