<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>
<el-card shadow="always" class="cardCss"> 
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    :inline="true"
    label-position="left"
    :show-message="false"
  >
    <el-form-item label="姓名" prop="name" required>
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="idnum" required>
      <el-input v-model="ruleForm.idnum"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender" required>
      <el-select v-model="ruleForm.gender" placeholder="性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="家庭住址" prop="address" required>
      <el-input v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item label="科室/主治医师" prop="departmentDoctor" required>
      <el-cascader
        v-model="ruleForm.departmentDoctor"
        :options="options"
        :props="props"
        placeholder="选择科室/主治医师"
        required="true"
      ></el-cascader>
    </el-form-item>

    <el-form-item label="病房病床信息" prop="wardInfo" required>
      <el-cascader :options="BedMap" clearable placeholder="病房病床信息" v-model="ruleForm.wardInfo"/>
    </el-form-item>

    <el-form-item label="入院病情" prop="condition" required>
      <el-select v-model="ruleForm.condition" placeholder="入院病情">
        <el-option v-for="(item,index) in CONDITIONS" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="入院时间" prop="date" required>
      <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择入院时间" value-format="YYYY-MM-DD"></el-date-picker>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登记</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>  
</el-card>
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { reactive, ref, onMounted} from 'vue'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { patientInfo } from '@/utils/api/patientAbout'
import { SUCCESS }  from '../const'
import { wardInfoFilter} from '@/utils/api/ward';
import {treeMake} from '@/utils/index'

import {
  DOCTORLIST,
  CONDITIONS
} from '../const'

type FormInstance = InstanceType<typeof ElForm>

const formSize = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  idnum: '',
  gender: '',
  address: '',
  departmentDoctor: [] as any,
  wardInfo: [] as any,
  condition: '',
  date: '',
  timeStamps: '' as any,
  patientStatus: 'inHospital'
})

const searchTitle = '入院登记'
let BedMap = ref([])
const options = DOCTORLIST
const props = {
  expandTrigger: 'hover',
}

const getWardInfo =async ()=>{
  let {data} = await wardInfoFilter(null)
  data.result.forEach(item => {
    let wardObj = {
      info: '',
      children: []
    }

    wardObj.info = item?.wardType;

    item?.wardRoom?.forEach(room=>{
      let roomObj = {
        info: room,
        children: []
      }
      item?.wardBed[room]?.forEach(bed => {
        if(!bed.patientId){
          roomObj?.children?.push({'info':bed.bedNum})
        }
      })
      wardObj?.children?.push(roomObj)
    })
    BedMap?.value?.push(wardObj)
  })
  BedMap.value = treeMake(BedMap.value)
}

onMounted(()=>{
  getWardInfo();
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      ruleForm.departmentDoctor = ruleForm.departmentDoctor.join('/')
      ruleForm.wardInfo = ruleForm.wardInfo.join('/')
      ruleForm.timeStamps = new Date().getTime()
      let {data} = await patientInfo(ruleForm);
      if(data.code === SUCCESS){
          ElMessage({
            message: data.msg,
            type: 'success',
            duration: 500
          })
          formEl.resetFields()
      } else {
        ElMessage({
            message: data.msg,
            type: 'error',
          })
        return false
      }
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.cardCss{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}

:deep(.el-input__inner) {
  width: 214px;
}
</style>
