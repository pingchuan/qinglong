import request from '@/utils/request';
import qs from 'qs';
import { PlanValues, PlanDayValues } from './type';

// 获取任务
export function getPlanList(): Promise<PlanValues[]> {
  return request('/api/plan');
}

// 新增任务
export function postPlan(params: PlanValues) {
  return request('/api/plan', {
    method: 'POST',
    body: params,
    hasTip: true,
  });
}

// 修改任务
export function putPlan(params: PlanValues) {
  return request('/api/plan', {
    method: 'PUT',
    body: params,
    hasTip: true,
  });
}

// 删除任务
export function deletePlan(params: { id: string }) {
  return request(`/api/plan?${qs.stringify(params)}`, {
    method: 'DELETE',
    hasTip: true,
  });
}

// 新增日任务
export function postPlanDay(params: PlanDayValues) {
  return request('/api/planDay', {
    method: 'POST',
    body: params,
    hasTip: true,
  });
}

// 修改日任务
export function putPlanDay(params: PlanDayValues) {
  return request('/api/planDay', {
    method: 'PUT',
    body: params,
    hasTip: true,
  });
}
