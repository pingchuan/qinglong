import React, { useState } from 'react';
import Drawer from '@/components/drawer';
import FixedBack from '@/components/fixedBack';
import styles from './index.less';
import { test } from './service';

export default () => {
  const [visible, setVisible] = useState(false);
  const sendRequest = async () => {
    const res = await test({ key1: 'value1' });
    console.log(res, '#send');
  };
  const openDrawer = () => {
    setVisible(true);
  };

  return (
    <div>
      <div onClick={sendRequest}>send request</div>
      <div onClick={openDrawer}>open drawer</div>
      <div className={styles.content}>content</div>
      <Drawer
        title="添加问题"
        visible={visible}
        onCancel={setVisible.bind(null, false)}
      >
        1<div style={{ height: '1000px', width: '400px' }}></div>2
      </Drawer>
      <FixedBack />
    </div>
  );
};
