import instance from '../request'

function allUserInfo(config){
  return instance.request({
    method: 'get',
    url: '/users/allUserInfo',
    data: config
  })
}

function doctorAllInfo(config){
  return instance.request({
    method: 'get',
    url: '/users/doctorAllInfo',
    data: config
  })
}

function doctorPersonalInfo(config){
  return instance.request({
    method: 'post',
    url: '/users/doctorPersonalInfo',
    data: config
  })
}

function nurseAllInfo(config){
  return instance.request({
    method: 'get',
    url: '/users/nurseAllInfo',
    data :config
  })
}

function nursePersonalInfo(config){
  return instance.request({
    method: 'post',
    url: '/users/nursePersonalInfo',
    data: config
  })
}

function defendStatusAsking(config){
  return instance.request({
    method: 'post',
    url: '/users/defendStatusAsking',
    data: config
  })
}

function defendStatusWaitAsk(config){
  return instance.request({
    method: 'post',
    url: '/users/defendStatusWaitAsk',
    data: config
  })
}

function askingUser(config){
  return instance.request({
    method: 'get',
    url: '/users/askingUser',
    data: config
  })
}

function personalInfo(config){
  return instance.request({
    method: 'post',
    url: '/users/personalInfo',
    data: config
  })
}
export {
  allUserInfo,
  doctorAllInfo,
  doctorPersonalInfo,
  nurseAllInfo,
  nursePersonalInfo,
  defendStatusAsking,
  defendStatusWaitAsk,
  askingUser,
  personalInfo
}