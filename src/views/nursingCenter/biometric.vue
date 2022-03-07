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
    <el-form-item label="血压(mmHg)" prop="bloodpressure" required>
      <el-input v-model="ruleForm.bloodpressure"></el-input>
    </el-form-item>
    <el-form-item label="血糖(mmol/l)" prop="bloodsugar" required>
      <el-input v-model="ruleForm.bloodsugar"></el-input>
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

type FormInstance = InstanceType<typeof ElForm>

const formSize = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  idnum: '',
  temperature: '',
  heartrate: '',
  bloodpressure: '',
  bloodsugar: ''
})

const searchTitle = '体征测量数据录入'

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(ruleForm)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log()
      console.log('submit!')
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
