import React, { FC, useState, useEffect, useRef } from 'react';
import { Table, Tooltip, Space, Button, Modal } from 'antd';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';
import { getUserInfo, putUserInfo } from '@/service';
import { UserInfo as UserInfoType } from '@/models/authenticate';
import imageSrc from '@/assets/images/qinglong.png';
import { ColumnsType } from 'antd/es/table';
import UserInfo, { UserRef } from '@/components/userInfo';
import styles from './index.less';

interface Props {
  currentUser: UserInfoType;
  dispatch: Dispatch;
}
interface ModalData {
  visible: boolean;
  user: UserInfoType;
}

const initUser = (): UserInfoType => ({
  id: '',
  username: '',
  mail: '',
});

const Index: FC<Props> = ({ currentUser, dispatch }) => {
  const userRef = useRef<UserRef>(null);
  const [data, setData] = useState<UserInfoType[]>([]);
  const [modalData, setModalData] = useState<ModalData>({
    visible: false,
    user: initUser(),
  });
  const columns: ColumnsType<UserInfoType> = [
    {
      width: 65,
      title: '头像',
      dataIndex: 'image',
      render: value => {
        return <img className={styles.userImage} src={value || imageSrc} />;
      },
    },
    {
      ellipsis: true,
      title: '姓名',
      dataIndex: 'username',
    },
    {
      width: 80,
      title: '性别',
      dataIndex: 'sex',
      render: value => {
        let sexIcon = null;
        if (value === 'man') {
          sexIcon = (
            <Tooltip title="男">
              <ManOutlined className={styles.man} />
            </Tooltip>
          );
        } else if (value === 'woman') {
          sexIcon = (
            <Tooltip title="女">
              <WomanOutlined className={styles.woman} />
            </Tooltip>
          );
        }
        return sexIcon;
      },
    },
    {
      width: 80,
      title: '年龄',
      dataIndex: 'birthday',
      render: value => moment().diff(moment(value), 'year'),
    },
    {
      width: 180,
      title: '手机',
      dataIndex: 'cellPhone',
    },
    {
      width: 180,
      title: '固定电话',
      dataIndex: 'phone',
    },
    {
      width: 180,
      title: '邮箱',
      dataIndex: 'mail',
    },
    {
      width: 160,
      title: '操作',
      dataIndex: 'id',
      render: (_, record) => {
        return (
          <Space>
            <Button type="link" onClick={() => modalChange(true, record)}>
              编辑
            </Button>
            <Button type="link" disabled>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const getUserInfoAsync = async () => {
    const res = await getUserInfo();
    setData(res);
  };

  const modalChange = (modalVisible: boolean, modalUser?: UserInfoType) => {
    setModalData({
      visible: modalVisible,
      user: modalUser || initUser(),
    });
  };

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
        getUserInfoAsync();
        modalChange(false);
        if (currentUser.id === userRes.id) {
          dispatch({
            type: 'authenticate/getCurrentUser',
            payload: { id: userRes.id },
          });
        }
      }
    }
  };

  useEffect(() => {
    getUserInfoAsync();
  }, []);

  return (
    <div className={styles.userList}>
      <Table<UserInfoType>
        rowKey="id"
        bordered={true}
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: record => (
            <p className={styles.description}>描述：{record.description}</p>
          ),
          rowExpandable: record => Boolean(record.description),
        }}
      />
      <Modal
        width={800}
        title="编辑用户信息"
        visible={modalData.visible}
        onOk={onSubmit}
        onCancel={() => modalChange(false)}
        destroyOnClose
      >
        <UserInfo user={modalData.user} ref={userRef} />
      </Modal>
    </div>
  );
};

export default connect(({ authenticate }) => ({
  currentUser: authenticate.user,
}))(Index);
