import React, { FC, useState, useEffect } from 'react';
import LoginForm from './loginForm';
import RegisteredForm from './registeredForm';
import { LoginSubmitValues } from './type';
import { FormName } from './constant';
import styles from './index.less';

export enum TabEnum {
  login = 'login',
  registered = 'registered',
}

export interface SwithTab {
  (
    nextTab: React.SetStateAction<TabEnum>,
    initialValues?: LoginSubmitValues,
  ): void;
}

const getLoginInitFormValues = () => {
  return {
    [FormName.username]: '',
    [FormName.password]: '',
  };
};

const Index: FC = () => {
  const [tab, setTab] = useState(TabEnum.login);
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
    setLoginInitFormValues(getLoginInitFormValues());
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
          <div className={styles.formTitle}>站点后台管理系统</div>
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
