import request from '@/utils/request'

// 查询房屋信息列表
export function listRoom(query) {
  return request({
    url: '/resource/room/list',
    method: 'get',
    params: query
  })
}

// 查询房屋信息详细
export function getRoom(id) {
  return request({
    url: '/resource/room/' + id,
    method: 'get'
  })
}

// 新增房屋信息
export function addRoom(data) {
  return request({
    url: '/resource/room',
    method: 'post',
    data: data
  })
}

// 修改房屋信息
export function updateRoom(data) {
  return request({
    url: '/resource/room',
    method: 'put',
    data: data
  })
}

// 删除房屋信息
export function delRoom(id) {
  return request({
    url: '/resource/room/' + id,
    method: 'delete'
  })
}

export function importRoom(data) {
  return request({
    url: '/resource/room/import',
    method: 'post',
    data :data
  })
}
