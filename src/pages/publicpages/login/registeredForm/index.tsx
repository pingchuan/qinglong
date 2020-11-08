import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { validatorLength, rulesLength } from '@/utils/validators';
import { SwithTab, TabEnum } from '../index';
import { FormName } from '../constant';
import { RegisteredSubmitValues } from '../type';
import { postRegistered, getMailCheckCode } from '../service';
import styles from './index.less';

const { Item: FormItem } = Form;
let mailTimer: NodeJS.Timeout;

interface Props {
  switchTab: SwithTab;
}

const Index: FC<Props> = ({ switchTab }) => {
  const [mailCheckCodeTime, setMailCheckCodeTime] = useState(0);
  const [upDateTimer, setUpDateTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkCodeLoading, setCheckCodeLoading] = useState(false);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  // 获取邮箱验证码
  const getMailCheckCodeAsync = async () => {
    await form.validateFields([FormName.mail]);
    setCheckCodeLoading(true);
    const { isSuccess } = await getMailCheckCode({
      mail: form.getFieldValue(FormName.mail),
    });
    setCheckCodeLoading(false);
    if (isSuccess) {
      setMailCheckCodeTime(30);
      localStorage.setItem('mailTime', String(30));
      setUpDateTimer(!upDateTimer);
    }
  };

  // 提交注册
  const onSubmit = async (values: RegisteredSubmitValues) => {
    setLoading(true);
    const { id } = await postRegistered(values);
    setLoading(false);
    if (id) {
      message.success('注册成功');
      clearInterval(mailTimer);
      localStorage.setItem('mailTime', '0');
      // 利用事件循环原理清空定时器后再跳转
      setTimeout(() => {
        switchTab(TabEnum.login, {
          [FormName.mail]: values[FormName.mail],
          [FormName.password]: values[FormName.password],
        });
      }, 0);
    }
  };

  useEffect(() => {
    const localStorageTime = localStorage.getItem('mailTime');
    setMailCheckCodeTime(Number(localStorageTime));
    clearInterval(mailTimer);
    mailTimer = setInterval(() => {
      setMailCheckCodeTime(count => {
        if (count === 0) {
          clearInterval(mailTimer);
          localStorage.setItem('mailTime', '0');
          return 0;
        }
        const nextCount = count - 1;
        localStorage.setItem('mailTime', String(nextCount));
        return nextCount;
      });
    }, 1000);
    return () => clearInterval(mailTimer);
  }, [upDateTimer]);

  return (
    <Form
      form={form}
      {...layout}
      className={styles.form}
      name="basic"
      onFinish={onSubmit}
    >
      <FormItem
        name={FormName.username}
        rules={rulesLength({ max: 32, required: true })}
      >
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem
        name={FormName.password}
        rules={rulesLength({ min: 6, max: 16, required: true })}
      >
        <Input.Password
          placeholder="请输入密码"
          onPaste={e => e.preventDefault()}
        />
      </FormItem>
      <FormItem
        name={FormName.passwordRepeat}
        dependencies={[FormName.password]}
        rules={[
          {
            required: true,
            message: '该字段必填',
          },
          ({ getFieldValue }) => ({
            validator: (_, value) => {
              return validatorLength(value, { min: 6, max: 16 }, () => {
                if (value && getFieldValue(FormName.password) !== value) {
                  return Promise.reject('两次输入密码不一致');
                } else {
                  return Promise.resolve();
                }
              });
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="请再次输入密码"
          onPaste={e => e.preventDefault()}
        />
      </FormItem>
      <FormItem
        name={FormName.mail}
        rules={[
          { type: 'email', message: '请输入正确的邮箱格式' },
          { required: true, message: '该字段必填' },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </FormItem>
      <FormItem>
        <FormItem
          name={FormName.mailCheckCode}
          rules={rulesLength({ max: 32, required: true })}
          className={styles.checkCode}
        >
          <Input placeholder="请输入验证码" />
        </FormItem>
        {mailCheckCodeTime === 0 ? (
          <Button
            type="link"
            className={styles.checkCodeButton}
            onClick={getMailCheckCodeAsync}
            loading={checkCodeLoading}
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
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className={styles.button}
        >
          立即注册
        </Button>
      </FormItem>
    </Form>
  );
};

export default Index;
