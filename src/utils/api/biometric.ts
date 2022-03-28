import instance from '../request'

function biometricAdd(config){
  return instance.request({
    method: 'post',
    url:'/biometric/biometricAdd',
    data: config
  })
}

function biometricSearch(config){
  return instance.request({
    method:'post',
    url:'/biometric/biometricSearch',
    data: config
  })
}

export {
  biometricAdd,
  biometricSearch
}