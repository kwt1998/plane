import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/UserLogin',
    method: 'post',
    // name: qs.stringify(data.username),
    // password: qs.stringify(data.password)
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
