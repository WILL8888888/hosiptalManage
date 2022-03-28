import instance from '../request'

function medicineSearchAll (config){
  return instance.request({
    method : 'get',
    url: '/medicine/medicineSearchAll',
    data: config
  })
}

function medicineSearchOne (config){
  return instance.request({
    method : 'post',
    url: '/medicine/medicineSearchOne',
    data: config
  })
}

function medicineAdd (config){
  return instance.request({
    method: 'post',
    url: '/medicine/medicineAdd',
    data: config
  })
}

export {
  medicineSearchAll,
  medicineSearchOne,
  medicineAdd
}