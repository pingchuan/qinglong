import { EnumPhiz } from './constant';

export interface PlanDateValues {
  id: number | string;
  date: string;
  description: string;
  phiz: EnumPhiz;
}

export interface PlanValues {
  name: string;
  id: number | string;
  beginDate: string;
  endDate: string;
  vlaues: PlanDateValues[];
}
