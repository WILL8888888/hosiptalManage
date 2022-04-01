import instance from '../request'

function patientOutAll(config){
  return instance.request({
    method: 'post',
    url: '/patient/patientOutAll',
    data: config
  })
}

function personaloutPatientInfo(config){
  return instance.request({
    method: 'post',
    url: '/patient/personaloutPatientInfo',
    data: config
  })
}

function medicineListOutSearch(config){
  return instance.request({
    method: 'post',
    url: '/medicineList/medicineListOutSearch',
    data: config
  })
}

function biometricOutSearch(config){
  return instance.request({
    method: 'post',
    url: '/biometric/biometricOutSearch',
    data: config
  })
}

export {
  patientOutAll,
  personaloutPatientInfo,
  medicineListOutSearch,
  biometricOutSearch
}