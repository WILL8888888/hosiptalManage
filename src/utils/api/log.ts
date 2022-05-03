import instance from '../request'

function logFind(config){
  return instance.request({
    url: '/log/logFind',
    method: 'post',
    data: config
  })
}

export {
  logFind
}