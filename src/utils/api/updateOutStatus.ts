import instance from '../request'

function updateAllStatus(config){
  return instance.request({
    method: 'post',
    url: '/status/updateAllStatus',
    data: config
  })
}

export {
  updateAllStatus
}