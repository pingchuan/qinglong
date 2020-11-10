import React, { FC, useState } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { useDispatch } from 'umi';
import {
  DeleteOutlined,
  EditOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';
import DeleteModal from '@/components/deleteModel';
import { PlanValues, PlanDayValues } from '../type';
import { EnumPhiz } from '../constant';
import { putPlan, deletePlan } from '../service';
import PlanDraWer from '../planDrawer';
import PlanTimeLine from '../planTimeLine';
import Strip from './strip';
import styles from './index.less';

interface Props {
  values: PlanValues;
}

interface TimeLineObj {
  visible: boolean;
  values: PlanValues;
}

const Index: FC<Props> = ({ values: propsValues }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [timeLineObj, setTimeLineObj] = useState<TimeLineObj>({
    visible: false,
    values: {} as PlanValues,
  });
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
          {propsValues.values?.length && (
            <div className={styles.timeLine}>
              <Tooltip title="时间图谱">
                <NodeIndexOutlined
                  onClick={() =>
                    setTimeLineObj({
                      visible: true,
                      values: propsValues,
                    })
                  }
                />
              </Tooltip>
            </div>
          )}
          <div
            className={styles.editAndDelete}
            style={{ left: propsValues.values?.length ? '30px' : '0px' }}
          >
            <Tooltip title="编辑">
              <EditOutlined onClick={() => setVisible(true)} />
            </Tooltip>
            <DeleteModal onOk={onDelete} id={Number(planId)}>
              <Tooltip title="删除">
                <DeleteOutlined className={styles.delete} />
              </Tooltip>
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
      <PlanTimeLine
        visible={timeLineObj.visible}
        values={timeLineObj.values}
        onCancel={() =>
          setTimeLineObj({
            visible: false,
            values: {} as PlanValues,
          })
        }
      />
    </>
  );
};

export default Index;
