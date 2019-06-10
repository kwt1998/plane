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
    url: '/UserById',
    method: 'post',
    params: qs.stringify(token)
  })
}
export function searchticket(data) {
  return request({
    url: '/search',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function deleteticket(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}
export function getform(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}
export function deleteform(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
