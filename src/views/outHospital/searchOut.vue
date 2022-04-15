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
      <el-button :icon="Search" type="primary" @click="getOutPatient"></el-button>
    </template>
  </el-input>
</div>

<diliver-module :diliver-title="tableTitle"></diliver-module>

<div class="tableArea">
  <el-table ref="tableRef" row-key="date" :data="state.tableData" style="width: 100%" max-height="600">
    <el-table-column
      prop="date"
      label="入院时间"
      sortable
      width="180"
      column-key="date"
      align="center"
    />
    <el-table-column
      prop="outDate"
      label="出院时间"
      sortable
      width="180"
      column-key="outDate"
      align="center"
    />
    <el-table-column prop="name" label="姓名" align="center"/>
    <el-table-column prop="departmentDoctor" label="科室/医生" align="center" width="250"/>
    <el-table-column prop="wardType" label="病房类型" align="center" width="250"/>
    <el-table-column prop="wardRoom" label="病房类型" align="center" width="250"/>
    <el-table-column prop="wardBed" label="病房类型" align="center" width="250"/>
    <el-table-column prop="outMedicineTotalPrice" label="药单缴纳费用" align="center"/>
    <el-table-column prop="outWardPrice" label="病房缴纳费用" align="center"/>
    <el-table-column prop="totalPrice" label="总费用缴纳记录" align="center"/>
    <el-table-column prop="idnum" label="身份证号" align="center"/>
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
          >{{ scope.row.condition }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</div>

<div>
  <diliver-module :diliver-title="medicineCount"></diliver-module>
  <el-table ref="tableRef" row-key="date" :data="state.medicineTableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column prop="medicineid" label="药物编号" align="center"/>
    <el-table-column prop="medicineName" label="药物名称" align="center"/>
    <el-table-column prop="price" label="药品价格" align="center"/>
    <el-table-column prop="medicineNum" label="药品剂量数" align="center"/>
    <el-table-column prop="doctorWorkid" label="派发药品医生工号" align="center"/>
  </el-table>
</div>

<div>
  <diliver-module :diliver-title="biometricData"></diliver-module>
  <el-table :data="state.tableChart" stripe class="tableStyle" style="width: 1610px" max-height="600">
    <el-table-column prop="name" label="病人姓名" align="center"/>
    <el-table-column prop="idnum" label="身份证号码" align="center"/>
    <el-table-column prop="temperature" label="体温(℃)" align="center"/>
    <el-table-column prop="heartrate" label="心率(次/分)" align="center"/>
    <el-table-column prop="bloodsugar" label="血糖(mmol/l)" align="center"/>
    <el-table-column prop="covid" label="新冠检测结果" align="center"/>
    <el-table-column prop="checktime" label="检测时间" align="center"/>
  </el-table>

  <div ref="temperatureChart" class="chart"></div>
  <div ref="heartRateChart" class="colorchart"></div>
  <div ref="bloodSugarChart" class="colorchart"></div>
</div>


</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'
import { ref, computed, reactive, watch} from 'vue'
import type { ElTable } from 'element-plus'
import { personaloutPatientInfo, medicineListOutSearch, biometricOutSearch} from '@/utils/api/outHospital'
import { CONDITIONS,CONDITIONS_COLOR } from '../const'
import { ElMessage } from 'element-plus'
import * as echarts from "echarts";

interface User {
  date: string,
  outDate: string,
  outMedicineTotalPrice: string,
  outWardPrice: string,
  totalPrice: string,
  name: string,
  departmentDoctor:string,//科室加医生
  wardType:string,//病房类型
  wardRoom:string,
  wardBed:string,
  idnum:string,
  count:string,
  address: string,
  condition: string,
}

interface biometric {
  name: string,
  idnum: string,
  temperature: string,
  heartrate: string,
  bloodsugar: string,
  covid: string,
  checktime: string
}

interface TagType {
  text: string,
  value: string
}


interface Medicine {
  medicineid: string,
  medicineName: string,
  price:number,
  medicineNum:number,
  doctorWorkid: String
}


const searchInput = reactive({
  idnum: ''
})
const searchTitle = '出院病人历史信息查询'
const tableTitle = '出院病人名单 & 查询结果'
const medicineCount = '用药历史'
const biometricData = '体征数据住院历史结果分析记录'
const tableRef = ref<InstanceType<typeof ElTable>>()
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

const state = reactive({
  tableData : [] as User[],
  medicineTableData: [] as Medicine[],
  tableChart : [] as biometric[]
})

const getOutPatient =async ()=>{
  let requestBody = {
    'idnum':searchInput.idnum
  }
  let {data} = await personaloutPatientInfo(requestBody)
  state.tableData  = data.result
  let medicineList = await medicineListOutSearch(requestBody)
  state.medicineTableData = medicineList.data.result
  let biometric = await biometricOutSearch(requestBody)
  let tableArr = []
  let res = biometric.data.result[0]
  if(biometric.data.result.length > 0){
    res.checktime.forEach((item,index)=>{
      let biometric = {
        name: res.name,
        idnum: res.idnum,
        temperature: res.temperature[index],
        heartrate: res.heartrate[index],
        bloodsugar: res.bloodsugar[index],
        covid: res.covid[index],
        checktime: item
      }
      tableArr.push(biometric)
    })
    state.tableChart = tableArr
  }else{
    ElMessage({
      message: '未找到该名出院病人',
      type: 'warning'
    })
  }

}

watch(() => state.tableChart, (newValue, oldValue) => {
  drawTemperatureChart(newValue);
  drawHeartRateChart(newValue);
  drawBloodSugarChart(newValue);
})

const myCharts = ref<any>();
const temperatureChart = ref<HTMLElement>();
const heartRateChart = ref<HTMLElement>();
const bloodSugarChart = ref<HTMLElement>();

const drawTemperatureChart = ((newValue)=>{

  let temperatureArray = newValue.map(item => {return item.temperature})
  setTimeout(() => {
    // 绘制图表
    myCharts.value = echarts.init(temperatureChart.value!);
    myCharts.value.setOption({
      title: { text: "体温趋势分析图" },
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false, 
        data: state.tableChart.map(item => item.checktime),
      },
      yAxis: {type: 'value'},
      series: [
        {
          name: "体温",
          type: "line",
          smooth: true, 
          data: temperatureArray,
          areaStyle: {}
        },
      ],
    });
  }, 10);
})

const drawHeartRateChart = ((newValue)=>{
  
  let heartrateArray = newValue.map(item => {return item.heartrate});
  let heartrateTimeArray = newValue.map(item => {return item.checktime});
  setTimeout(() => {
    // 绘制图表
    myCharts.value = echarts.init(heartRateChart.value!);
    myCharts.value.setOption({
      visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }
    ],
    
    title: [
      {
        text: '心率指数趋势图'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: heartrateTimeArray
      }
    ],
    yAxis: [
      {}
    ],
    grid: [
      {
        bottom: '60%'
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: heartrateArray 
      }
    ]
    })
  }, 10)

})

const drawBloodSugarChart = ((newValue)=>{
  let bloodsugarArray = newValue.map(item => {return  item.bloodsugar});
  let bloodsugarTimeArray = newValue.map(item => {return item.checktime})
  setTimeout(() => {
    // 绘制图表
    myCharts.value = echarts.init(bloodSugarChart.value!);
    myCharts.value.setOption({
      visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }
    ],
    title: [
      {
        text: '血糖指数趋势图'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: bloodsugarTimeArray
      }
    ],
    yAxis: [
      {}
    ],
    grid: [
      {
        bottom: '60%'
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: bloodsugarArray
      }
    ]
    });
  }, 10);

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

.medicineTable{
  width: 100%;
  margin: 60px 0 50px 50px;
}

.tableStyle{
  width: 100%;
  margin: 60px 0 0 50px;
}

.chart{
  margin: 50px 0px 0px 50px;
  width: 1700px;
  height: 500px;
  margin-bottom: 300px;
}
.colorchart{
  margin: 50px 0px 0px 50px;
  width: 1700px;
  height: 700px;
}

</style>