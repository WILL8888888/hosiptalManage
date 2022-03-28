<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>

<div class="searchArea">
  <el-input
      v-model="searchInput[select]"
      size="large"
      :placeholder="select === 'medicineid'?'药品编号':'药品名称'"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary" @click="findDefend"></el-button>
    </template>
    <template #prepend>
        <el-select v-model="select" placeholder="搜索类型" style="width: 180px">
          <el-option label="药品编号" value="medicineid" />
          <el-option label="药品名称" value="medicineName" />
        </el-select>
      </template>
  </el-input>

</div>
  <el-descriptions
    class="feeDetails"
    title="药品查询结果"
    :column="2"
    :size="size"
    border
    style="margin-bottom: 60px"
  >
    <template #extra>
      <el-button type="primary" @click="dialogFormVisible = true">发放药品</el-button>
    </template>
    <el-descriptions-item v-for="item in MEDICINEINFO" width="400px">
      <template #label>
        <div class="cell-item">
            <el-icon :style="iconStyle">
              <component :is="item.icons" />
            </el-icon>
          {{item.infoTitle}}
        </div>
      </template>
      <span v-if="state.descriptions.length > 0">{{state.descriptions[0][item.key]}}</span>
    </el-descriptions-item>
  </el-descriptions>

  <el-dialog v-model="dialogFormVisible" title="药品发放单" width="500px">
    <el-form :model="form" label-position="left" ref="ruleFormRef">
      <el-form-item label="药品编号" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicineid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品名称" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicineName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品价格" :label-width="formLabelWidth" required>
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品剂量数" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicineNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发致患者" :label-width="formLabelWidth" required>
        <el-input v-model="form.idnum" autocomplete="off" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item label="派发负责护士" :label-width="formLabelWidth" required>
        <el-input v-model="form.nurseWorkid" autocomplete="off"></el-input>
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

  <diliver-module :diliver-title="MaskTitle"></diliver-module>

  <el-table ref="tableRef" row-key="date" :data="state.tableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column prop="medicineid" label="药物编号" align="center" width="150"  />
    <el-table-column prop="medicineName" label="药物名称" align="center" width="500"/>
    <el-table-column prop="price" label="药品价格" align="center" width="200"/>
    <el-table-column prop="medicineNum" label="药品剂量数" align="center" width="200"/>
    <el-table-column prop="idnum" label="发致患者姓名 / 身份证号" align="center" width="200"/>
    <el-table-column prop="nurseWorkid" label="派发负责护士姓名 / 工号" align="center" width="200"/>
    <el-table-column prop="doctorWorkid" label="派发医生姓名 / 工号" align="center" width="200"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="deleteRow(scope)"
          align="center"
        >
          派发完成
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { MEDICINEINFO, SUCCESS } from '../const';
import { Search } from '@element-plus/icons'
import { computed, ref, reactive, onMounted} from 'vue'
import type { ElForm } from 'element-plus'
import { medicineSearchOne } from '@/utils/api/medicine'
import { medicineInfo, medicineListSearchAll, dispatchFinish} from '@/utils/api/medicineList';
import { patientPersonalInfo } from '@/utils/api/patientAbout'
import { personalInfo } from '@/utils/api/doctorNurse'
import { ElMessage } from 'element-plus'
const searchTitle = '药品查询发放'
const MaskTitle = '药物派发任务清单'
const searchInput = reactive({
  medicineid: '',
  medicineName: ''
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

const form = reactive({
  medicineid: '',
  medicineName: '',
  price: '',
  medicineNum: 0,
  idnum: '',
  nurseWorkid: ''
})

const select = ref('medicineid')

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

interface Medicine {
  medicineid: string,
  medicineName: number,
  price:number,
  medicineNum:number,
  idnum:string,
  nurseWorkid:string,
  doctorWorkid: string
}

interface MedicineDesciption { 
  medicineid: string,
  medicineName: string,
  price:number,
  inventory:number,
}

const state = reactive({
  tableData: [] as Medicine[],
  descriptions: [] as MedicineDesciption[]
})

onMounted(()=>{
  refreshTable()
})

const refreshTable =async () => {
  let {data} = await medicineListSearchAll(null)
  state.tableData = data.result.filter(item => item.dispatchStatus === 'wait')
  state.tableData.forEach(async item => {
    let requestBody = {
      'idnum' : item.idnum
    }
    let {data} = await patientPersonalInfo(requestBody)
    item.idnum = `${data.result[0].name} / ${item.idnum}`
    let nurseBody = {
      'workid' : item.nurseWorkid
    }
    let nurseRes = await personalInfo(nurseBody)
    item.nurseWorkid = `${nurseRes.data.result.name} / ${item.nurseWorkid}`
    let doctorBody = {
      'workid' : item.doctorWorkid
    }
    let doctorRes = await personalInfo(doctorBody)
    item.doctorWorkid = `${doctorRes.data.result.name} / ${item.doctorWorkid}`
  })
  
  
}

const findDefend =async ()=>{
  let {data} = await medicineSearchOne(select.value === 'medicineid'?{'medicineid': searchInput.medicineid} : {'medicineName': searchInput.medicineName})
  state.descriptions= data.result
  form.medicineid = data.result[0].medicineid
  form.medicineName = data.result[0].medicineName
  form.price = data.result[0].price
}

const deleteRow =async (scope)=> {
  let requestBody = {
    'medicineid' : scope.row.medicineid
  } 
  let {data} = await dispatchFinish(requestBody)
  if(data.code === SUCCESS){
    ElMessage({
      message: data.msg,
      type: 'success',
      duration: 500
    })
    refreshTable()
  }else{
    ElMessage({
      message: data.msg,
      type: 'error',
      duration: 500
    })
  }
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      form.medicineNum = Number(form.medicineNum)
      let requestBody = {
        ...form,
        doctorWorkid : localStorage.getItem('workid'),
        medicineListStatus: 'inHospital'
      }
      let {data} = await medicineInfo(requestBody)
      if(data.code === SUCCESS){
        ElMessage({
          message: data.msg,
          type: 'success',
          duration: 500
        })
        dialogFormVisible.value = false
        refreshTable()
      }else{
        ElMessage({
          message: data.msg,
          type: 'error',
          duration: 500
        })
      }
    } else {
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
    width: 646px;
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

:deep(.el-select .el-input__inner){
  border: none;
}
</style>
