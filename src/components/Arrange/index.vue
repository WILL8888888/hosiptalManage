<template>
<el-header class="header">
  <h4 class="header-name"><router-link to="/">住院管理系统</router-link></h4>
</el-header>
<el-container>
  <el-aside :width="isCollapse ? '60px' : '200px'" class="aside">
    <div class="aside-time" v-if="!isCollapse">
      {{currentDate}}
    </div>
    <div class="switch" :style="{width: isCollapse ? '60px' : '200px'}" @click="switchChange">
      <el-icon><sort class="switch-sort"/></el-icon>
    </div>
      
      <el-menu
        class="el-menu-vertical-demo"
        active-text-color="#1f84ff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="routePath ? routePath : ''"
        router
      >
        <el-sub-menu v-for="(item,id) in MENUMODULE" :key="id" :index="id.toString()">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{item.routeHead}}</span>
          </template>
            <el-menu-item v-for="(menuItem,menuId) in item.route" :key="menuId" :index="`${menuItem.routePath}`" @click="saveRoute(menuItem.routePath)">{{menuItem.routeName}}</el-menu-item>
        </el-sub-menu>
      </el-menu>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
  
</el-container>

</template>

<script lang="ts">
import { onMounted, reactive, toRefs} from "vue"

import { timeShow } from '@/utils/index'

import  { MENUMODULE }  from './const'

export default{
  setup(){
    const state = reactive({
      currentDate: timeShow(new Date()),
      isCollapse: false,
      routePath: window.sessionStorage.getItem('routeSave')
    });

    function switchChange(){
      state.isCollapse = !state.isCollapse
    }

    function saveRoute(routePath){
      window.sessionStorage.setItem('routeSave',routePath)
    }

    onMounted(()=>{
      setInterval(()=>{
        state.currentDate = timeShow(new Date())
      })
    })

    return {
      ...toRefs(state),
      switchChange,
      saveRoute,
      MENUMODULE
    }
  }
  
}


</script>

<style scoped lang="scss">
  a{
    text-decoration: none;
    color: #fff;
  }
  .el-container {
    height: 1000px;
  }
  .el-aside {
    background-color: #fff;
    color: #363636;
  }
  .el-header{
    background-image: linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%);
    color: #fff;
    font-size: 20px
  }
  .el-main {
    background-color: #e9f3ff;
  }
  .aside{
    &-time{
      color: #363636;;
      text-align: center;
      padding: 30px 0;
      font-size: 20px;
      font-weight: 600;
      border-bottom: 0.5px solid #e2e2e2;
    }
  }

  .header{
    &-name{
      line-height: 60px;
      margin:0 0 0 20px;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
  .switch{
    background: #e9f3ff;
    text-align: center;
    &-sort{
      transform: rotate(90deg);
    }
  }
</style>
