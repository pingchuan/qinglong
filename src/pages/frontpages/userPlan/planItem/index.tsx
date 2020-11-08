import React, { FC, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'umi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteModal from '@/components/deleteModel';
import { PlanValues, PlanDayValues } from '../type';
import { EnumPhiz } from '../constant';
import { putPlan, deletePlan } from '../service';
import PlanDraWer from '../planDrawer';
import Strip from './strip';
import styles from './index.less';

interface Props {
  values: PlanValues;
}

const Index: FC<Props> = ({ values: propsValues }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const momentFormat = 'YYYY-MM-DD';
  const {
    name,
    startTime,
    endTime,
    values: planDayValues,
    id: planId,
  } = propsValues;
  const planDateCount = moment(endTime).diff(startTime, 'day') + 1;

  const onSubmit = async (values: PlanValues) => {
    const { id } = await putPlan(values);
    if (id) {
      setVisible(false);
      dispatch({ type: 'planModal/getList' });
    }
  };

  const onDelete = async (deleteId: number) => {
    const { successCount } = await deletePlan({ id: deleteId });
    if (successCount) {
      dispatch({ type: 'planModal/getList' });
    }
  };

  return (
    <>
      <div className={styles.planItem}>
        <div className={styles.name}>
          <div className={styles.editAndDelete}>
            <EditOutlined onClick={() => setVisible(true)} />
            <DeleteModal onOk={onDelete} id={Number(planId)}>
              <DeleteOutlined className={styles.delete} />
            </DeleteModal>
          </div>
          <div className={styles.timeRange}>{`${moment(startTime).format(
            momentFormat,
          )} 至 ${moment(endTime).format(momentFormat)}`}</div>
          {name}
        </div>
        <div className={styles.operate}>
          {new Array(planDateCount).fill(0).map((e, index) => {
            const currentDate = moment(startTime)
              .add(index, 'day')
              .format(momentFormat);
            const initPlanDayValues: PlanDayValues = {
              id: 0,
              planId,
              time: currentDate,
              description: '',
              phiz: EnumPhiz.B,
            };
            const currentValue =
              (planDayValues || []).find(
                item => !moment(item.time).diff(currentDate, 'day'),
              ) || initPlanDayValues;
            return <Strip key={index} value={currentValue} />;
          })}
        </div>
      </div>
      <PlanDraWer
        visible={visible}
        onOk={onSubmit}
        onCancel={() => setVisible(false)}
        initialValues={propsValues}
      />
    </>
  );
};

export default Index;
