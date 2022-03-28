import instance from '../request'

function registerUser(config){
  return instance.request({
    method: 'post',
    url: '/users/register',
    data: config
  })
}

function loginUser(config){
  return instance.request({
    method: 'post',
    url: '/users/login',
    data :config
  })
}

export {
  registerUser,
  loginUser
}