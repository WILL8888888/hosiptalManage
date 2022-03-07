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

    <el-form-item label="病房类型" prop="wardtype" required>
      <el-select v-model="ruleForm.wardtype" placeholder="病房类型">
        <el-option v-for="(item,index) in WARDTYPELIST" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="病房号" prop="wardnum" required>
      <el-select v-model="ruleForm.wardnum" placeholder="病房号">
        <el-option v-for="(item,index) in WARDNUMLIST" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="床位号" prop="bednum" required>
      <el-select v-model="ruleForm.bednum" placeholder="床位号">
        <el-option v-for="(item,index) in BEDNUMLIST" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="入院病情" prop="condition" required>
      <el-select v-model="ruleForm.condition" placeholder="床位号">
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
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

import {
  DOCTORLIST,
  WARDTYPELIST,
  WARDNUMLIST,
  BEDNUMLIST,
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
  departmentDoctor: '',
  wardtype: WARDTYPELIST[2],
  wardnum: '',
  bednum:'',
  condition: '',
  date: ''
})

const searchTitle = '入院登记'

const options = DOCTORLIST
const props = {
  expandTrigger: 'hover',
}

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
