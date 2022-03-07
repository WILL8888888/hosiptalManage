<template>
<diliverModule :diliver-title="tableTitle"></diliverModule>

<div class="searchArea">
  <el-input
      v-model="searchInput.name"
      size="large"
      placeholder="请输入病人姓名"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-nameserach"
    >
  </el-input>

  <el-input
      v-model="searchInput.idnum"
      size="large"
      placeholder="请输入身份证号后四位"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary"></el-button>
    </template>
  </el-input>
</div>

  <el-descriptions
    class="feeDetails"
    title="结账病人信息确认"
    :column="2"
    :size="size"
    border
  >
    <el-descriptions-item v-for="item in DESCRIPTIONS">
      <template #label>
        <div class="cell-item">
            <el-icon :style="iconStyle">
              <component :is="item.icons" />
            </el-icon>
          {{item.descriptTitle}}
        </div>
      </template>
      <span>味觉糖</span>
    </el-descriptions-item>
  </el-descriptions>



<div>
  <diliverModule :diliver-title="medicineFeeTitle"></diliverModule>
  <el-table ref="tableRef" row-key="date" :data="tableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column prop="id" label="药物编号" align="center"/>
    <el-table-column prop="name" label="药物名称" align="center"/>
    <el-table-column prop="price" label="药品价格" align="center"/>
    <el-table-column prop="num" label="药品剂量数" align="center"/>
  </el-table>

  <div class="countButton">
    <div style="font-weight:600">药单费用合计：</div>
    <el-button type="primary">确定</el-button>
  </div>
</div>
<div>
<diliverModule :diliver-title="countAll"></diliverModule>

<el-descriptions
    class="feeDetails"
    title="住院治疗总费用单"
    :column="2"
    :size="size"
    border
  >
    <el-descriptions-item v-for="item in COUNTALL">
      <template #label>
        <div class="cell-item">
            <el-icon :style="iconStyle">
              <component :is="item.icons" />
            </el-icon>
          {{item.descriptions}}
        </div>
      </template>
      <span>味觉糖</span>
    </el-descriptions-item>
</el-descriptions>

  <div class="countButton">
    <div style="font-weight:600">费用合计：</div>
    <el-button type="primary">确定付款</el-button>
  </div>
</div>


</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'

import { computed, ref } from 'vue'
import { DESCRIPTIONS, COUNTALL } from '../const'
const tableTitle = "费用结算区域"
const medicineFeeTitle = '药品费用'
const countAll = '费用总计'
const searchInput = {
  name: '',
  idnum: ''
}

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

interface Medicine {
  id: string,
  name: string,
  price:number,
  num:number,
}

const tableData: Medicine[] = [
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
  display: flex;
  justify-content: space-between;
  width: 850px;
  &-nameserach{
  width: 400px;
  }
  &-idsearch{
    width: 446px;
  }
}
:deep(.el-input-group__append){
  background-color: #409Eff;
  color: #fff;
}

.feeDetails{
  margin:0 0 50px 50px;

}
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}

:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label){
  background-color: #c7dffdf6;
}

.medicineTable{
  width: 100%;
  margin: 60px 0 50px 50px;
}
.countButton{
  margin-left: 85%;
  margin-bottom: 30px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
