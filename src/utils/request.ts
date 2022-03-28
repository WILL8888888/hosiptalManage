import axios from "axios";
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

let instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 5000
})

//请求拦截
instance.interceptors.request.use(async config => {
  let urlExclude = (config.url === "/users/login" || config.url === '/user/register')

  if(urlExclude) return config

  const token_type="Bearer "
  if(sessionStorage.getItem('token')){
    config.headers.Authorization = token_type + sessionStorage.token;
    return config
  }else{
      router.push({
        name: 'login'
      })
      ElMessage({
        message: '登录过期请登录',
        type: 'error',
      })
  }
  
},err => {
  console.error('请求失败',err)
})

  //响应拦截
instance.interceptors.response.use(res => {

  return res
},err => {
  console.error(err)
})

export default instance;
