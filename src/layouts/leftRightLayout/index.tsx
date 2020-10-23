import React, { FC } from 'react';
import styles from './index.less';
// import LeftMenu from '@/components/leftMenu';

const Index: FC = props => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      {/* <section className={styles.menu}>
        <LeftMenu />
      </section> */}
      <section className={styles.content}>{children}</section>
    </div>
  );
};

export default Index;
