import instance from '../request'

function wardFindInfo(config){
  return instance.request({
    method: 'get',
    url: '/ward/wardInfo',
    data: config
  })
}

function wardUpdatePrice(config){
  return instance.request({
    method: 'post',
    url: '/ward/wardUpdatePrice',
    data: config
  })
}

function wardFindType(config){
  return instance.request({
    method: 'post',
    url: '/ward/wardFindType',
    data: config
  })
}

function wardFindRoom(config){
  return instance.request({
    method: 'post',
    url: '/ward/wardFindRoom',
    data: config
  })
}

function wardFindBed(config){
  return instance.request({
    method: 'post',
    url:'/ward/wardFindBed',
    data: config
  })
}

function wardInPatient(config){
  return instance.request({
    method:'post',
    url:'/ward/wardInPatient',
    data: config
  })
}

function wardFindPatientInfo(config){
  return instance.request({
    method: 'post',
    url: '/ward/wardFindPatientInfo',
    data: config
  })
}

function getWardPatientInfo(config){
  return instance.request({
    method: 'post',
    url: 'ward/getWardPatientInfo',
    data: config
  })
}

function wardSpareBed(config){
  return instance.request({
    method: 'post',
    url: 'ward/wardSpareBed',
    data: config
  })
}

function wardAddRoom(config){
  return instance.request({
    method: 'post',
    url: 'ward/wardAddRoom',
    data: config
  })
}

export {
  wardFindInfo,
  wardUpdatePrice,
  wardFindRoom,
  wardFindType,
  wardFindBed,
  wardInPatient,
  wardFindPatientInfo,
  getWardPatientInfo,
  wardSpareBed,
  wardAddRoom
}