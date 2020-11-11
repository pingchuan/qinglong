import { EnumPhiz } from './constant';

export interface PlanDayValues {
  time: string;
  description: string;
  phiz: EnumPhiz;
  id?: number;
  planId?: number;
}

export interface PlanValues {
  name: string;
  startTime: number;
  endTime: number;
  id?: number;
  values?: PlanDayValues[];
  hasMonthGap?: string;
}
