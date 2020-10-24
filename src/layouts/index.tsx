import React, { FC, useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import { connect } from 'dva';
import { Location } from 'history';
import { Dispatch } from 'redux';
import zhCN from 'antd/es/locale/zh_CN';
// import Unauthorized from '@/components/unauthorized';
import { AuthenticateState } from '@/models/authenticate';
import LeftRightLayout from './leftRightLayout';
import FullScreenLayout from './fullScreenLayout';
import { fullScreenLayoutPath } from 'config/router';

message.config({ maxCount: 1 });

interface IndexPropsType {
  dispatch: Dispatch;
  location: Location;
  authenticate: AuthenticateState;
}

const Index: FC<IndexPropsType> = props => {
  const { authenticate, location } = props;
  console.log(authenticate, props);
  // return (
  //   <Unauthorized />
  // );
  if (fullScreenLayoutPath.includes(location.pathname)) {
    return <FullScreenLayout {...props} />;
  } else {
    return <LeftRightLayout {...props} />;
  }
};

const IndexWrapper: FC<IndexPropsType> = props => {
  useEffect(() => {
    window.addEventListener(
      'unhandledrejection',
      function(e) {
        e.preventDefault(); // 清除控制台的异常
        if (typeof e.reason === 'string') {
          message.error(e.reason);
        }
        return true;
      },
      true,
    );
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Index {...props} />
    </ConfigProvider>
  );
};

export default connect(({ authenticate }) => ({ authenticate }))(IndexWrapper);
