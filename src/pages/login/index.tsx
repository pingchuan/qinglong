import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Item: FormItem } = Form;

const Index: FC<{}> = ({}) => {
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  return (
    <div className={styles.loginBg}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.formTitle}>站点后台管理系统</div>
          <Form
            {...layout}
            className={styles.form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={values => console.log(values)}
            onFinishFailed={errorInfo => console.log(errorInfo)}
          >
            <FormItem
              label=""
              name="username"
              rules={[{ required: true, message: '用户名必填' }]}
            >
              <Input
                prefix={<UserOutlined className={styles.icon} />}
                placeholder="请输入用户名"
              />
            </FormItem>

            <FormItem
              label=""
              name="password"
              rules={[{ required: true, message: '密码必填' }]}
            >
              <Input.Password
                prefix={<UnlockOutlined className={styles.icon} />}
                placeholder="请输入用户名"
              />
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" block>
                立即登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Index;
