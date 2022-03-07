import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return request({
    mehod: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    mehod: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const getUserChannels = () => {
  return request({
    mehod: 'GET',
    url: '/v1_0/user/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const addFollow = target => {
  return request({
    mehod: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

export const deleteFollow = target => {
  return request({
    mehod: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

export const getUserProfile = target => {
  return request({
    mehod: 'GET',
    url: '/v1_0/user/profile'
  })
}

export const updateUserProfile = data => {
  return request({
    mehod: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

export const updateUserPhoto = data => {
  return request({
    mehod: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
