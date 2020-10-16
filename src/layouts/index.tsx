import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux'
import zhCN from 'antd/es/locale/zh_CN';
import Unauthorized from '@/components/unauthorized';
import { AuthenticateState } from '@/models/authenticate';
import LeftRightLayout from './leftRightLayout';

interface IndexPropsType {
  dispatch: Dispatch;
  authenticate: AuthenticateState;
}

const Index: FC<IndexPropsType> = (props) => {
  const { authenticate } = props;
  console.log(authenticate)
  // return (
  //   <Unauthorized />
  // );
  return (
    <LeftRightLayout {...props} />
  )
}

const IndexWrapper: FC<IndexPropsType> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Index {...props} />
    </ConfigProvider>
  );
}

export default connect(({ authenticate }) => ({ authenticate }))(IndexWrapper);