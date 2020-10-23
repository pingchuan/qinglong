import request from '@/utils/request';

export function getCheckCode() {
  return request('http://localhost:3000/test1/c', {
    Accept: 'form',
  });
}
