import React, { FC, useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import { history } from 'umi';
import { connect } from 'dva';
import { Location } from 'history';
import { Dispatch } from 'redux';
import zhCN from 'antd/es/locale/zh_CN';
import { getCookie } from '@/utils/public';
import { UserInfo } from '@/models/authenticate';
import LeftRightLayout from './leftRightLayout';
import FullScreenLayout from './fullScreenLayout';
import { fullScreenLayoutPath, noAuthenticatePath } from 'config/router';

message.config({ maxCount: 1 });

interface IndexPropsType {
  dispatch: Dispatch;
  location: Location;
  currentUser: UserInfo;
}

const Index: FC<IndexPropsType> = props => {
  const { location, dispatch, currentUser } = props;

  useEffect(() => {
    const user = JSON.parse(getCookie('user') || '{}');

    if (
      (!user?.id || !user?.mail) &&
      !noAuthenticatePath.includes(location.pathname)
    ) {
      history.push('/qinglong/login');
    } else if (user.id && user.id !== currentUser.id) {
      dispatch({
        type: 'authenticate/getCurrentUser',
        payload: { id: user.id },
      });
    }
  });
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

export default connect(({ authenticate }) => ({
  currentUser: authenticate.user,
}))(IndexWrapper);
