import React, { FC } from 'react';
import moment from 'moment';
import { PlanValues, PlanDateValues } from '../type';
import { EnumPhiz } from '../constant';
import Strip from './strip';
import styles from './index.less';

interface Props {
  values: PlanValues;
}

const Index: FC<Props> = ({ values }) => {
  const { name, beginDate, endDate, vlaues: planDateValues } = values;
  const planDateCount = moment(endDate).diff(beginDate, 'day');
  return (
    <div className={styles.planItem}>
      <div className={styles.name}>{name}</div>
      <div className={styles.operate}>
        <div className={styles.operateNote}>{`${beginDate} 至 ${endDate}`}</div>
        {new Array(planDateCount).fill(0).map((e, index) => {
          const currentDate = moment(beginDate)
            .add(index + 1, 'day')
            .format('YYYY-MM-DD');
          const initPlanDateValues: PlanDateValues = {
            id: '',
            date: currentDate,
            description: '',
            phiz: EnumPhiz.B,
          };
          const currentValue =
            planDateValues.find(
              item => !moment(item.date).diff(currentDate, 'day'),
            ) || initPlanDateValues;
          return <Strip key={index} value={currentValue} />;
        })}
      </div>
    </div>
  );
};

export default Index;
