import React, { FC } from 'react';
import { Drawer } from 'antd';
import styles from './index.less';

interface Props {
  visible: boolean;
  value?: string;
  onClose: () => void;
}

const Index: FC<Props> = ({ visible, value, onClose }) => {
  return (
    <Drawer
      className={styles.drawer}
      width="calc(100vw - 250px)"
      visible={visible}
      onClose={onClose}
      bodyStyle={{
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    </Drawer>
  );
};

export default Index;
