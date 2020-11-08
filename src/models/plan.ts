import { Effect } from 'dva';
import { Reducer } from 'redux';
import { PlanValues } from '@/pages/frontpages/userPlan/type';
import { getPlanList } from '@/pages/frontpages/userPlan/service';

export interface PlanState {
  list: PlanValues[];
}

declare module 'react-redux' {
  interface DefaultRootState {
    planModal: PlanState;
  }
}

export interface IndexModelType {
  namespace: 'planModal';
  state: PlanState;
  effects: {
    getList: Effect;
  };
  reducers: {
    save: Reducer<PlanState>;
  };
  // subscriptions: {};
}

export const initState = (): PlanState => {
  return {
    list: [],
  };
};

const IndexModel: IndexModelType = {
  namespace: 'planModal',
  state: initState(),
  effects: {
    *getList({ _ }, { call, put }) {
      const list = yield call(getPlanList);
      yield put({
        type: 'save',
        payload: { list },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  // subscriptions: {
  // }
};

export default IndexModel;
