<template>
  <diliver-module :diliver-title="searchTitle"></diliver-module>

  <div class="searchArea">
    <el-input
        v-model="searchInput.workid"
        size="large"
        placeholder="护士编号"
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
        placeholder="护士姓名"
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

  <el-table ref="tableRef" row-key="date" :data="state.tableData" max-height="600" class="nurseTable" style="width: 1610px">
    <el-table-column prop="workid" label="护士编号" align="center"   />
    <el-table-column prop="name" label="护士姓名" align="center"/>
    <el-table-column prop="department" label="科室" align="center"/>
    <el-table-column prop="level" label="职级" align="center" />
    <el-table-column label="申请防护状态" align="center">
      <template #default="scope">{{ DEFENDSTATUSMAP[scope.row.defendStatus] }}</template>
    </el-table-column>
    <el-table-column label="角色" align="center">
      <template #default="scope">{{ roleManage[scope.row.manage] }}</template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="220" align="center">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="askDefend(scope)"
        >
          申请防护用品
        </el-button>

        <el-button
          type="text"
          size="small"
          @click.prevent="manageUser(scope)"
        >
          管理
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    :title="state.dialogInfo.name"
    width="35%"
    
  >
    <template #default>
      <el-dialog
        v-model="innerVisible"
        width="30%"
        title="身份认证"
        append-to-body
        :before-close="handleClose"
      >
        <el-input
          v-model="passwordInput"
          type="password"
          placeholder="请输入您的登录密码"
          show-password
        />
        <el-button type="primary" style="margin:10px 0 0 0" @click="checkPassword">身份验证</el-button>
      </el-dialog>

      <el-select v-model="titleName" placeholder="职称修改">
        <el-option
          v-for="item in NursetitleName"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" style="margin:0px 10px 0 10px" @click="openTitleName">保存</el-button>

      <el-select v-model="identify" placeholder="管理身份">
        <el-option
          v-for="item in manageIdentify"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 10px" @click="openIdentify">保存</el-button>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="删除该用户"
        placement="top"
      >
      <el-button type="danger" :icon="Delete" circle @click="openUserFunc"/>
      </el-tooltip>
    
    </template>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisible" title="防护用品发放单" width="500px">
    <el-form :model="form" label-position="left" ref="ruleFormRef">
      <el-form-item label="护士工号" prop="workid" required>{{form.workid}}</el-form-item>
      <el-form-item label="护士姓名" prop="name" required>{{form.name}}</el-form-item>
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
import { nurseAllInfo, nursePersonalInfo, defendStatusAsking} from '@/utils/api/doctorNurse'
import { DEFENDSTATUSMAP, SUCCESS, roleManage, NursetitleName, manageIdentify, roleManageChinToEng} from '../const'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { passwordCheck, updateTitleName, updateIdentify, deleteUser } from '@/utils/api/doctorNurse'

type FormInstance = InstanceType<typeof ElForm>


interface nurseInfo{
  workid: string,
  name: string,
  department: string,
  level: string,
  defendStatus: string,
  role: string
}

const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const dialogVisible = ref(false)
const innerVisible = ref(false)
const identify = ref('')
const passwordInput = ref('')
const titleName = ref('')
const checkType = ref('')
const form = reactive({
  workid: '',
  name: '',
  defendList: [],
})


const searchTitle = '护士查询'
const searchResult = '护士列表 & 查询结果'
const searchInput = reactive({
  workid: '',
  name: ''
})

let state = reactive({
  tableData:  [] as nurseInfo[],
  dialogInfo: {} as nurseInfo
})

const askDefend= (scope) => {
  dialogFormVisible.value = true
  form.workid = scope.row.workid,
  form.name = scope.row.name
}

const refreshTable =async () => {
  let {data} = await nurseAllInfo(null);
  state.tableData = data.result;
  console.log(state.tableData)
}

onMounted(()=> {
  refreshTable()
})

const getPersonalDoctorInfo =async ()=>{
  let {data} = await nursePersonalInfo(searchInput)
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

const manageUser = (scope)=>{
  if(localStorage.getItem('manage') === 'manager'){
    dialogVisible.value = true;
    state.dialogInfo = scope.row;
    titleName.value = scope.row.level;
    identify.value = roleManage[scope.row.manage]
  }else{
    ElMessage({
      message: '抱歉，权限不足！',
      type: 'warning',
      duration: 2000
    })
  }
}

const checkPassword =async ()=>{
  let requestBody = {
    'workid' : state.dialogInfo.workid,
    'password' : passwordInput.value
  }
  let {data} = await passwordCheck(requestBody)
  let titleRequestBody = {
    'workid' : state.dialogInfo.workid,
    'titleName' : titleName.value
  }
  let identifyBody = {
    'workid' : state.dialogInfo.workid,
    'identify' : roleManageChinToEng[identify.value]
  }
  let delRequestBody = {
    'workid' : state.dialogInfo.workid
  }
  if(data.code === 200){
    
    if(checkType.value === 'saveTitleName') saveTitleName(titleRequestBody)
    if(checkType.value === 'saveIdentify') saveIdentify(identifyBody)
    if(checkType.value === 'deleteUserFunc') deleteUserFunc(delRequestBody)
  }else{
    ElMessage({
      message: data.msg,
      type: 'warning',
      duration: 2000
    })
  }
}

const openTitleName = ()=>{
  innerVisible.value = true
  checkType.value = 'saveTitleName'
  
}

const saveTitleName = async (requestBody)=>{
  let {data} = await updateTitleName(requestBody)
  if(data.code === 200){
    ElMessage({
      message: data.msg,
      type: 'success',
      duration: 2000
    })
    refreshTable()
  }else{
    ElMessage({
      message: data.msg,
      type: 'warning',
      duration: 2000
    })
  }
}

const openIdentify = ()=>{
  innerVisible.value = true
  checkType.value = 'saveIdentify'
  
}

const saveIdentify = async (requestBody)=> {
  let {data} = await updateIdentify(requestBody)
  if(data.code === 200) {
    ElMessage({
      message: data.msg,
      type: 'success',
      duration: 2000
    })
    refreshTable()
  }else{
    ElMessage({
      message: data.msg,
      type: 'warning',
      duration: 2000
    })
  }
}

const openUserFunc = ()=>{
  innerVisible.value = true
  checkType.value = 'deleteUserFunc'
  
}

const deleteUserFunc = async (requestBody)=>{
  let {data} = await deleteUser(requestBody)
  if(data.code === 200){
    ElMessage({
      message: data.msg,
      type: 'success',
      duration: 2000
    })
    refreshTable()
  }else{
    ElMessage({
      message: data.msg,
      type: 'warning',
      duration: 2000
    })
  }
}

const handleClose = (done: () => void) => {
  passwordInput.value = '';
  done()
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

.nurseTable{
  width: 100%;
  margin: 60px 0 0 50px;
}
</style>
