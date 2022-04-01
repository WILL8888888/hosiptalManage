import instance from '../request'

function medicineInfo (config){
  return instance.request({
    method : 'post',
    url: '/medicineList/medicineInfo',
    data: config
  })
}

function medicineListSearchAll (config){
  return instance.request({
    method : 'get',
    url: '/medicineList/medicineListSearchAll',
    data: config
  })
}

function medicineListSearchOne (config){
  return instance.request({
    method: 'post',
    url: '/medicineList/medicineListSearchOne',
    data: config
  })
}

function dispatchFinish (config){
  return instance.request({
    method : 'post',
    url: '/medicineList/dispatchFinish',
    data: config
  })
}

function cancelList (config){
  return instance.request({
    method: 'post',
    url: '/medicineList/cancelList',
    data: config
  })
}

export {
  medicineInfo,
  medicineListSearchAll,
  medicineListSearchOne,
  dispatchFinish,
  cancelList
}