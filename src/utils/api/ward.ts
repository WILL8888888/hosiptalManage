import instance from '../request'

function wardInfo(config){
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

function wardInfoFilter(config){
  return instance.request({
    method: 'get',
    url: '/ward/wardInfoFilter',
    data: config
  })
}

function wardFind(config){
  return instance.request({
    method: 'post',
    url: '/ward/wardFind',
    data: config
  })
}

export {
  wardInfo,
  wardUpdatePrice,
  wardInfoFilter,
  wardFind
}