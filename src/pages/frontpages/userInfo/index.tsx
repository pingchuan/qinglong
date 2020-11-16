import React, { FC, useRef } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { connect, Dispatch, history } from 'umi';
import UserInfo, { UserRef } from '@/components/userInfo';
import { UserInfo as UserInfoType } from '@/models/authenticate';
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
      const resUser = await putUserInfo({
        ...values,
        birthday: values.birthday
          ? moment(values.birthday).valueOf()
          : values.birthday,
      });

      if (resUser) {
        setCookie('user', JSON.stringify(resUser));
        dispatch({
          type: 'authenticate/getCurrentUser',
          payload: { id: resUser.id },
        });
      }
    }
  };

  const imageUploadCallback = async (
    imageUploadUser: UserInfoType,
    cb?: () => void,
  ): Promise<void> => {
    const resUser = await putUserInfo({
      ...imageUploadUser,
      birthday: imageUploadUser.birthday
        ? moment(imageUploadUser.birthday).valueOf()
        : imageUploadUser.birthday,
    });

    if (resUser) {
      setCookie('user', JSON.stringify(resUser));
      dispatch({
        type: 'authenticate/getCurrentUser',
        payload: { id: resUser.id },
      });
      cb && cb();
    }
  };

  return (
    <div className={styles.content}>
      <UserInfo
        key={JSON.stringify(user)}
        user={user}
        imageUploadCallback={imageUploadCallback}
        ref={userRef}
      />
      <Button className={styles.button} onClick={onSubmit}>
        保存
      </Button>
      <Button className={styles.button} type="dashed" onClick={history.goBack}>
        返回
      </Button>
    </div>
  );
};

export default connect(({ authenticate }) => ({ user: authenticate.user }))(
  Index,
);
