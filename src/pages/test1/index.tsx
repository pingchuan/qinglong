import React from 'react';
import styles from './index.less';
import { test } from './service';


export default () => {
  const send = async () => {
    const res = await test({ key1: 'value1' });
    console.log(res, '#send');
  }

  return (
    <div>
      <div className={styles.title} onClick={send}>test1</div>
    </div>
  );
}
