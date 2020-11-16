import { EnumPhiz } from './constant';

export interface PlanDayValues {
  time: string;
  description: string;
  phiz: EnumPhiz;
  id?: string;
  planId?: string;
}

export interface PlanValues {
  name: string;
  startTime: number;
  endTime: number;
  id?: string;
  values?: PlanDayValues[];
  hasMonthGap?: string;
}
