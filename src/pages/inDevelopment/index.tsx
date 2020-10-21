import React from 'react';
import { Empty } from 'antd';
import emptyImageSrc from '@/assets/images/inDevelopment.png';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.content}>
      <Empty
        image={emptyImageSrc}
        description={
          <span className={styles.description}>开发中，敬请期待...</span>
        }
        imageStyle={{
          height: 60,
        }}
      />
    </div>
  );
};
