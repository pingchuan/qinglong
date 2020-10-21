import React, { FC, useEffect, useState } from 'react';
import { RollbackOutlined } from '@ant-design/icons';
import styles from './index.less';

const Index: FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = window;
    const onMouseEvent = function(event: MouseEvent) {
      const clientX = event.clientX;
      const clientY = event.clientY;
      const windowW = element.innerWidth;
      const windowH = element.innerHeight;
      if (windowW - clientX < 84 && windowH - clientY < 84) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    element.addEventListener('mousemove', onMouseEvent);
    return () => {
      element.removeEventListener('mousemove', onMouseEvent);
    };
  }, []);
  return visible ? (
    <div className={styles.content}>
      <RollbackOutlined />
    </div>
  ) : null;
};

export default Index;
