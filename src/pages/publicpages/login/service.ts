import request from '@/utils/request';
import qs from 'qs';
import {
  LoginSubmitValues,
  MailCheckCodeSubmitValues,
  RegisteredSubmitValues,
} from './type';

// 获取验证码
export function getCheckCode() {
  return request('/api/public/checkCode', {
    Accept: 'form',
  });
}

// 获取邮箱验证码
export function getMailCheckCode(params: MailCheckCodeSubmitValues) {
  return request(`/api/public/mailCheckCode?${qs.stringify(params)}`);
}

// 注册用户
export function postRegistered(params: RegisteredSubmitValues) {
  return request('/api/public/registered', {
    method: 'POST',
    body: params,
  });
}

// 登录用户
export function postLogin(params: LoginSubmitValues) {
  return request('/api/public/login', {
    method: 'POST',
    body: params,
  });
}
