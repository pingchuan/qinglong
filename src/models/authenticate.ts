// import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface AuthenticateState {
  userId: string;
  userName: string;
}

declare module 'react-redux' {
  interface DefaultRootState {
    authenticate: AuthenticateState;
  }
}

export interface IndexModelType {
  namespace: 'authenticate';
  state: AuthenticateState;
  // effects: {
  //   query: Effect;
  // };
  reducers: {
    save: Reducer<AuthenticateState>;
  };
  // subscriptions: {};
}

const IndexModel: IndexModelType = {
  namespace: 'authenticate',
  state: {
    userId: '',
    userName: '',
  },
  // effects: {
  //   *query({ payload }, { call, put }) {
  //     console.log(11)
  //   },
  // },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  // subscriptions: {
  // }
};

export default IndexModel;
