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
    <el-form-item label="体温(℃)" prop="temperature" required>
      <el-input v-model="ruleForm.temperature"></el-input>
    </el-form-item>
    <el-form-item label="心率(次/分)" prop="heartrate" required>
      <el-input v-model="ruleForm.heartrate"></el-input>
    </el-form-item>
    <el-form-item label="血糖(mmol/l)" prop="bloodsugar" required>
      <el-input v-model="ruleForm.bloodsugar"></el-input>
    </el-form-item>
    <el-form-item label="新冠核酸检测" prop="covid" required>
      <el-select v-model="ruleForm.covid" placeholder="检测结果">
        <el-option label="阴性" value="阴性"></el-option>
        <el-option label="阳性" value="阳性"></el-option>
      </el-select>
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
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { biometricAdd } from '@/utils/api/biometric'
import { SUCCESS } from '../const';
import { ElMessage } from 'element-plus'
import {formatTime} from '@/utils/index'
type FormInstance = InstanceType<typeof ElForm>

const formSize = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  idnum: '',
  temperature: '',
  heartrate: '',
  bloodsugar: '',
  covid: ''
})

const searchTitle = '体征测量数据录入'

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let requestBody = {
        ...ruleForm,
        biometricStatus:'inHospital',
        checktime : formatTime(new Date())
      }
      let {data} = await biometricAdd(requestBody)
      if(data.code === SUCCESS){
        ElMessage({
          message: data.msg,
          type: 'success',
          duration: 500
        })
      }else{
        ElMessage({
          message: data.msg,
          type: 'error',
          duration: 500
        })
      }
    } else {
      console.log('error submit!')
      return false
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
