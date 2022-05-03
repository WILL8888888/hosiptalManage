<template>
<diliver-module :diliver-title="logTitle"></diliver-module>

<el-table :data="state.tableData.slice((state.currentPage-1)*state.PageSize,state.currentPage*state.PageSize)" style="width: 100%; margin-top: 100px;">
    <el-table-column prop="time" label="时间" />
    <el-table-column prop="log" label="日志" />
</el-table>

<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="state.currentPage"   
  background 
  layout="prev, pager, next"
  :total="state.tableData.length" 
  :page-size="state.PageSize"/>
</template>

<script setup lang="ts">
import diliverModule from '@/views/components/diliverModule.vue'
import { reactive, onMounted} from 'vue';
import { logFind } from '@/utils/api/log'
const logTitle = '日志记录'
const state = reactive({
  tableData: [],
  PageSize: 10,
  currentPage: 1
})

const getLog =async ()=>{
  let {data} = await logFind(null)
  state.tableData = data.result.reverse()
}

const handleSizeChange = (val) => {
  // 改变每页显示的条数 
  state.PageSize=val
  // 注意：在改变每页显示的条数时，要将页码显示到第一页
  state.currentPage=1
}

// 显示第几页
const handleCurrentChange= (val) => {
  // 改变默认的页数
  state.currentPage=val
}

onMounted(()=>{
  getLog()
})
</script>

<style scoped lang="scss">
</style>
