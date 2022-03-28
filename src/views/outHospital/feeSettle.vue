<template>
<diliverModule :diliver-title="tableTitle"></diliverModule>

<div class="searchArea">
  <el-input
      v-model="searchInput.idnum"
      size="large"
      placeholder="身份证号"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-nameserach"
    >
    <template #append>
      <el-button :icon="Search" type="primary" @click="findBiometric"></el-button>
    </template>
    <template #prepend>
      <el-select v-model="select" placeholder="搜索类型" style="width: 180px">
        <el-option label="身份证号" value="idnum" />
      </el-select>
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
      <span v-if="state.patientDescriptions.length > 0">{{state.patientDescriptions[0][item.key]}}</span>
    </el-descriptions-item>
  </el-descriptions>



<div>
  <diliverModule :diliver-title="medicineFeeTitle"></diliverModule>
  <el-table ref="tableRef" row-key="date" :data="state.tableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column prop="medicineid" label="药物编号" align="center"/>
    <el-table-column prop="medicineName" label="药物名称" align="center"/>
    <el-table-column prop="price" label="药品价格" align="center"/>
    <el-table-column prop="medicineNum" label="药品剂量数" align="center"/>
  </el-table>

  <div class="countButton">
    <div style="font-weight:600">{{`药单费用合计：${medicineTotalPrice}`}}</div>
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
      <span v-if="Object.keys(state.totalDescriptions).length > 0">{{state.totalDescriptions[item.key]}}</span>
    </el-descriptions-item>
</el-descriptions>
  <div class="countButton">
    <div style="font-weight:600">{{`费用合计：${state.totalDescriptions?.totalPrice ?? 0}`}}</div>

    <el-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="CircleCheckFilled"
    icon-color="green"
    title="是否确定付款"
    @confirm="confirmEvent"
  >
    <template #reference>
      <el-button type="primary">付款</el-button>
    </template>
  </el-popconfirm>

    
  </div>
</div>


</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search, CircleCheckFilled} from '@element-plus/icons'

import { computed, reactive, ref} from 'vue'
import { DESCRIPTIONS, COUNTALL } from '../const'
import { wardFind } from '@/utils/api/ward'
import { formatTime } from '@/utils/index'
import { patientPersonalInfo } from '@/utils/api/patientAbout'
import { medicineListSearchOne } from '@/utils/api/medicineList'
import { updateAllStatus } from '@/utils/api/updateOutStatus'

const tableTitle = "费用结算区域"
const medicineFeeTitle = '药品费用'
const countAll = '费用总计'
const searchInput = reactive({
  idnum: ''
})

const size = ref('')
const select = ref('idnum')
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
const medicineTotalPrice = ref(0)
const timeDate:any = ref(0)


interface Medicine {
  medicineid: string,
  medicineName: string,
  price:number,
  medicineNum:number,
}

interface Total {
  inDate: string,
  outDate: string,
  wardType: string,
  wardPrice: string,
  medicineTotal: number,
  totalPrice: number
}

const state = reactive({
  patientDescriptions: [],
  tableData :[] as Medicine[],
  totalDescriptions: {} as Total,
  wardInfo: {}
})

const findBiometric =async ()=>{
  let personInfo = await patientPersonalInfo({'idnum': searchInput.idnum});
  let medicineInfo = await medicineListSearchOne({'idnum': searchInput.idnum})
  state.patientDescriptions = personInfo.data.result
  state.tableData = medicineInfo.data.result
  medicineTotalPrice.value = state.tableData.map(item => {return item.price*item.medicineNum}).reduce((pre,cur)=>{return Number((pre+cur).toFixed(2))},)

  let wardType = personInfo.data.result[0].wardInfo.split('/')[0]
  let wardInfo = await wardFind({'wardType': wardType})
  timeDate.value = ((new Date().getTime() - personInfo.data.result[0].timeStamps) / (24*60*60*1000)).toFixed(0)
  state.totalDescriptions = {
    inDate: personInfo.data.result[0].date,
    outDate: formatTime(new Date()),
    wardType: wardType,
    wardPrice: wardInfo.data.result[0].price,
    medicineTotal: medicineTotalPrice.value,
    totalPrice: medicineTotalPrice.value + timeDate.value * wardInfo.data.result[0].price
  }
}

const confirmEvent =async ()=>{
  let requestBody = {
    'idnum' : state.patientDescriptions[0].idnum
  }
  await updateAllStatus(requestBody)

  
}

</script>

<style scoped lang="scss">
.searchArea{
  margin: 60px 0 60px 50px;
  display: flex;
  justify-content: space-between;
  width: 850px;
  &-nameserach{
  width: 646px;
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
  width: 400px;
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

:deep(.el-select .el-input__inner){
  border: none;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
