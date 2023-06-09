import request from '@/utils/request'

// 查询楼栋信息列表
export function listBuilding(query) {
  return request({
    url: '/resource/building/list',
    method: 'get',
    params: query
  })
}

// 查询楼栋信息详细
export function getBuilding(id) {
  return request({
    url: '/resource/building/' + id,
    method: 'get'
  })
}

// 新增楼栋信息
export function addBuilding(data) {
  return request({
    url: '/resource/building',
    method: 'post',
    data: data
  })
}

// 修改楼栋信息
export function updateBuilding(data) {
  return request({
    url: '/resource/building',
    method: 'put',
    data: data
  })
}

// 删除楼栋信息
export function delBuilding(id) {
  return request({
    url: '/resource/building/' + id,
    method: 'delete'
  })
}
