import React from 'react';
import { Empty } from 'antd';
import { history } from 'umi';
import imageUrl from '@/assets/images/unauthorized.png';
import styles from './index.less';

const Index = () => {
  return (
    <div className={styles.unauthorized}>
      <Empty
        image={imageUrl}
        description={
          <span>
            尚未<a onClick={() => history.push('/login')}>登录</a>，您无权查看
          </span>
        }
      />
    </div>
  );
};

export default Index;
