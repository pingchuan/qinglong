import React from 'react';
import PlanItem from './planItem';
import { PlanValues } from './type';
import styles from './index.less';

const Index = () => {
  return (
    <div className={styles.content}>
      {new Array(5).fill(0).map((e, index) => {
        return (
          <PlanItem
            values={
              {
                id: 11,
                name: '任务测试',
                beginDate: '2020-11-22',
                endDate: '2020-12-09',
                vlaues: [
                  {
                    id: 1,
                    date: '2020-11-25',
                    description: 'asdfsadfsadfasdf',
                    phiz: 'A',
                  },
                  {
                    id: 2,
                    date: '2020-11-27',
                    description: 'sdafsdafsdafsdafsadfsadfsadfsadfsdafa',
                    phiz: 'C',
                  },
                ],
              } as PlanValues
            }
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Index;
