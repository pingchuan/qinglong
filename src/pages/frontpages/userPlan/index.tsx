import React, { useState, useEffect, FC } from 'react';
import { Button } from 'antd';
import { connect } from 'umi';
import { Dispatch } from 'redux';
import PlanItem from './planItem';
import PlanDraWer from './planDrawer';
import { PlanValues } from './type';
import { postPlan } from './service';
import styles from './index.less';

interface Props {
  list: PlanValues[];
  dispatch: Dispatch;
}

const Index: FC<Props> = props => {
  const { list, dispatch } = props;

  const [visible, setVisible] = useState(false);

  const onSubmit = async (values: PlanValues) => {
    const { id } = await postPlan(values);
    if (id) {
      setVisible(false);
      dispatch({ type: 'planModal/getList' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'planModal/getList' });
  }, []);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.operate}>
          <Button type="primary" onClick={() => setVisible(true)}>
            新增任务
          </Button>
        </div>
        {list.map((item, index) => {
          return <PlanItem values={item} key={index} />;
        })}
      </div>
      <PlanDraWer
        visible={visible}
        onOk={onSubmit}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default connect(({ planModal }) => ({
  list: planModal.list,
}))(Index);
