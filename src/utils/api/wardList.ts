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
export {
  wardListAll,
  wardGetPrice
}