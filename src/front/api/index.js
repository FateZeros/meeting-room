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

// 预约会议室
export function appointRoom (data) {
  return makeRequest({
    url: '/api/appointRoom',
    method: 'post',
    data
  })
}

// 获取 我的会议室预约
export function getMyAppoints (query) {
  return makeRequest({
    url: `/api/myAppoint/${query}`
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

// 删除会议室
export function deleteRoom (roomName) {
  return makeRequest({
    url: `/api/roomList/${roomName}`,
    method: 'delete'
  })
}

// 新增用户
export function addUser (data) {
  return makeRequest({
    url: '/api/addUser',
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList () {
  return makeRequest({
    url: '/api/userList'
  })
}

// 删除用户 根据邮箱地址 进行删除
export function deleteUser (email) {
  return makeRequest({
    url: `/api/user/${email}`,
    method: 'delete'
  })
}

// 获取单个用户
export function getUser (email) {
  return makeRequest({
    url: `/api/user/${email}`
  })
}

// 编辑单个用户
export function editUser (data) {
  return makeRequest({
    url: '/api/user',
    method: 'post',
    data
  })
}

// 重置密码
export function resetPasswd (email) {
  return makeRequest({
    url: '/api/resetpwd',
    method: 'post',
    data: { email }
  })
}
