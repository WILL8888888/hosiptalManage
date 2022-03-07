<template>

  <diliver-module :diliver-title="AskTitle"></diliver-module>

  <el-table ref="tableRef" row-key="date" :data="tableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column
      prop="time"
      label="申请时间"
      sortable
      column-key="time"
      align="center"
    />
    <el-table-column prop="workid" label="申请医护工号" align="center"/>
    <el-table-column prop="name" label="医护姓名" align="center"/>
    <el-table-column prop="list" label="防护用品申请单" align="center"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="dialogFormVisible = true"
          align="center"
        >
          派发防护用品
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="防护用品发放单" width="500px">
    <el-form :model="form" label-position="left" ref="ruleFormRef">
      <el-form-item label="医护工号" :label-width="formLabelWidth" prop="workId" required>
        <el-input v-model="form.workId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="医护姓名" :label-width="formLabelWidth" prop="workName" required>
        <el-input v-model="form.workName" autocomplete="off"></el-input>
      </el-form-item> 
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
import { ref, reactive} from 'vue'
import diliverModule from '@/views/components/diliverModule.vue'
import type { ElForm } from 'element-plus'
const AskTitle = '申请防护用品的医护列表'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

interface DefendAsk {
  time: string
  workid: string,
  name: string,
  list:string
}

const tableData: DefendAsk[] = [
  {
    time: '2022/3/2 13:25:32',
    workid: 'm0001',
    name: '陈康',
    list: '医用射线铅手套，3502工厂灭菌医用防护服，3M医用防护口罩，医用防护面罩'
  },
  {
    time: '2022/3/2 13:25:32',
    workid: 'm0001',
    name: '陈康',
    list: '医用射线铅手套，3502工厂灭菌医用防护服，3M医用防护口罩，医用防护面罩'
  },
  {
    time: '2022/3/2 13:25:32',
    workid: 'm0001',
    name: '陈康',
    list: '医用射线铅手套，3502工厂灭菌医用防护服，3M医用防护口罩，医用防护面罩'
  },
  {
    time: '2022/3/2 13:25:32',
    workid: 'm0001',
    name: '陈康',
    list: '医用射线铅手套，3502工厂灭菌医用防护服，3M医用防护口罩，医用防护面罩'
  },
  {
    time: '2022/3/2 13:25:32',
    workid: 'm0001',
    name: '陈康',
    list: '医用射线铅手套，3502工厂灭菌医用防护服，3M医用防护口罩，医用防护面罩'
  },
  {
    time: '2022/3/2 13:25:32',
    workid: 'm0001',
    name: '陈康',
    list: '医用射线铅手套，3502工厂灭菌医用防护服，3M医用防护口罩，医用防护面罩'
  }
]

const form = reactive({
  workId: '',
  workName: '',
  defendList: [],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log()
      console.log('submit!')
      dialogFormVisible.value = false
    } else {
      console.log('error submit!')
      return false
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

.feeDetails{
  margin-left: 50px;
}
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}

:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label){
  background-color: #c7dffdf6;
}

.medicineTable{
  width: 100%;
  margin: 60px 0 0 50px;
}
</style>
