<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>

<div class="searchArea">
  <el-input
      v-model="searchInput.medicineid"
      size="large"
      placeholder="药品编号"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary" @click="findDefend"></el-button>
    </template>
  </el-input>

  <el-input
      v-model="searchInput.medicineName"
      size="large"
      placeholder="药品名称"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-nameserach"
    >
    <template #append>
      <el-button :icon="Search" type="primary" @click="findDefend"></el-button>
    </template>
  </el-input>
</div>

<diliver-module :diliver-title="resultTitle"></diliver-module>

<el-button type="primary" class="addBut" :icon="Plus" @click="dialogFormVisible = true">新增药品</el-button>

<el-table :data="state.tableData" stripe class="tableStyle" style="width: 1610px" max-height="600">
  <el-table-column prop="medicineid" label="药品编号" align="center"/>
  <el-table-column prop="medicineName" label="药品名称" align="center"/>
  <el-table-column prop="inventory" label="库存数量" align="center"/>
  <el-table-column fixed="right" label="操作" width="120" align="center">
    <template #default="scope">
      <el-button
        type="text"
        size="small"
        @click.prevent="addDefend(scope)"
      >
        新增库存
      </el-button>
    </template>
  </el-table-column>
</el-table>

<el-dialog v-model="dialogFormVisible" title="药品新增" width="500px">
  <el-form :model="form" label-position="left" ref="ruleFormRef">
    <el-form-item label="医药品编号" prop="medicineid" required>
      <el-input v-model="form.medicineid"></el-input>
    </el-form-item>
    <el-form-item label="医药品名字" prop="medicineName" required>
      <el-input v-model="form.medicineName"></el-input>
    </el-form-item>
    <el-form-item label="医药品价格" prop="price" required>
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="库存进货量" prop="inventory" required>
      <el-input v-model="form.inventory"></el-input>
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
import { Search, Plus} from '@element-plus/icons'
import { ref, reactive, onMounted} from 'vue';
import { medicineSearchAll, medicineSearchOne } from '@/utils/api/medicine'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
import { medicineAdd } from '@/utils/api/medicine'
import { SUCCESS } from '../const'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const form = reactive({
  medicineid: '',
  medicineName: '',
  price: '' as number|string,
  inventory: '' as number|string,
})
const searchTitle = '药品品库存查询'
const resultTitle = '药品库存查询结果'
const searchInput = reactive({
  medicineid: '',
  medicineName: ''
})

interface medicineNumber {
  medicineid: string,
  medicineName: string,
  price: number|string,
  inventory: number|string
}

const state = reactive({
  tableData: [] as medicineNumber[]
})

const refreshTable =async () => {
  let {data} = await medicineSearchAll(null)
  state.tableData= data.result
}

onMounted(()=>{
  refreshTable()
})

const findDefend =async ()=>{
  let requestBody = {
    medicineid : searchInput.medicineid,
    medicineName: searchInput.medicineName
  }
  let {data} = await medicineSearchOne(requestBody)
  state.tableData= data.result
}

const addDefend =async (scope)=>{
  dialogFormVisible.value = true
  form.medicineid = scope.row.medicineid;
  form.medicineName = scope.row.medicineName;
  form.price = scope.row.price;
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    form.inventory = Number(form.inventory)
    let {data}= await medicineAdd(form)
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
      dialogReset(formEl)
    } 
  })
}

const dialogReset = (formEl: FormInstance | undefined)=>{
  if (!formEl) return
  formEl.resetFields()
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

.tableStyle{
  width: 100%;
  margin: 30px 0 0 50px;
}

.addBut{
  margin: 30px 0 0 50px;
}
</style>
