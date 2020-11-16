import React, { FC } from 'react';
import { Modal, Timeline } from 'antd';
import moment from 'moment';
import { FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PlanValues, PlanDayValues } from '../type';
import { EnumPhiz } from '../constant';
import styles from './index.less';

interface Props {
  values: PlanValues;
  visible: boolean;
  onCancel: () => void;
}

const { Item: TimelineItem } = Timeline;
const momentFormat = 'YYYY-MM-DD';
const momentFormatZh = 'YYYY年MM月DD日';

const Index: FC<Props> = ({ values: valuesProps, visible, onCancel }) => {
  const { startTime, endTime, values } = valuesProps;
  const sortValues = (values || []).sort((x, y) =>
    moment(x.time).diff(moment(y.time)),
  );
  const getTimeLineItem = (planDayArr?: PlanDayValues[]) => {
    return (planDayArr || []).map(item => {
      const { time, description, phiz, id } = item;
      let dot = null;

      switch (phiz) {
        case EnumPhiz.A:
          dot = <FrownTwoTone twoToneColor="#1890ff" />;
          break;
        case EnumPhiz.B:
          dot = <MehTwoTone twoToneColor="#ffb053" />;
          break;
        case EnumPhiz.C:
          dot = <SmileTwoTone twoToneColor="#8ce527" />;
          break;
        case EnumPhiz.D:
          dot = <SmileTwoTone twoToneColor="#16a085" rotate={180} />;
          break;
        default:
          dot = null;
      }
      return (
        <TimelineItem dot={dot} key={id}>
          <div className={styles.time}>{moment(time).format(momentFormat)}</div>
          <div className={styles.description}>{description}</div>
        </TimelineItem>
      );
    });
  };

  return (
    <Modal
      title={
        <span>
          <span>{moment(startTime).format(momentFormatZh)}</span>
          <span className={styles.to}> 至 </span>
          <span>{moment(endTime).format(momentFormatZh)}</span>
        </span>
      }
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      maskClosable={false}
      footer={null}
    >
      <Timeline
        mode="alternate"
        pending={
          moment(endTime).format(momentFormat) ===
          moment([...sortValues].pop()?.time).format(momentFormat)
            ? false
            : true
        }
      >
        {getTimeLineItem(sortValues)}
      </Timeline>
    </Modal>
  );
};

export default Index;
