import React from 'react';
import Modal from '@/pages/frontpages/userPlan/planTimeLine';
import styles from './index.less';

export default () => {
  return (
    <div>
      <div className={styles.title}>test2</div>
      <Modal
        values={{
          id: 27,
          userId: 5,
          name: '计划测试1',
          startTime: 1604162402000,
          endTime: 1609416600000,
          createTime: 1604853607000,
          updateTime: 1604856015000,
          values: [
            {
              id: 13,
              time: '2020-11-01 00:00:00',
              phiz: 'A',
              planId: 27,
              description: '1号不知道干嘛',
              isDelete: 0,
              createTime: 1604853619000,
              updateTime: null,
            },
            {
              id: 14,
              time: '2020-12-31 00:00:00',
              phiz: 'B',
              planId: 27,
              description: '应该高兴才对',
              isDelete: 0,
              createTime: 1604856042000,
              updateTime: null,
            },
            {
              id: 18,
              time: '2020-12-05 00:00:00',
              phiz: 'C',
              planId: 27,
              description: '666',
              isDelete: 0,
              createTime: 1604929393000,
              updateTime: 1604929402000,
            },
            {
              id: 19,
              time: '2020-12-11 00:00:00',
              phiz: 'D',
              planId: 27,
              description: '健健康康就斤斤计较',
              isDelete: 0,
              createTime: 1604929418000,
              updateTime: null,
            },
          ],
        }}
      />
    </div>
  );
};
