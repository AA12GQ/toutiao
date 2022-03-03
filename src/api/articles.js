import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}

export const getArticleById = acticleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${acticleId}`
  })
}

export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
