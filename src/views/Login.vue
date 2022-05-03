<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_box-title">{{ title }}</div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        ref="loginRuleFormRef"
        :size="formSize"
        v-show="show"
      >
        <!-- 工号 -->
        <el-form-item prop="workid" required>
          <el-input
            v-model="loginForm.workid"
            size="large"
            placeholder="工号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" required>
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <div>
            <el-button type="primary" @click="loginIn(loginRuleFormRef)">登录</el-button>
            <el-button type="info" @click="resetForm(loginRuleFormRef)">重置</el-button>
          </div>
          <div class="toregister" @click="changeStatus">
            <el-icon><right /></el-icon>
          </div>
        </el-form-item>
      </el-form>


      <!-- 注册表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="registerForm"
        ref="RegisterRuleFormRef"
        :size="formSize"
        v-show="!show"
      >
        <!-- 工号 -->
        <el-form-item prop="workid" required>
          <el-input
            v-model="registerForm.workid"
            size="large"
            placeholder="工号"
          ></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item prop="name" required>
          <el-input
            v-model="registerForm.name"
            size="large"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" required>
          <el-input
            v-model="registerForm.password"
            type="password"
            size="large"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="roleInfo" required>
          <el-cascader :options="ROLELIST" clearable v-model="registerForm.roleInfo" placeholder="角色/职级/科室"/>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <div>
            <el-button type="primary" @click="registerIn(RegisterRuleFormRef)">注册</el-button>
            <el-button type="info" @click="resetForm(RegisterRuleFormRef)">重置</el-button>
          </div>
          <div class="toregister" @click="changeStatus">
            <el-icon><back /></el-icon> 
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue';
import { useRouter} from 'vue-router'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { registerUser, loginUser} from '../utils/api/loginRegister'
import { SUCCESS, ROLELIST}  from './const'

type FormInstance = InstanceType<typeof ElForm>
const formSize = ref('')
const loginRuleFormRef = ref<FormInstance>()
const RegisterRuleFormRef = ref<FormInstance>()
const loginForm= reactive({
  workid: '',
  password: ''
})

const registerForm= reactive({
  workid: '',
  name: '',
  password: '',
  roleInfo: []
})
let title= ref('Login')
let show= ref(true)

const router = useRouter()
const loginIn= ((formEl: FormInstance | undefined)=>{
  if (!formEl) return
  formEl.validate(async (valid) => {
      //登录
      if (valid) {    
      let { data } = await loginUser(loginForm)
      if(data.code === SUCCESS){
          sessionStorage.setItem('token',data.token)
          localStorage.setItem('workid',data.workid)
          localStorage.setItem('workName',data.workName)
          localStorage.setItem('manage',data.manage)
          localStorage.setItem('role',data.role)
          ElMessage({
            message: data.msg,
            type: 'success',
            duration: 500
          })
          setTimeout(() => {
            router.push({
            name: 'loginAdmit'
          })
          }, 500);
        }else{
          ElMessage({
            message: data.msg,
            type: 'error',
          })
        }
      
        console.log('login submit!')
      } else {
        console.log('login error submit!')
        return false
      }
    
  })
})

const registerIn= ((formEl: FormInstance | undefined)=>{
  if (!formEl) return
  formEl.validate(async (valid) => {
      //注册
      if (valid) {   
        let requestConfig = {
          workid: registerForm.workid,
          name: registerForm.name,
          password: registerForm.password,
          role: registerForm.roleInfo[0],
          level: registerForm.roleInfo[1],
          department: registerForm.roleInfo[2],
          defendStatus: 'waitAsk'
        } 
        let { data } = await registerUser(requestConfig)
        if(data.code === SUCCESS){
          ElMessage({
            message: data.msg,
            type: 'success',
          })
        }else{
          ElMessage({
            message: data.msg,
            type: 'error',
          })
        }
      } else {
        console.log('register error submit!')
        return false
      }
    
  })
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

let changeStatus = ()=> {
  title.value= title.value === 'Login' ? 'Register' : 'Login';
  show.value= show.value === true ? false : true;
}

</script>

<style scoped lang="scss">
.login_container {
  background-image: url('../assets/images/loginBg.jpg');
  height: 100vh;
}
.login_box {
  width: 500px;
  height: 450px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 25px 35px rgba(0,0,0,0.8);
  background: rgba(223,219,219,0.2);
  text-align: center;
  &-title{
    color: azure;
    margin-top: 30px;
    font-weight: 600;
    font-size: 30px;
  }
}
.login_form {
  position: absolute;
  top: 35%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.toregister{
  color: aliceblue;
  font-size: 30px;
  font-weight: 600;
  background-color: #1c65d3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toregister:hover{
  background-color: #e74e32;
  
}

:deep(.el-form-item__content){
  display: flex;
  justify-content: space-between;
}
</style>
