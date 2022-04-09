<template>
  <diliver-module :diliver-title="wardTitle"></diliver-module>

    <el-carousel :interval="4000" type="card" class="carousel">
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
                    <el-icon><wallet-filled /></el-icon>
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
                    <el-icon><wallet-filled /></el-icon>
                  </el-icon>
                  <span>病房床位数</span>
              </div>
              </template>
              <span>{{item.wardBed.length}}</span>
            </el-descriptions-item>
        </el-descriptions>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>

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

        <h4 v-if="Object.keys(state.totalDescriptions).length === 0">暂无病人信息</h4>
        
        <el-descriptions
          class="feeDetails"
          title="该病床病人信息"
          :column="1"
          :size="size"
          border
          v-if="Object.keys(state.totalDescriptions).length > 0"
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
      
      </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, computed}from 'vue';
import { wardFindInfo, wardUpdatePrice, wardFindType, getWardPatientInfo} from '@/utils/api/ward';
import { wardListAll } from '@/utils/api/wardList'
import { ElMessage,ElMessageBox } from 'element-plus'
import { SUCCESS } from '../const'
import diliverModule from '@/views/components/diliverModule.vue'
import { DESCRIPTIONS } from '@/views/const'
import type { ElForm } from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

let state = reactive({
  wardInfoArr : [],
  totalDescriptions:[]
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
const bedOptions = ref([])
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
const getAdjust =async ()=>{
  let {data} = await wardListAll(null)
  state.wardInfoArr = data.result;
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

const openDrawer = (wardType, wardRoom, wardBed)=>{
  drawer.value=true
  ward.wardType = wardType
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
  ElMessageBox.confirm('确定关闭详情弹窗？')
    .then(() => {
      done();
      roomOptions.value=[],
      bedOptions.value=[]
    })
    .catch(() => {
      // catch error
    })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let {data} = await getWardPatientInfo(ward)
      state.totalDescriptions = data.result[0]
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
  margin-top: 300px;
}

.butRight{
  margin-left: 300px;
}

:deep(.el-input__inner){
  width: 300px;
}

:deep(.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell){
  width: 500px;
}
</style>
