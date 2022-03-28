<template>
  <diliver-module :diliver-title="wardTitle"></diliver-module>

    <el-carousel :interval="4000" type="card" class="carousel">
      <el-carousel-item v-for="item in state.Adjust" :key="item">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{item.roomName}}</span>
              <el-button class="button" type="text">Operation button</el-button>
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

</template>

<script setup lang="ts">
import { reactive, onMounted, ref, computed}from 'vue';
import { wardInfo, wardUpdatePrice} from '@/utils/api/ward';
import { ElMessage } from 'element-plus'
import { SUCCESS } from '../const'
import diliverModule from '@/views/components/diliverModule.vue'

let state = reactive({
  Adjust : [{
    roomName: '',
    price: 0,
    wardRoom: [],
    wardBed: []
  }]
})
const size = ref('')
const wardTitle = '病房信息中心'
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
  let {data} = await wardInfo(null)
  state.Adjust = data.result.map(item => {return {
    roomName: item.wardType,
    price: item.price,
    wardRoom: item.wardRoom,
    wardBed: item.wardBed
  }})
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
</style>
