import React, { FC } from 'react';
import { Card, Avatar, message, Tooltip } from 'antd';
import { connect, history } from 'umi';
import {
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { UserInfo } from '@/models/authenticate';
import { getLogout } from '@/pages/publicpages/login/service';
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
        <Tooltip key="setting" title="设置">
          <SettingOutlined
            key="setting"
            className={styles.cardOperate}
            onClick={onClick}
          />
        </Tooltip>,
        <Tooltip key="edit" title="编辑用户信息">
          <EditOutlined
            className={styles.cardOperate}
            onClick={() => history.push('/qinglong/userInfo')}
          />
        </Tooltip>,
        <Tooltip key="logout" title="注销">
          <LogoutOutlined className={styles.cardOperate} onClick={getLogout} />
        </Tooltip>,
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
