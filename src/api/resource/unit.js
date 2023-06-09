import request from '@/utils/request'

// 查询单元信息列表
export function listUnit(query) {
  return request({
    url: '/resource/unit/list',
    method: 'get',
    params: query
  })
}

// 查询单元信息详细
export function getUnit(id) {
  return request({
    url: '/resource/unit/' + id,
    method: 'get'
  })
}

// 新增单元信息
export function addUnit(data) {
  return request({
    url: '/resource/unit',
    method: 'post',
    data: data
  })
}

// 修改单元信息
export function updateUnit(data) {
  return request({
    url: '/resource/unit',
    method: 'put',
    data: data
  })
}

// 删除单元信息
export function delUnit(id) {
  return request({
    url: '/resource/unit/' + id,
    method: 'delete'
  })
}
