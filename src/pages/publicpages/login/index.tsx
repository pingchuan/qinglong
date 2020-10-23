import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UnlockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { getCheckCode } from './service';
import styles from './index.less';

const { Item: FormItem } = Form;
enum TabEnum {
  login = 'login',
  registered = 'registered',
}
let mailTimer: NodeJS.Timeout;

const Index: FC = () => {
  const [tab, setTab] = useState(TabEnum.login);
  const [checkCodeSrc, setCheckCodeSrc] = useState('');
  const [mailCheckCodeTime, setMailCheckCodeTime] = useState(0);
  const [upDateTimer, setUpDateTimer] = useState(false);

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  const switchTab = (nextTab: React.SetStateAction<TabEnum>) => {
    if (nextTab === TabEnum.login) {
      getCheckCodeAsync();
    }
    setTab(nextTab);
  };

  // 获取验证码
  const getCheckCodeAsync = async () => {
    const { data } = await getCheckCode();
    setCheckCodeSrc(data as string);
  };

  // 获取邮箱验证码
  const getMailCheckCodeAsync = async () => {
    setMailCheckCodeTime(30);
    setUpDateTimer(!upDateTimer);
  };

  useEffect(() => {
    getCheckCodeAsync();
  }, []);

  useEffect(() => {
    clearInterval(mailTimer);
    mailTimer = setInterval(() => {
      setMailCheckCodeTime(count => {
        if (count === 0) {
          clearInterval(mailTimer);
          return 0;
        }
        return count - 1;
      });
    }, 1000);
  }, [upDateTimer]);

  return (
    <div className={styles.loginBg}>
      <div
        className={
          tab === TabEnum.login
            ? styles.contentWrapperLogin
            : styles.contentWrapperRegistered
        }
      >
        <div className={styles.content}>
          <div className={styles.formTitle}>站点后台管理系统</div>
          {tab === TabEnum.login && (
            <Form
              {...layout}
              className={styles.form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={values => console.log(values)}
              onFinishFailed={errorInfo => console.log(errorInfo)}
            >
              <FormItem
                name="username"
                rules={[{ required: true, message: '该字段必填' }]}
              >
                <Input
                  prefix={<UserOutlined className={styles.icon} />}
                  placeholder="请输入用户名/邮箱"
                />
              </FormItem>

              <FormItem
                name="password"
                rules={[{ required: true, message: '该字段必填' }]}
              >
                <Input.Password
                  prefix={<UnlockOutlined className={styles.icon} />}
                  placeholder="请输入密码"
                />
              </FormItem>

              <FormItem>
                <FormItem
                  name="checkCode"
                  rules={[{ required: true, message: '该字段必填' }]}
                  className={styles.checkCode}
                >
                  <Input placeholder="请输入验证码" />
                </FormItem>
                <div
                  className={styles.checkCodeImage}
                  onClick={getCheckCodeAsync}
                >
                  {checkCodeSrc && <img src={checkCodeSrc} />}
                </div>
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit" block>
                  立即登录
                </Button>
              </FormItem>
            </Form>
          )}
          {tab === TabEnum.registered && (
            <Form
              {...layout}
              className={styles.form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={values => console.log(values)}
              onFinishFailed={errorInfo => console.log(errorInfo)}
            >
              <FormItem
                name="username"
                rules={[{ required: true, message: '该字段必填' }]}
              >
                <Input placeholder="请输入用户名" />
              </FormItem>

              <FormItem
                name="password"
                rules={[{ required: true, message: '该字段必填' }]}
              >
                <Input.Password placeholder="请输入密码" />
              </FormItem>

              <FormItem
                name="passwordRepeat"
                rules={[{ required: true, message: '该字段必填' }]}
              >
                <Input.Password
                  placeholder="请再次输入密码"
                  onPaste={e => e.preventDefault()}
                />
              </FormItem>

              <FormItem
                name="mail"
                rules={[{ required: true, message: '该字段必填' }]}
              >
                <Input placeholder="请输入邮箱" />
              </FormItem>

              <FormItem>
                <FormItem
                  name="checkCode"
                  rules={[{ required: true, message: '该字段必填' }]}
                  className={styles.checkCode}
                >
                  <Input placeholder="请输入验证码" />
                </FormItem>

                {mailCheckCodeTime === 0 ? (
                  <Button
                    type="link"
                    className={styles.checkCodeButton}
                    onClick={getMailCheckCodeAsync}
                  >
                    获取邮箱验证码
                  </Button>
                ) : (
                  <div
                    className={styles.mailCheckCodetime}
                  >{`${mailCheckCodeTime}秒后可重新获取`}</div>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" block>
                  立即注册
                </Button>
              </FormItem>
            </Form>
          )}
          <div
            className={styles.registered}
            onClick={() =>
              switchTab(
                tab === TabEnum.login ? TabEnum.registered : TabEnum.login,
              )
            }
          >
            {tab === TabEnum.login ? '注册' : '登录'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
