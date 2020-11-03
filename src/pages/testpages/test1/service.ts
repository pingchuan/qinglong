import request from '@/utils/request';
import { stringify } from 'qs';

export function test() {
  return request('/api/test/userinfo');
}

export function getCheckCode() {
  return request('/api/public/checkCode', {
    Accept: 'form',
  });
}
