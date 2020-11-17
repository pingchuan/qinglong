import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Avatar, Form, Input, Select, DatePicker, Tooltip } from 'antd';
import moment from 'moment';
import { UserInfo } from '@/models/authenticate';
import { rulesLength } from '@/utils/validators';
import Crop from '@/components/crop';
import { FormName } from './constant';
import styles from './index.less';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;

interface Props {
  user: UserInfo;
  ref: React.RefObject<UserRef>;
  imageUploadCallback?: (
    user: UserInfo,
    cb?: () => void,
  ) => void | Promise<void>;
}

export interface UserRef {
  getData: () => Promise<UserInfo>;
}

const Index = forwardRef<UserRef, Props>(
  ({ user, imageUploadCallback }, ref) => {
    const [form] = Form.useForm();
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const [visible, setVisible] = useState(false);
    const [cropImage, setCropImage] = useState('');
    const getData = async (): Promise<UserInfo> => {
      const values = await form.validateFields();
      const result = Object.assign(
        { ...user, ...values },
        cropImage ? { image: cropImage } : null,
      );

      return Promise.resolve(result);
    };

    useImperativeHandle(ref, () => ({
      getData,
    }));

    const imageSubmit = (imagePath: string) => {
      if (imagePath && imageUploadCallback) {
        imageUploadCallback({ ...user, image: imagePath }, () => {
          setCropImage('');
          setVisible(false);
        });
      } else if (imagePath) {
        setCropImage(imagePath);
        setVisible(false);
      }
    };

    return (
      <>
        <div className={styles.userInfo}>
          <section className={styles.userLeft}>
            <div>
              <Tooltip title="点击更新头像">
                <a onClick={() => setVisible(true)}>
                  <Avatar size={80} src={user.image} />
                </a>
              </Tooltip>
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
        <Crop
          visible={visible}
          defaultUrl={user.image}
          onOk={imageSubmit}
          onCancel={() => setVisible(false)}
        />
      </>
    );
  },
);

export default Index;
