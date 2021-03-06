import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const putUserChannel = channel => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

export const deleteChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
