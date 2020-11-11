import React, { FC } from 'react';
import { Card, Avatar, message } from 'antd';
import { connect } from 'umi';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { UserInfo } from '@/models/authenticate';
import imageSrc from '@/assets/images/qinglong.png';
import styles from './index.less';

const { Meta } = Card;

interface Props {
  user: UserInfo;
}

const Index: FC<Props> = ({ user }) => {
  const onClick = () => message.warning('开发中');
  return (
    <Card
      className={styles.card}
      actions={[
        <SettingOutlined
          key="setting"
          className={styles.cardOperate}
          onClick={onClick}
        />,
        <EditOutlined
          key="edit"
          className={styles.cardOperate}
          onClick={onClick}
        />,
        <EllipsisOutlined
          key="ellipsis"
          className={styles.cardOperate}
          onClick={onClick}
        />,
      ]}
    >
      <Meta
        avatar={<Avatar size="large" src={user.image || imageSrc} />}
        title={user.username}
        description={user.mail}
      />
    </Card>
  );
};

export default connect(({ authenticate }) => ({ user: authenticate.user }))(
  Index,
);
