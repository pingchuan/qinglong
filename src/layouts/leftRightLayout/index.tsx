import React, { FC } from 'react';
import styles from './index.less';
import Menu from './menu';
import Card from './card';

const Index: FC = props => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <section className={styles.menu}>
        <Card />
        <div className={styles.leftMenu}>
          <Menu />
        </div>
      </section>
      <section className={styles.content}>{children}</section>
    </div>
  );
};

export default Index;
