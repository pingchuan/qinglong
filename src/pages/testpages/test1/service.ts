import request from '@/utils/request';
import { stringify } from 'qs';

export function test(params?: { key1?: string; key2?: string }) {
  return request(
    `http://apidoc.xiaoduoai.com/mock/531/shop/ageing/list?${stringify(
      params,
    )}`,
  );
}

export function getCheckCode() {
  return request('http://localhost:3000/test1/c', {
    Accept: 'form',
  });
}
