import React, { FC, useRef } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import UserInfo, {
  UserRef,
  UserInfo as UserInfoType,
} from '@/components/userInfo';
import { setCookie } from '@/utils/public';
import { putUserInfo } from '@/service';
import styles from './index.less';

interface Props {
  user: UserInfoType;
  dispatch: Dispatch;
}

const Index: FC<Props> = ({ user, dispatch }) => {
  const userRef = useRef<UserRef>(null);

  const onSubmit = async () => {
    const values = await userRef.current?.getData();
    if (values) {
      const userRes = await putUserInfo({
        ...values,
        birthday: values.birthday
          ? moment(values.birthday).valueOf()
          : values.birthday,
      });
      if (userRes.id) {
        setCookie('user', JSON.stringify(user));
        dispatch({
          type: 'authenticate/getCurrentUser',
          payload: { id: user.id },
        });
      }
    }
  };

  return (
    <div className={styles.content}>
      <UserInfo key={JSON.stringify(user)} user={user} ref={userRef} />
      <Button className={styles.button} onClick={onSubmit}>
        保存
      </Button>
    </div>
  );
};

export default connect(({ authenticate }) => ({ user: authenticate.user }))(
  Index,
);
