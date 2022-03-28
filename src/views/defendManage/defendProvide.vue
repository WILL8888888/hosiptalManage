<template>

  <diliver-module :diliver-title="AskTitle"></diliver-module>

  <el-table ref="tableRef" row-key="date" :data="state.tableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column prop="workid" label="申请医护工号" align="center"/>
    <el-table-column prop="name" label="医护姓名" align="center"/>
    <el-table-column label="防护用品申请单" align="center">
      <template #default="scope">
        {{scope.row.defendItem}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-popconfirm
          confirm-button-text="确认已派送"
          cancel-button-text="还未派送"
          :icon="Promotion"
          icon-color="#409eef"
          :title="state.confirmInfo"
          @confirm="confirmEvent(scope)"
        >
          <template #reference>
            <el-button
              type="text"
              size="small"
              align="center"
              @click="dispatchDefend(scope)"
            >
          派发防护用品
        </el-button>
        </template>
      </el-popconfirm>
      </template>
      
    </el-table-column>
  </el-table>

</template>

<script setup lang="ts">
import { reactive, onMounted} from 'vue'
import diliverModule from '@/views/components/diliverModule.vue'
import { Promotion } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { defendStatusWaitAsk, askingUser} from '@/utils/api/doctorNurse'
import { defendAdd } from '@/utils/api/defend'
import { SUCCESS } from '../const';

const AskTitle = '申请防护用品的医护列表'

interface defendAsk {
  workid: string,
  name: string,
  department: string,
  defendItem: string
}

let state = reactive({
  tableData:  [] as defendAsk[],
  confirmInfo: ''
})

const refreshTable =async ()=>{
  let {data} = await askingUser(null)
  state.tableData = data.result
}

onMounted(()=>{
  refreshTable()
})

const dispatchDefend =(scope) => {
  state.confirmInfo = `医护工号：${scope.row.workid}，医护姓名：${scope.row.name}`
}

const confirmEvent =async (scope) => {
  let requestBody = {
    'workid': scope.row.workid
  }
  let defendArray = scope.row.defendItem.split(', ')

  let { data }= await defendStatusWaitAsk(requestBody);
  if(data.code === SUCCESS){
    defendArray.forEach(async item => {
      let request = {
        'defendName' : item,
        inventory: -1
      }
      await defendAdd(request)
    })
    ElMessage({
      message: data.msg,
      type: 'success',
      duration: 500
    })
    refreshTable()
    }else {
      ElMessage({
      message: data.msg,
      type: 'error',
    })
  }
  
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
