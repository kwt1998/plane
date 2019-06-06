import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  // console.log(token)
  return request({
    url: '/user/info',
    method: 'get',
    params: qs.stringify(token)
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
