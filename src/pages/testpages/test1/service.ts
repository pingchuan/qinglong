import request from '@/utils/request';

export function test() {
  return request('/api/test/userinfo');
}

export function getCheckCode() {
  return request('/api/public/checkCode');
}
