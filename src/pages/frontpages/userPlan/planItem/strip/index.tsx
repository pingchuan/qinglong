import React, { FC, useState } from 'react';
import { Modal, Form, Radio, Input } from 'antd';
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
}

const Index: FC<Props> = ({ value: propValue }) => {
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
  return (
    <>
      <div className={styles.strip} onClick={() => setVisible(true)}>
        {moment(propValue.time).format('DD')}
        {propValue.description && <div className={styles.stripNote}></div>}
      </div>
      <Modal
        title={moment(propValue.time).format('YYYY年MM月DD日')}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onSubmit}
      >
        <Form {...layout} name="basic" form={form} initialValues={propValue}>
          <FormItem name={EnumStripFormName.phiz} label="当日心情">
            <RadioGroup>
              <Radio value={EnumPhiz.A}>
                <FrownTwoTone twoToneColor="#16a085" />
              </Radio>
              <Radio value={EnumPhiz.B}>
                <MehTwoTone twoToneColor="#16a085" />
              </Radio>
              <Radio value={EnumPhiz.C}>
                <SmileTwoTone twoToneColor="#16a085" />
              </Radio>
              <Radio value={EnumPhiz.D}>
                <SmileTwoTone twoToneColor="#16a085" rotate={180} />
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
