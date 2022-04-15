import instance from '../request'

function wardListAll(config){
  return instance.request({
    method: 'post',
    url: '/wardlist/wardListAll',
    data: config
  })
}

function wardGetPrice(config){
  return instance.request({
    method:'post',
    url: '/wardlist/wardGetPrice',
    data: config
  })
}

function wardPriceAdjust(config){
  return instance.request({
    method: 'post',
    url: '/wardlist/wardPriceAdjust',
    data: config
  })
}

function wardListUpdate(config){
  return instance.request({
    method: 'post',
    url: '/wardlist/wardListUpdate',
    data: config
  })
}
export {
  wardListAll,
  wardGetPrice,
  wardPriceAdjust,
  wardListUpdate
}