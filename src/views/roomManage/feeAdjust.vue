<template>
<el-row :gutter="12">
  <el-col :span="8" v-for="(item,index) in Adjust" :key="index" class="card">
    <el-card shadow="hover">
      <div class="card-room">{{item.roomName}}</div>
      <div class="card-pricemodule">
        <el-input-number v-model="item.price" :min="1" :max="10000" class="card-price"/>
        <div class="card-button">
          <el-button type="primary">保存</el-button>
          <el-button type="info">还原</el-button>、
        </div>
        
      </div>
    </el-card>
  </el-col> 
</el-row>

</template>

<script setup lang="ts">
import { reactive }from 'vue';
import { WARDTYPELIST } from '../const'
  const Adjust = reactive(
    [{
      roomName:WARDTYPELIST[0],
      price: 400
    },{
      roomName:WARDTYPELIST[1],
      price: 200
    },{
      roomName:WARDTYPELIST[2],
      price: 100
    },{
      roomName:WARDTYPELIST[3],
      price: 600
    }])
</script>

<style scoped lang="scss">
.card{
  text-align: center;
  &-room{
    font-weight: 600;
    margin-top: 30px;
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
</style>
