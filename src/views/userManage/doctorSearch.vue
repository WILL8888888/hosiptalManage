<template>
  <diliver-module :diliver-title="searchTitle"></diliver-module>

  <div class="searchArea">
    <el-input
        v-model="searchInput.doctorId"
        size="large"
        placeholder="医生编号"
        :prefix-icon="Search"
        :clearable="true"
        class="searchArea-idsearch"
      >
      <template #append>
        <el-button :icon="Search" type="primary"></el-button>
      </template>
    </el-input>

    <el-input
        v-model="searchInput.doctorName"
        size="large"
        placeholder="医生姓名"
        :prefix-icon="Search"
        :clearable="true"
        class="searchArea-nameserach"
      >
      <template #append>
        <el-button :icon="Search" type="primary"></el-button>
      </template>
    </el-input>
  </div>

  <diliver-module :diliver-title="searchResult"></diliver-module>

  <el-table ref="tableRef" row-key="date" :data="tableData" max-height="600" class="doctorTable" style="width: 1610px">
    <el-table-column prop="id" label="医生编号" align="center"   />
    <el-table-column prop="name" label="医生姓名" align="center"/>
    <el-table-column prop="room" label="科室" align="center"/>
    <el-table-column prop="professionalLevel" label="职级" align="center" />
    <el-table-column prop="askStatus" label="申请防护状态" align="center" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="askDefend(scope.$index)"
        >
          申请防护用品
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template> 

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'

interface doctorInfo{
  id: string,
  name: string,
  room: string,
  professionalLevel: string,
  askStatus: string
}

const searchTitle = '医生查询'
const searchResult = '医生列表 & 查询结果'
const searchInput = {
  doctorId: '',
  doctorName: ''
}


const tableData: doctorInfo[] =[
  {
    id: 'd0001',
    name: '城建',
    room: '消化内科',
    professionalLevel: '主任医师',
    askStatus: '申请中...'
  },
  {
    id: 'd0001',
    name: '城建',
    room: '消化内科',
    professionalLevel: '主任医师',
    askStatus: '待申请'
  },
  {
    id: 'd0001',
    name: '城建',
    room: '消化内科',
    professionalLevel: '主任医师',
    askStatus: '待申请'
  },
  {
    id: 'd0001',
    name: '城建',
    room: '消化内科',
    professionalLevel: '主任医师',
    askStatus: '待申请'
  }
]

const askDefend= (index: number) => {
  console.log(index)
}
</script>

<style scoped lang="scss">
.searchArea{
  margin: 60px 0 60px 50px;
  display: flex;
  justify-content: space-between;
  width: 1000px;
  &-nameserach{
  width: 446px;
  }
  &-idsearch{
    width: 446px;
  }
}

:deep(.el-input-group__append){
  background-color: #409Eff;
  color: #fff;
}

.doctorTable{
  width: 100%;
  margin: 60px 0 0 50px;
}
</style>
