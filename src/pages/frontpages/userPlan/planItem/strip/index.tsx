import React, { FC, useState } from 'react';
import { Modal, Form, Radio, Input, Tooltip } from 'antd';
import moment from 'moment';
import { useDispatch } from 'umi';
import { FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PlanDayValues } from '../../type';
import { EnumPhiz, EnumStripFormName } from '../../constant';
import { postPlanDay, putPlanDay } from '../../service';
import styles from './index.less';

const { Item: FormItem } = Form;
const { Group: RadioGroup } = Radio;
const { TextArea } = Input;

interface Props {
  value: PlanDayValues;
  showYearMonth?: boolean;
}

const Index: FC<Props> = ({ value: propValue, showYearMonth }) => {
  const dispatch = useDispatch();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onSubmit = async () => {
    const values = await form.validateFields();
    const reqObj = { ...propValue, ...values };
    const postAndPutPlanDay = reqObj.id ? putPlanDay : postPlanDay;
    const { id } = await postAndPutPlanDay(reqObj);
    if (id) {
      setVisible(false);
      dispatch({ type: 'planModal/getList' });
    }
  };
  const currentDay = moment(propValue.time).format('DD');
  const currentYearMonth = moment(propValue.time).format('YYYY年MM月');

  return (
    <>
      {showYearMonth && (
        <div className={styles.currentYearMonth}>{currentYearMonth}：</div>
      )}
      <div
        className={styles.strip}
        onClick={() => {
          setVisible(true);
          form.resetFields();
        }}
      >
        {currentDay}
        {propValue.description && <div className={styles.stripNote}></div>}
      </div>
      <Modal
        title={moment(propValue.time).format('YYYY年MM月DD日')}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onSubmit}
        maskClosable={false}
        destroyOnClose
      >
        <Form {...layout} name="basic" form={form} initialValues={propValue}>
          <FormItem name={EnumStripFormName.phiz} label="当日心情">
            <RadioGroup>
              <Radio value={EnumPhiz.A}>
                <Tooltip title="低于60分">
                  <FrownTwoTone twoToneColor="#1890ff" />
                </Tooltip>
              </Radio>
              <Radio value={EnumPhiz.B}>
                <Tooltip title="60分到80分">
                  <MehTwoTone twoToneColor="#ffb053" />
                </Tooltip>
              </Radio>
              <Radio value={EnumPhiz.C}>
                <Tooltip title="80分到120分">
                  <SmileTwoTone twoToneColor="#8ce527" />
                </Tooltip>
              </Radio>
              <Radio value={EnumPhiz.D}>
                <Tooltip title="高于120分">
                  <SmileTwoTone twoToneColor="#16a085" rotate={180} />
                </Tooltip>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem name={EnumStripFormName.description} label="描述">
            <TextArea rows={1} placeholder="不超过200字" />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
