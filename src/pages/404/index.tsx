import React from 'react';
import { Empty } from 'antd';
import emptyImageSrc from '@/assets/images/404.png';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.content}>
      <Empty
        image={emptyImageSrc}
        description={
          <span className={styles.description}>抱歉：页面没找到</span>
        }
        imageStyle={{
          height: 60,
        }}
      />
    </div>
  );
};
