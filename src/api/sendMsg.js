import request from '@/utils/request'

export const sendMsg = data => {
  return request({
    method: 'POST',
    url: '/sendMsg',
    data
  })
}
