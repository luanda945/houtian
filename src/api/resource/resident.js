import request from '@/utils/request'

// 查询社区人员列表
export function listResident(query) {
  return request({
    url: '/resource/resident/list',
    method: 'get',
    params: query
  })
}

// 查询社区人员详细
export function getResident(id) {
  return request({
    url: '/resource/resident/' + id,
    method: 'get'
  })
}

// 新增社区人员
export function addResident(data) {
  return request({
    url: '/resource/resident',
    method: 'post',
    data: data
  })
}

// 修改社区人员
export function updateResident(data) {
  return request({
    url: '/resource/resident',
    method: 'put',
    data: data
  })
}

// 删除社区人员
export function delResident(id) {
  return request({
    url: '/resource/resident/' + id,
    method: 'delete'
  })
}
