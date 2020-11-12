import React, { FC, useState, useEffect } from 'react';
import { history } from 'umi';
import { getCookie } from '@/utils/public';
import imageSrc from '@/assets/images/qinglong.png';
import LoginForm from './loginForm';
import RegisteredForm from './registeredForm';
import { LoginSubmitValues } from './type';
import { FormName } from './constant';
import styles from './index.less';

export enum TabEnum {
  login = 'login',
  registered = 'registered',
  loding = 'loding',
}

export interface SwithTab {
  (
    nextTab: React.SetStateAction<TabEnum>,
    initialValues?: LoginSubmitValues,
  ): void;
}

const getLoginInitFormValues = () => {
  return {
    [FormName.mail]: '',
    [FormName.password]: '',
  };
};

const Index: FC = () => {
  const [tab, setTab] = useState(TabEnum.loding);
  const [loginInitFormValues, setLoginInitFormValues] = useState<
    LoginSubmitValues
  >(getLoginInitFormValues());

  const switchTab: SwithTab = (nextTab, initialValues) => {
    if (initialValues) {
      setLoginInitFormValues(initialValues);
    } else {
      setLoginInitFormValues(getLoginInitFormValues());
    }
    setTab(nextTab);
  };

  useEffect(() => {
    const user = JSON.parse(getCookie('user') || '{}');
    if (user?.id || user?.mail) {
      history.push('/');
    } else {
      setTab(TabEnum.login);
      setLoginInitFormValues(getLoginInitFormValues());
    }
  }, []);
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
          <div className={styles.loginImage}>
            <img src={imageSrc} />
          </div>
          <div className={styles.formTitle}>青龙在线管理系统</div>
          {tab === TabEnum.login && (
            <LoginForm initialValues={loginInitFormValues} />
          )}
          {tab === TabEnum.registered && (
            <RegisteredForm switchTab={switchTab} />
          )}
          <div
            className={styles.switchButton}
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
