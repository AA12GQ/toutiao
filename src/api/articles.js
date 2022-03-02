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
