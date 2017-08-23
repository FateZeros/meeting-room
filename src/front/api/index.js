import { makeRequest } from '@/front/utils/restApi'

// 登录接口
export function Login (data) {
  return makeRequest({
    url: '/api/login',
    method: 'post',
    data
  })
}
