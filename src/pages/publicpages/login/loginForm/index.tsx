import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { rulesLength } from '@/utils/validators';
import { LoginSubmitValues } from '../type';
import { getCheckCode } from '../service';
import { FormName } from '../constant';
import styles from './index.less';

const { Item: FormItem } = Form;

interface Props {
  initialValues: LoginSubmitValues;
}

const Index: FC<Props> = ({ initialValues }) => {
  const [checkCodeSrc, setCheckCodeSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  // 获取验证码
  const getCheckCodeAsync = async () => {
    const { data } = await getCheckCode();
    setCheckCodeSrc(data as string);
  };

  // 提交登录
  const onSubmit = (values: LoginSubmitValues) => {
    console.log(values);
    setLoading(true);
  };

  useEffect(() => {
    getCheckCodeAsync();
  }, []);

  return (
    <Form
      {...layout}
      className={styles.form}
      name="basic"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <FormItem
        name={FormName.username}
        rules={rulesLength({ max: 32, required: true })}
      >
        <Input
          prefix={<UserOutlined className={styles.icon} />}
          placeholder="请输入用户名/邮箱"
        />
      </FormItem>
      <FormItem
        name={FormName.password}
        rules={rulesLength({ max: 32, required: true })}
      >
        <Input.Password
          prefix={<UnlockOutlined className={styles.icon} />}
          placeholder="请输入密码"
          onPaste={e => e.preventDefault()}
        />
      </FormItem>
      <FormItem>
        <FormItem
          name={FormName.checkCode}
          rules={rulesLength({ max: 32, required: true })}
          className={styles.checkCode}
        >
          <Input placeholder="请输入验证码" />
        </FormItem>
        <div className={styles.checkCodeImage} onClick={getCheckCodeAsync}>
          {checkCodeSrc && <img src={checkCodeSrc} />}
        </div>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" block loading={loading}>
          立即登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default Index;
