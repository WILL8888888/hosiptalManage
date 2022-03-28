import instance from '../request'

function patientInfo(config){
  return instance.request({
    method: 'post',
    url: '/patient/info',
    data: config
  })
}

function patientAllList(config){
  return instance.request({
    method: 'get',
    url: '/patient/allList',
    data: config
  })
}

function patientPersonalInfo(config){
  return instance.request({
    method: 'post',
    url: '/patient/personalPatientInfo',
    data: config
  })
}

export {
  patientInfo,
  patientAllList,
  patientPersonalInfo
}