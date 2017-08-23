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
