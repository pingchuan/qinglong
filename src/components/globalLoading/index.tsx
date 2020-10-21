import React, { FC } from 'react';
import { Spin } from 'antd';
import styles from './index.less';

interface Props {
  tip?: string;
}

const Index: FC<Props> = ({ tip = '页面加载中...' }) => {
  return (
    <div className={styles.content}>
      <Spin tip={tip}></Spin>
    </div>
  );
};

export default Index;
