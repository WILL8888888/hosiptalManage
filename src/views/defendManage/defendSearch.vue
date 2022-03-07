<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>

<div class="searchArea">
  <el-input
      v-model="searchInput.medicineId"
      size="large"
      placeholder="防护用品编号"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary"></el-button>
    </template>
  </el-input>

  <el-input
      v-model="searchInput.medicineName"
      size="large"
      placeholder="防护用品名称"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-nameserach"
    >
    <template #append>
      <el-button :icon="Search" type="primary"></el-button>
    </template>
  </el-input>
</div>

<diliver-module :diliver-title="resultTitle"></diliver-module>

<el-table :data="tableData" stripe class="tableStyle" style="width: 1610px" max-height="600">
    <el-table-column prop="id" label="防护用品编号" align="center"/>
    <el-table-column prop="name" label="防护用品名称" align="center"/>
    <el-table-column prop="number" label="库存数量" align="center"/>
  </el-table>
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'

const searchTitle = '防护用品库存查询'
const resultTitle = '防护用品库存查询结果'
const searchInput = {
  medicineId: '',
  medicineName: ''
}

interface medicineNumber {
  id: string,
  name: string,
  number: number
}

const tableData:medicineNumber[] = [
  {
    id: 'm001',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 1003,
  },
{
    id: 'm002',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 123,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 3455,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm004',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 3333,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm003',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
  {
    id: 'm008',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    number: 2112,
  },
]
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

.tableStyle{
  width: 100%;
  margin: 60px 0 0 50px;
}
</style>
