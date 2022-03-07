<template>
<diliver-module :diliver-title="searchTitle"></diliver-module>

<div class="searchArea">
  <el-input
      v-model="searchInput.medicineId"
      size="large"
      placeholder="药品编号"
      :prefix-icon="Search"
      :clearable="true"
      class="searchArea-idsearch"
    >
    <template #append>
      <el-button :icon="Search" type="primary"></el-button>
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
      <el-button :icon="Search" type="primary"></el-button>
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
      <span>味觉糖</span>
    </el-descriptions-item>
  </el-descriptions>

  <el-dialog v-model="dialogFormVisible" title="药品发放单" width="500px">
    <el-form :model="form" label-position="left" ref="ruleFormRef">
      <el-form-item label="药品编号" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicineId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品名称" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicineName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品价格" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicinePrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品剂量数" :label-width="formLabelWidth" required>
        <el-input v-model="form.medicineNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发致患者" :label-width="formLabelWidth" required>
        <el-input v-model="form.toPatient" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="派发负责护士" :label-width="formLabelWidth" required>
        <el-input v-model="form.fromNurse" autocomplete="off"></el-input>
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

  <el-table ref="tableRef" row-key="date" :data="tableData" max-height="600" class="medicineTable" style="width: 1610px">
    <el-table-column
      prop="time"
      label="发放时间"
      sortable
      width="280"
      column-key="time"
      align="center"
    />
    <el-table-column prop="id" label="药物编号" align="center" width="150"  />
    <el-table-column prop="name" label="药物名称" align="center" width="500"/>
    <el-table-column prop="price" label="药品价格" align="center" width="200"/>
    <el-table-column prop="num" label="药品剂量数" align="center" width="200"/>
    <el-table-column prop="patient" label="发致患者" align="center" width="200"/>
    <el-table-column prop="nurse" label="派发负责护士" align="center" width="200"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
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
import { MEDICINEINFO } from '../const';
import { Search } from '@element-plus/icons'
import { computed, ref, reactive} from 'vue'
import type { ElForm } from 'element-plus'
const searchTitle = '药品查询发放'
const MaskTitle = '药物派发任务清单'
const searchInput = {
  medicineId: '',
  medicineName: ''
}
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

const form = reactive({
  medicineId: '',
  medicineName: '',
  medicineNum: '',
  medicinePrice: '',
  toPatient: '',
  fromNurse: ''
})

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
  time: string
  id: string,
  name: string,
  price:number,
  num:number,
  patient:string,
  nurse:string
}

const tableData: Medicine[] = [
  {
    time: '2022/3/2 13:25:32',
    id: 'm0001',
    name: '拜耳 达喜胃药 铝碳酸镁咀嚼片0.5克*30',
    price: 32.20,
    num: 3,
    patient:'病1',
    nurse:'护1'
  },
  {
    time: '2022/3/2 13:25:32',
    id: 'm0002',
    name: '芬必得 布洛芬缓释胶囊 0.3g*24粒',
    price: 42.20,
    num: 3,
    patient:'病2',
    nurse:'护2'
  },
  {
    time: '2022/3/2 13:25:32',
    id: 'm0003',
    name: '同仁堂 龙胆泻肝丸 6克*12袋',
    price: 52.20,
    num: 6,
    patient:'病3',
    nurse:'护3'
  },
  {
    time: '2022/3/2 13:25:32',
    id: 'm0004',
    name: '易善复 多烯磷脂酰胆碱胶囊 228mg*96粒',
    price: 72.20,
    num: 2,
    patient:'病4',
    nurse:'护4'
  },
  {
    time: '2022/3/2 13:25:32',
    id: 'm0005',
    name: '片仔癀 茵胆平肝胶囊 0.5g*20粒 5盒装',
    price: 182.20,
    num: 5,
    patient:'病5',
    nurse:'护5'
  }
]

function deleteRow(index) { 
  console.log(index)
}

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
