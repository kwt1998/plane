import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ticketbuy/list',
    method: 'get',
    params
  })
}
