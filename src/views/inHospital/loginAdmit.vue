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

    <el-form-item label="病房类型" prop="wardType" required>
      <el-select v-model="ruleForm.wardType" placeholder="入院病情" @change="getWardRoom()">
        <el-option v-for="(item,index) in state.Type" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="病室" prop="wardRoom" required>
      <el-select v-model="ruleForm.wardRoom" placeholder="入院病情" @change="getWardBed()">
        <el-option v-for="(item,index) in state.Room" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="病床号" prop="wardBed" required>
      <el-select v-model="ruleForm.wardBed" placeholder="入院病情">
        <el-option v-for="(item,index) in state.Bed" :key="index" :label="item" :value="item" ></el-option>
      </el-select>
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
import { wardFindRoom, wardFindType, wardFindBed, wardInPatient} from '@/utils/api/ward';

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
  wardType: '',
  wardRoom: '',
  wardBed: '',
  condition: '',
  date: '',
  timeStamps: '' as any,
  patientStatus: 'inHospital'
})

const searchTitle = '入院登记'

let state = reactive({
  Type: [],
  Room: [],
  Bed: []
})

const options = DOCTORLIST
const props = {
  expandTrigger: 'hover',
}

const getWardInfo =async ()=>{
  let {data} = await wardFindType(null)
  state.Type = data.result
}

onMounted(()=>{
  getWardInfo();
})

const getWardRoom =async ()=>{
  let requestBody = {
    'wardType': ruleForm.wardType
  }
  let {data} = await wardFindRoom(requestBody)
  state.Room = data.result
}

const getWardBed = async ()=>{
  let requestBody = {
    'wardType': ruleForm.wardType,
    'wardRoom': ruleForm.wardRoom
  }

  let {data} = await wardFindBed(requestBody)
  state.Bed = data.result
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      ruleForm.departmentDoctor = ruleForm.departmentDoctor.join('/')
      ruleForm.timeStamps = new Date().getTime()
      let {data} = await patientInfo(ruleForm);
      let requestBody = {
        wardType: ruleForm.wardType,
        wardRoom: ruleForm.wardRoom,
        wardBed: ruleForm.wardBed,
        patientId: ruleForm.idnum
      }
      await wardInPatient(requestBody)
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
