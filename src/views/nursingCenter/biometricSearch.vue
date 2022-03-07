<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>

<div class="searchArea">
  <el-input
      v-model="searchInput.patientName"
      size="large"
      placeholder="患者姓名"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary"></el-button>
    </template>
  </el-input>

  <el-input
      v-model="searchInput.patientId"
      size="large"
      placeholder="患者身份证号码"
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

  <el-table :data="tableData" stripe class="tableStyle" style="width: 1610px" max-height="600">
    <el-table-column prop="patientname" label="病人姓名" align="center"/>
    <el-table-column prop="patientId" label="身份证号码" align="center"/>
    <el-table-column prop="temperature" label="体温(℃)" align="center"/>
    <el-table-column prop="heartrate" label="心率(次/分)" align="center"/>
    <el-table-column prop="bloodpressure" label="血压(mmHg)" align="center"/>
    <el-table-column prop="bloodsugar" label="血糖(mmol/l)" align="center"/>
    <el-table-column prop="checktime" label="检测时间" align="center"/>
  </el-table>

<div ref="temperatureChart" class="chart"></div>
<div ref="heartRateChart" class="colorchart"></div>
<div ref="bloodSugarChart" class="colorchart"></div>
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'
import { ref } from "vue";
import * as echarts from "echarts";
interface biometric {
  patientname: string,
  patientId: string,
  temperature: string,
  heartrate: string,
  bloodpressure: string,
  bloodsugar: string,
  checktime: string
}

const searchTitle = '体征数据查询'
const searchResult = '体征数据查询结果'
const searchInput = {
  patientName: '',
  patientId: ''
}

const tableData:biometric[] = [
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'50',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  },
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'79',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  },
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'109',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  },
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'69',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  },
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'79',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  },
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'79',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  },
  {
    patientname:'你好',
    patientId:'1341231234',
    temperature:'36',
    heartrate:'79',
    bloodpressure:'80/120',
    bloodsugar:'6.7',
    checktime:'2022-03-03 16:11:23'
  }
]

let temperatureArray = tableData.map(item => {return item.temperature});

let heartrateArray = tableData.map(item => {return item.heartrate});
let heartrateTimeArray = tableData.map(item => {return item.checktime});

let bloodsugarArray = tableData.map(item => {return  item.bloodsugar});
let bloodsugarTimeArray = tableData.map(item => {return item.checktime})

const temperatureChart = ref<HTMLElement>();
const myCharts = ref<any>();
setTimeout(() => {
  // 绘制图表
  myCharts.value = echarts.init(temperatureChart.value!);
  myCharts.value.setOption({
    title: { text: "体温趋势分析图" },
    tooltip: {},
    xAxis: {
      type: 'category',
      boundaryGap: false, 
      data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
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

const heartRateChart = ref<HTMLElement>();

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


const bloodSugarChart = ref<HTMLElement>();

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
      text: '心率指数趋势图'
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
</style>
