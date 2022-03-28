<template>
  <diliver-module :diliver-title="searchTitle"></diliver-module>

  <div class="searchArea">
    <el-input
        v-model="searchInput.workid"
        size="large"
        placeholder="医生编号"
        :prefix-icon="Search"
        :clearable="true"
        class="searchArea-idsearch"
      >
      <template #append>
        <el-button :icon="Search" type="primary" @click="getPersonalDoctorInfo"></el-button>
      </template>
    </el-input>

    <el-input
        v-model="searchInput.name"
        size="large"
        placeholder="医生姓名"
        :prefix-icon="Search"
        :clearable="true"
        class="searchArea-nameserach"
      >
      <template #append>
        <el-button :icon="Search" type="primary" @click="getPersonalDoctorInfo"></el-button>
      </template>
    </el-input>
  </div>

  <diliver-module :diliver-title="searchResult"></diliver-module>

  <el-table ref="tableRef" row-key="date" :data="state.tableData" max-height="600" class="doctorTable" style="width: 1610px">
    <el-table-column prop="workid" label="医生编号" align="center"   />
    <el-table-column prop="name" label="医生姓名" align="center"/>
    <el-table-column prop="department" label="科室" align="center"/>
    <el-table-column prop="level" label="职级" align="center" />
    <el-table-column label="申请防护状态" align="center">
      <template #default="scope">{{ DEFENDSTATUSMAP[scope.row.defendStatus] }}</template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120" align="center">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="askDefend(scope)"
        >
          申请防护用品
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="防护用品发放单" width="500px">
    <el-form :model="form" label-position="left" ref="ruleFormRef">
      <el-form-item label="医生工号" prop="workid" required>{{form.workid}}</el-form-item>
      <el-form-item label="医生姓名" prop="name" required>{{form.name}}</el-form-item>
      <el-form-item label="发放防护用品清单" prop="defendList" required>
      <el-checkbox-group v-model="form.defendList">
        <el-checkbox label="医用射线铅手套" name="defendList"></el-checkbox>
        <el-checkbox label="3502工厂灭菌医用防护服" name="defendList"></el-checkbox>
        <el-checkbox label="3M医用防护口罩" name="defendList"></el-checkbox>
        <el-checkbox label="医用防护面罩" name="defendList"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >确认发放</el-button
        >
      </span>
    </template>
  </el-dialog>
</template> 

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { Search } from '@element-plus/icons'
import { ref, reactive,onMounted } from 'vue';
import { doctorAllInfo, doctorPersonalInfo, defendStatusAsking} from '@/utils/api/doctorNurse'
import { DEFENDSTATUSMAP, SUCCESS } from '../const'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)

const form = reactive({
  workid: '',
  name: '',
  defendList: [],
})

interface doctorInfo{
  workid: string,
  name: string,
  department: string,
  level: string,
  defendStatus: string
}

const searchTitle = '医生查询'
const searchResult = '医生列表 & 查询结果'
const searchInput = reactive({
  workid: '',
  name: ''
})

let state = reactive({
  tableData:  [] as doctorInfo[]
})

const askDefend= (scope) => {
  dialogFormVisible.value = true
  form.workid = scope.row.workid,
  form.name = scope.row.name
}

const refreshTable =async () => {
  let {data} = await doctorAllInfo(null);
  state.tableData = data.result
}

onMounted(()=> {
  refreshTable()
})

const getPersonalDoctorInfo =async ()=>{
  let {data} = await doctorPersonalInfo(searchInput)
  state.tableData = data.result
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    let {data}= await defendStatusAsking(form)
    if (valid) {
      if(data.code === SUCCESS){
        refreshTable()
        ElMessage({
          message: data.msg,
          type: 'success',
          duration: 500
        })
      }else {
          ElMessage({
          message: data.msg,
          type: 'error',
        })
        return false
      }
      dialogFormVisible.value = false
    } 
  })
}
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

:deep(.el-input-group__append){
  background-color: #409Eff;
  color: #fff;
}

.doctorTable{
  width: 100%;
  margin: 60px 0 0 50px;
}
</style>
