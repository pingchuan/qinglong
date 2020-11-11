import React, { FC } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import Drawer from '@/components/drawer';
import { rulesLength } from '@/utils/validators';
import { FormName } from '../constant';
import { PlanValues } from '../type';
import styles from './index.less';

const { Item: FormItem } = Form;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Props {
  visible: boolean;
  onOk: (values: PlanValues) => void;
  onCancel: () => void;
  initialValues?: PlanValues;
}

const Index: FC<Props> = ({ visible, onOk, onCancel, initialValues }) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const [form] = Form.useForm();

  const onSubmit = async () => {
    const values = await form.validateFields();
    const [startTime, endTime] = values[FormName.timeRange];
    const reqObj = {
      ...initialValues,
      [FormName.name]: values[FormName.name],
      [FormName.hasMonthGap]: String(values[FormName.hasMonthGap]),
      [FormName.startTime]: startTime.valueOf(),
      [FormName.endTime]: endTime.valueOf(),
    };
    onOk(reqObj);
  };

  return (
    <Drawer
      title={initialValues ? '编辑任务' : '新增任务'}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <Form {...layout} name="basic" form={form} preserve={false}>
        <FormItem
          name={FormName.name}
          rules={rulesLength({ max: 64, required: true })}
          label="任务名称"
          initialValue={initialValues && initialValues[FormName.name]}
        >
          <Input placeholder="最多不超过64个字符" />
        </FormItem>
        <FormItem
          name={FormName.timeRange}
          rules={rulesLength({ required: true })}
          label="任务时间"
          initialValue={
            initialValues && [
              moment(initialValues[FormName.startTime]),
              moment(initialValues[FormName.endTime]),
            ]
          }
        >
          <RangePicker
            disabled={Boolean(initialValues)}
            className={styles.rangePicker}
          />
        </FormItem>
        <FormItem
          name={FormName.hasMonthGap}
          label="跨月是否有间隔"
          initialValue={
            (initialValues && String(initialValues[FormName.hasMonthGap])) ||
            '0'
          }
        >
          <Select placeholder="请选择">
            <Option value="0">无间隔标识</Option>
            <Option value="1">有间隔标识</Option>
          </Select>
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default Index;
