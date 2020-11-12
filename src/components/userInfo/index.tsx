import React, { forwardRef, useImperativeHandle } from 'react';
import { Avatar, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import { UserInfo } from '@/models/authenticate';
import imageSrc from '@/assets/images/qinglong.png';
import { rulesLength } from '@/utils/validators';
import { FormName } from './constant';
import styles from './index.less';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;

interface Props {
  user: UserInfo;
  ref: React.RefObject<UserRef>;
}

export interface UserRef {
  getData: () => Promise<UserInfo>;
}

const Index = forwardRef<UserRef, Props>(({ user }, ref) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const getData = async (): Promise<UserInfo> => {
    const values = await form.validateFields();
    const result = { ...user, ...values };
    return Promise.resolve(result);
  };
  useImperativeHandle(ref, () => ({
    getData,
  }));

  return (
    <div className={styles.userInfo}>
      <section className={styles.userLeft}>
        <div>
          <Avatar size={80} src={user.image || imageSrc} />
          <b>{user.username}</b>
          <span className={styles.mail}>{user.mail}</span>
        </div>
      </section>
      <section className={styles.userRight}>
        <Form
          {...layout}
          name="basic"
          form={form}
          preserve={false}
          initialValues={{
            ...user,
            birthday: user.birthday ? moment(user.birthday) : null,
          }}
        >
          <FormItem
            label="用户名"
            name={FormName.username}
            rules={rulesLength({ max: 32, required: true })}
          >
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="性别" name={FormName.sex}>
            <Select placeholder="请选择">
              <Option value="man">男</Option>
              <Option value="woman">女</Option>
            </Select>
          </FormItem>
          <FormItem label="生日" name={FormName.birthday}>
            <DatePicker className={styles.dateForm} />
          </FormItem>
          <FormItem
            label="手机"
            name={FormName.cellPhone}
            rules={rulesLength({ max: 32 })}
          >
            <Input placeholder="请输入手机" />
          </FormItem>
          <FormItem
            label="固定电话"
            name={FormName.phone}
            rules={rulesLength({ max: 32 })}
          >
            <Input placeholder="请输入固定电话" />
          </FormItem>
          <FormItem
            label="描述"
            name={FormName.description}
            rules={rulesLength({ max: 200 })}
          >
            <TextArea rows={3} placeholder="不超过200字" />
          </FormItem>
        </Form>
      </section>
    </div>
  );
});

export { UserInfo } from '@/models/authenticate';
export default Index;
