import { Effect } from 'dva';
import { Reducer } from 'redux';
import { PlanValues } from '@/pages/frontpages/userPlan/type';
import { getPlanList } from '@/pages/frontpages/userPlan/service';

export interface PlanState {
  list: PlanValues[];
  loading: boolean;
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
    loading: false,
  };
};

const IndexModel: IndexModelType = {
  namespace: 'planModal',
  state: initState(),
  effects: {
    *getList({ _ }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      const list = yield call(getPlanList);

      yield put({
        type: 'save',
        payload: { list, loading: false },
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
