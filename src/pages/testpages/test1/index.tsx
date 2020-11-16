import React, { useState } from 'react';
import Drawer from '@/components/drawer';
import FixedBack from '@/components/fixedBack';
import styles from './index.less';
import { getCheckCode } from './service';

export default () => {
  const [visible, setVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const getCheckCodeAsync = async () => {
    const { data } = await getCheckCode();

    setImageSrc(data as string);
  };
  const openDrawer = () => {
    setVisible(true);
  };

  return (
    <div>
      <div onClick={openDrawer}>open drawer</div>
      <div onClick={getCheckCodeAsync}>getCheckCode</div>
      <img src={imageSrc} />
      <div className={styles.content}>content</div>
      <Drawer
        title="添加问题"
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        1<div style={{ height: '1000px', width: '400px' }}></div>2
      </Drawer>
      <FixedBack />
    </div>
  );
};
