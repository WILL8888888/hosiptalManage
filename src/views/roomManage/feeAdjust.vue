<template>
  <diliver-module :diliver-title="wardTitle"></diliver-module>

    <el-carousel :interval="4000" type="card" class="carousel" v-if="state.wardInfoArr.length > 0">
      <el-carousel-item v-for="item in state.wardInfoArr" :key="item">
      
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{item.wardType}}</span>
              <el-button class="button" type="text" @click="openDrawer(item.wardType, item.wardRoom, item.wardBed)">查看病床对应具体信息</el-button>
            </div>
          </template>
          <div class="card-pricemodule">
            
            <el-descriptions
            class="wardDesciption"
            title="病房信息"
            :column="2"
            :size="size"
            border
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <el-icon><wallet-filled /></el-icon>
                    </el-icon>
                    <span>病房价格：</span>
                </div>
                
              </template>
              <span>{{item.price}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <el-icon><home-filled /></el-icon>
                  </el-icon>
                  <span>病房房号汇总</span>
                </div>
              </template>
              <span>{{item.wardRoom.join(', ')}}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle">
                    <el-icon><takeaway-box /></el-icon>
                  </el-icon>
                  <span>病房床位数</span>
              </div>
              </template>
              <span>{{item.wardBed.length}}</span>
            </el-descriptions-item>
          </el-descriptions>
          <div class="butSave">
            <el-button type="primary" @click="openAdjustWindow(item.wardType, item.price, item.wardBed)">修改病房信息</el-button>
          </div>
          </div>
        </el-card>
      </el-carousel-item>

    </el-carousel>
    
    <el-dialog v-model="dialogFormVisible" :title="wardTypedialog" width="500px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="病房价格调整" name="wardPriceTag">
          <el-input-number v-model="priceAdjust" :step="10" />
        </el-tab-pane>
        <el-tab-pane label="病房房间添加" name="wardNameTag">
          <el-input v-model="roomName" placeholder="房间名称">
            <template #prepend>新添房间名称</template>
          </el-input>
          <el-input v-model="bedNum" placeholder="" disabled style="margin-top: 10px;">
            <template #prepend>新房间床位数</template>
          </el-input>
          <el-input v-model="newRoomNurseId" placeholder="护士工号" style="margin-top: 10px;">
            <template #prepend>负责该房护士</template>
          </el-input>
          <el-input v-model="newRoomDoctorId" placeholder="医生工号" style="margin-top: 10px;">
            <template #prepend>负责该房医生</template>
          </el-input>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click="adjustSure()"
            >确认修改</el-button>
        </span>
      </template>
    </el-dialog>

    <el-drawer v-model="drawer" title="I am the title" :with-header="true" direction="rtl" :before-close="handleClose">
      
      <template #title>
        <h4>输入病房信息</h4>
      </template>
      <template #default>
        
        <el-form
          ref="ruleFormRef"
          :model="ward"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item  class="m-2" required prop="wardType" label="病房类型">
            <el-input v-model="ward.wardType" disabled placeholder="病房类型"/>
          </el-form-item>
          <el-form-item  class="m-2" required prop="wardRoom" label="病房号">
            <el-select v-model="ward.wardRoom" placeholder="病房号" fit-input-width="true">
              <el-option
                v-for="item in roomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item  class="m-2" required prop="wardBed" label="病床号">
            <el-select v-model="ward.wardBed" placeholder="病床号" fit-input-width="true">
              <el-option
                v-for="item in bedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="butRight">
          <el-button @click="resetForm(ruleFormRef)">恢复</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        </div>

        <h4>该房型剩余床位</h4>

        <el-table :data="state.spareBed" style="width: 100%; margin-top: 40px;">
          
          <el-table-column type="expand">
            <template #default="props">
              <p>剩余床位： {{ props.row.wardBed.join(', ') }}</p>
            </template>
          </el-table-column>
          <el-table-column label="房型" prop="wardRoom" />
          <el-table-column label="剩余床位" align="center">
            <template #default="scope">{{`${scope.row.wardBed.length}`}}</template>
          </el-table-column>
        </el-table>

        <div  v-if="!state.totalDescriptions">
          <h4>暂无病人信息</h4>
        </div>
        
        <div  v-if="state.totalDescriptions">
          <el-descriptions
          class="feeDetails"
          title="该病床病人信息"
          :column="1"
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
            <span>{{state.totalDescriptions[item.key]}}</span>
          </el-descriptions-item>
          </el-descriptions>

          <el-table ref="tableRef" row-key="date" :data="state.tableData" max-height="600" class="medicineTable" style="width: 1610px;margin-top: 30px;">
            <el-table-column prop="medicineid" label="药物编号" align="center"/>
            <el-table-column prop="medicineName" label="药物名称" align="center"/>
            <el-table-column prop="price" label="药品价格" align="center"/>
            <el-table-column prop="medicineNum" label="药品剂量数" align="center"/>
          </el-table>

          <el-table :data="state.bioTableData" stripe class="tableStyle" style="width: 1610px;margin-top: 30px;" max-height="600">
            <el-table-column prop="name" label="病人姓名" align="center"/>
            <el-table-column prop="idnum" label="身份证号码" align="center"/>
            <el-table-column prop="temperature" label="体温(℃)" align="center"/>
            <el-table-column prop="heartrate" label="心率(次/分)" align="center"/>
            <el-table-column prop="bloodsugar" label="血糖(mmol/l)" align="center"/>
            <el-table-column prop="covid" label="新冠检测结果" align="center"/>
          </el-table>

          <div ref="temperatureChart" class="chart"></div>
          <div ref="heartRateChart" class="colorchart"></div>
          <div ref="bloodSugarChart" class="colorchart"></div>
        </div>
        
      </template>
    </el-drawer>


</template>

<script setup lang="ts">
import { reactive, onMounted, ref, computed, watch}from 'vue';
import { wardUpdatePrice, getWardPatientInfo, wardSpareBed, wardAddRoom} from '@/utils/api/ward';
import { wardListAll, wardPriceAdjust, wardListUpdate} from '@/utils/api/wardList'
import { biometricSearch } from '@/utils/api/biometric'
import { medicineListSearchOne } from '@/utils/api/medicineList'
import { ElMessage, ElNotification } from 'element-plus'
import { SUCCESS } from '../const'
import diliverModule from '@/views/components/diliverModule.vue'
import { DESCRIPTIONS } from '@/views/const'
import type { ElForm, TabsPaneContext } from 'element-plus'
import * as echarts from "echarts";


type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

interface Medicine {
  medicineid: string,
  medicineName: string,
  price:number,
  medicineNum:number,
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

let state = reactive({
  wardInfoArr : [],
  totalDescriptions: null,
  medicineList: null,
  tableData :[] as Medicine[],
  bioTableData: [] as biometric[],
  spareBed : []
})
let ward = reactive({
  wardType: '',
  wardRoom: '',
  wardBed: ''
})
const size = ref('')
const wardTitle = '病房信息中心'
const drawer = ref(false)
const roomOptions = ref([]);
const bedOptions = ref([]);
const activeName = ref('wardPriceTag');
const dialogFormVisible = ref(false);
const priceAdjust = ref(0);
const wardTypedialog = ref('');
const roomName = ref('');
const bedNum = ref('');
const newRoomNurseId = ref('');
const newRoomDoctorId = ref('');
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

watch(() => state.bioTableData, (newValue, oldValue) => {
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
        data: state.bioTableData.map(item => item.checktime),
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

const getAdjust =async ()=>{
  let {data} = await wardListAll(null)
  state.wardInfoArr = data.result;
  console.log(state.wardInfoArr)
}

onMounted(()=>{
  getAdjust()
})

const saveInfo=async (item)=>{
  let {data} = await wardUpdatePrice(item)
  if(data.code === SUCCESS){
    ElMessage({
      message: data.msg,
      type: 'success',
      duration: 500
    })
  }else{
    ElMessage({
      message: data.msg,
      type: 'error'
    })
  }
}

const openDrawer =async (wardType, wardRoom, wardBed)=>{
  drawer.value=true
  ward.wardType = wardType
  let {data} = await wardSpareBed({'wardType':ward.wardType});
  let obj = {}
  data.result.forEach(item=>{
    let property = item.wardRoom
    if(obj.hasOwnProperty(property)){
      obj[property].push(item.wardBed)
    }else{
      obj[property] = [item.wardBed]
    }
  })
  
  for(let i in obj){
    state.spareBed.push({
      'wardRoom': i,
      'wardBed' : obj[i]
    })
  }

  getSelectTree(wardRoom,roomOptions.value)
  getSelectTree(wardBed,bedOptions.value)
}

const getSelectTree = (arrConfig,treeOption)=>{
  arrConfig.forEach(item=>{
    let optionObj={
      value: item,
      label: item
    }
    treeOption.push(optionObj)
  })
}

const handleClose = (done: () => void) => {
  
  done();
  roomOptions.value=[],
  bedOptions.value=[],
  resetForm(ruleFormRef.value)
  state.totalDescriptions = null
  state.spareBed= []
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let {data} = await getWardPatientInfo(ward)
      state.totalDescriptions = data.result[0]
      console.log(state.totalDescriptions)
      if(state.totalDescriptions){

      
        let medicineInfo = await medicineListSearchOne({'idnum': state.totalDescriptions.idnum})
        state.tableData = medicineInfo.data.result

        let biometricSearchData = await biometricSearch({'idnum': state.totalDescriptions.idnum});
        let res = biometricSearchData.data.result[0]
        let tableArr = []
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
    
        state.bioTableData = tableArr
      }
      else{
        ElNotification.info({
          title: '空余床位',
          message: '此床位暂无病人选择，暂无病人信息',
          offset: 100,
          duration: 2000
        })
      }
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const openAdjustWindow = (wardType, price, bed) => {
  dialogFormVisible.value = true
  priceAdjust.value = price;
  wardTypedialog.value = wardType
  bedNum.value = bed.length
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const adjustSure =async () => {
  if(activeName.value === 'wardPriceTag'){
    let requestBody = {
    'wardType': wardTypedialog.value,
    'price': priceAdjust.value
    }
    let {data} = await wardPriceAdjust(requestBody)
    if(data.code === 200){
      ElMessage({
        message: data.msg,
        type: 'success'
      });
      getAdjust();
    }else{
      ElMessage({
        message: data.msg,
        type: 'error'
      })
    }
    refreshWardDialog()
  }else if(activeName.value === 'wardNameTag'){
    let requestBody = {
      'wardType' : wardTypedialog.value,
      'roomName': roomName.value,
      'bedNum' : bedNum.value,
      'newRoomNurseId' : newRoomNurseId.value,
      'newRoomDoctorId' : newRoomDoctorId.value
    }
    let {data} = await wardAddRoom(requestBody);
    let requestWardList = {
      'wardType': wardTypedialog.value,
      'roomName' : roomName.value
    }
    await wardListUpdate(requestWardList)
    if(data.code === 200){
      ElMessage({
        message: data.msg,
        type: 'success'
      });
      getAdjust();
    }else{
      ElMessage({
        message: data.msg,
        type: 'error'
      })
    }
    refreshWardDialog()
  }
}

const refreshWardDialog = ()=>{
  roomName.value = '',
  newRoomNurseId.value = '',
  newRoomDoctorId.value = ''
}

const cancelDialog = ()=>{
  refreshWardDialog()
  dialogFormVisible.value = false
}
</script>

<style scoped lang="scss">
.card{
  text-align: center;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  }
  &-pricemodule{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-price{
    font-weight: 600;
    margin: 30px 0;
  }
  &-button{
    padding-left: 20px;
  }
}

.wardDesciption{
  width: 90%;
}

.carousel{
  margin-top: 50px;
}


.butRight{
  margin-left: 300px;
}

.butSave{
  margin:20px 0 0 580px;
}

.chart{
  margin: 50px 0px 0px 0px;
  width: 570px;
  height: 400px;
  margin-bottom: 300px;
}
.colorchart{
  margin: 50px 0px 0px 0px;
  width: 570px;
  height: 400px;
}

:deep(.el-input__inner){
  width: 300px;
}

:deep(.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell){
  width: 500px;
}

:deep(.el-input-number){
  width: auto;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
