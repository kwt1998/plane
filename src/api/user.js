import request from '@/utils/request'
import qs from 'qs'

// 登陆
export function login(data) {
  return request({
    url: '/UserLogin',
    method: 'post',
    // name: qs.stringify(data.username),
    // password: qs.stringify(data.password)
    data: qs.stringify(data)
  })
}

// 获取用户信息
export function getInfo(token) {
  // console.log(token)
  return request({
    url: '/UserById',
    method: 'post',
    params: qs.stringify(token)
  })
}

// 获取公司信息
export function getcompanyInfo(token) {
  // console.log(token)
  return request({
    url: '/',
    method: 'post',
    params: qs.stringify(token)
  })
}


// 查找机票（公司）
export function searchticket(data) {
  return request({
    url: '/search',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除机票（公司）
export function deleteticket(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}

// 获取订单（顾客）
export function getform(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}

// 删除订单（顾客）
export function deleteform(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}

// 公司首页柱状图信息
export function getline(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}

// 公司首页扇形图信息
export function getcircle(id) {
  return request({
    url: '/search',
    method: 'post',
    params: qs.stringify(id)
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 注册
export function sign(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: qs.stringify(data)
  })
}
