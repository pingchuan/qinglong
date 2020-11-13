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
export function getUserInfo(params?: { id: string }): Promise<UserInfo[]> {
  return request(`/api/user?${stringify(params)}`);
}

// 上传文件
export function postUpload(params: { file: Blob }) {
  return request('/api/public/uploadImage', {
    method: 'POST',
    body: params,
    hasTip: true,
  });
}
