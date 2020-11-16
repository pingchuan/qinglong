import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getUserInfo } from '@/service';

export interface UserInfo {
  id: string;
  username: string;
  mail: string;
  sex?: 'man' | 'woman';
  birthday?: number;
  cellPhone?: string;
  phone?: string;
  image?: string;
  description?: string;
}

export interface AuthenticateState {
  user: UserInfo;
}

declare module 'react-redux' {
  interface DefaultRootState {
    authenticate: AuthenticateState;
  }
}

export interface IndexModelType {
  namespace: 'authenticate';
  state: AuthenticateState;
  effects: {
    getCurrentUser: Effect;
  };
  reducers: {
    save: Reducer<AuthenticateState>;
  };
  // subscriptions: {};
}

export const initState = (): AuthenticateState => {
  return {
    user: {
      id: '',
      username: '',
      mail: '',
    },
  };
};

const IndexModel: IndexModelType = {
  namespace: 'authenticate',
  state: initState(),
  effects: {
    *getCurrentUser({ payload }, { call, put }) {
      const user = yield call(getUserInfo, payload);

      yield put({
        type: 'save',
        payload: { user },
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
