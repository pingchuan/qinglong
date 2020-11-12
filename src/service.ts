import request from '@/utils/request';
import { stringify } from 'qs';
import { UserInfo } from '@/models/authenticate';

// 修改用户信息
export function putUserInfo(params: UserInfo) {
  return request('/api/user', {
    method: 'PUT',
    body: params,
    hasTip: true,
  });
}

// 获取用户信息
export function getUserInfo(params: { id: string }) {
  return request(`/api/user?${stringify(params)}`);
}
