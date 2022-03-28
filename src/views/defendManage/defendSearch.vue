<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>

<div class="searchArea">
  <el-input
      v-model="searchInput[select]"
      size="large"
      :placeholder="select==='defendid'?'防护用品编号':'防护用品名称'"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary" @click="findDefend"></el-button>
    </template>

    <template #prepend>
        <el-select v-model="select" placeholder="搜索类型" style="width: 180px">
          <el-option label="防护用品编号" value="defendid" />
          <el-option label="防护用品名称" value="defendName" />
        </el-select>
      </template>
  </el-input>
</div>

<diliver-module :diliver-title="resultTitle"></diliver-module>

<el-button type="primary" class="addBut" :icon="Plus" @click="dialogFormVisible = true">新增防护用品</el-button>

<el-table :data="state.tableData" stripe class="tableStyle" style="width: 1610px" max-height="600">
  <el-table-column prop="defendid" label="防护用品编号" align="center"/>
  <el-table-column prop="defendName" label="防护用品名称" align="center"/>
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

<el-dialog v-model="dialogFormVisible" title="防护用品新增" width="500px">
  <el-form :model="form" label-position="left" ref="ruleFormRef">
    <el-form-item label="防护品编号" prop="defendid" required>
      <el-input v-model="form.defendid"></el-input>
    </el-form-item>
    <el-form-item label="防护品名字" prop="defendName" required>
      <el-input v-model="form.defendName"></el-input>
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
import { defendSearchAll, defendSearchOne } from '@/utils/api/defend'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
import { defendAdd } from '@/utils/api/defend'
import { SUCCESS } from '../const'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const form = reactive({
  defendid: '',
  defendName: '',
  inventory: '' as number|string,
})
const searchTitle = '防护用品库存查询'
const resultTitle = '防护用品库存查询结果'
const searchInput = reactive({
  defendid: '',
  defendName: ''
})
const select = ref('defendid')

interface medicineNumber {
  defendid: string,
  defendName: string,
  inventory: number|string
}

const state = reactive({
  tableData: [] as medicineNumber[]
})

const refreshTable =async () => {
  let {data} = await defendSearchAll(null)
  state.tableData= data.result
}

onMounted(()=>{
  refreshTable()
})

const findDefend =async ()=>{
  let {data} = await defendSearchOne(select.value === 'defendid' ? {'defendid': searchInput.defendid} : {'defendName': searchInput.defendName})
  state.tableData= data.result
}

const addDefend =async (scope)=>{
  dialogFormVisible.value = true
  form.defendid = scope.row.defendid;
  form.defendName = scope.row.defendName;
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    form.inventory = Number(form.inventory)
    let {data}= await defendAdd(form)
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
  &-idsearch{
    width: 646px;
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

:deep(.el-select .el-input__inner){
  border: none;
}
</style>
