import request from '@/utils/request';
import { LoginSubmitValues } from './type';

export function getCheckCode() {
  return request('http://localhost:3000/public/checkCode', {
    Accept: 'form',
  });
}

export function postRegistered(params: LoginSubmitValues) {
  return request('http://localhost:3000/public/registered', {
    method: 'POST',
    body: params,
  });
}
