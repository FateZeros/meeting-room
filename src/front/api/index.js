import { makeRequest } from '@/front/utils/restApi'

// 登录接口
export function Login (data) {
  return makeRequest({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 获取会议室使用情况
export function getRoomUsing (day) {
  return makeRequest({
    url: `/api/room/${day}`
  })
}

// 获取会议室列表
export function getRoomList () {
  return makeRequest({
    url: '/api/roomList'
  })
}

// 新增会议室
export function addRoom (data) {
  return makeRequest({
    url: '/api/roomList',
    method: 'post',
    data
  })
}

export function deleteRoom (roomName) {
  return makeRequest({
    url: `/api/roomList/${roomName}`,
    method: 'delete'
  })
}
