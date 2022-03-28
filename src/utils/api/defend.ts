import instance from '../request'

function defendSearchAll (config){
  return instance.request({
    method : 'get',
    url: '/defend/defendSearchAll',
    data: config
  })
}

function defendSearchOne (config){
  return instance.request({
    method : 'post',
    url: '/defend/defendSearchOne',
    data: config
  })
}

function defendAdd (config){
  return instance.request({
    method: 'post',
    url: '/defend/defendAdd',
    data: config
  })
}

export {
  defendSearchAll,
  defendSearchOne,
  defendAdd
}