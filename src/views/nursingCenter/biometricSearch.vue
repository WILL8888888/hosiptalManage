<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>
<div class="searchArea">
  <el-input
      v-model="searchInput[select]"
      size="large"
      :placeholder="select === 'idnum'?'身份证号':'患者姓名'"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary" @click="findBiometric"></el-button>
    </template>
    <template #prepend>
      <el-select v-model="select" placeholder="搜索类型" style="width: 180px">
        <el-option label="身份证号" value="idnum" />
        <el-option label="患者姓名" value="name" />
      </el-select>
    </template>
  </el-input>
</div>

<diliver-module :diliver-title="searchResult"></diliver-module>

  <el-table :data="state.tableData" stripe class="tableStyle" style="width: 1610px" max-height="600">
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
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'
import { reactive, ref, watch} from "vue";
import * as echarts from "echarts";
import { biometricSearch } from '@/utils/api/biometric'

interface biometric {
  name: string,
  idnum: string,
  temperature: string,
  heartrate: string,
  bloodsugar: string,
  covid: string,
  checktime: string
}

const searchTitle = '体征数据查询'
const searchResult = '体征数据查询结果'
const searchInput = reactive({
  name: '',
  idnum: ''
})

const select = ref('idnum')

const state = reactive({
  tableData: [] as biometric[]
})

watch(() => state.tableData, (newValue, oldValue) => {
  drawTemperatureChart(newValue);
  drawHeartRateChart(newValue);
  drawBloodSugarChart(newValue);
})

const findBiometric =async ()=>{
  let {data} = await biometricSearch(select.value === 'idnum'?{'idnum': searchInput.idnum}:{'name':searchInput.name});
  state.tableData = data.result
}

const myCharts = ref<any>();
const temperatureChart = ref<HTMLElement>();
const heartRateChart = ref<HTMLElement>();
const bloodSugarChart = ref<HTMLElement>();

const drawTemperatureChart = ((newValue)=>{

  let temperatureArray = newValue.map(item => {return item.temperature});
  setTimeout(() => {
    // 绘制图表
    myCharts.value = echarts.init(temperatureChart.value!);
    myCharts.value.setOption({
      title: { text: "体温趋势分析图" },
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false, 
        data: state.tableData.map(item => item.checktime),
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
  display: flex;
  justify-content: space-between;
  width: 1000px;
  &-idsearch{
    width: 646px;
  }
}

.tableStyle{
  width: 100%;
  margin: 60px 0 0 50px;
}

:deep(.el-input-group__append){
  background-color: #409Eff;
  color: #fff;
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

:deep(.el-select .el-input__inner){
  border: none;
}
</style>
