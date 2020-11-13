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
import DeleteModal from '@/components/deleteModel';
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
        <DeleteModal
          key="logout"
          id="logout"
          content="注销操作将关闭此页面，并删除您在浏览器中所暂存的个人信息"
          onOk={getLogout}
        >
          <Tooltip title="注销">
            <LogoutOutlined className={styles.cardOperate} />
          </Tooltip>
        </DeleteModal>,
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
