import React, { FC, useState, useEffect, useRef } from 'react';
import { Table, Tooltip, Button, Modal } from 'antd';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { WomanOutlined, ManOutlined, EditOutlined } from '@ant-design/icons';
import { getUserInfo, putUserInfo } from '@/service';
import { UserInfo as UserInfoType } from '@/models/authenticate';
import { ColumnsType } from 'antd/es/table';
import UserInfo, { UserRef } from '@/components/userInfo';
import { setCookie } from '@/utils/public';
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
        return <img className={styles.userImage} src={value} />;
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
      render: value => value && moment().diff(moment(value), 'year'),
    },
    {
      width: 150,
      title: '手机',
      dataIndex: 'cellPhone',
    },
    {
      width: 150,
      title: '固定电话',
      dataIndex: 'phone',
    },
    {
      width: 200,
      title: '邮箱',
      dataIndex: 'mail',
    },
    {
      width: 80,
      title: '操作',
      dataIndex: 'id',
      render: (_, record) => {
        return (
          <Tooltip title="编辑">
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => modalChange(true, record)}
            />
          </Tooltip>
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
      const resUser = await putUserInfo({
        ...values,
        birthday: values.birthday
          ? moment(values.birthday).valueOf()
          : values.birthday,
      });

      if (resUser) {
        getUserInfoAsync();
        modalChange(false);
        if (currentUser.id === resUser.id) {
          setCookie('user', JSON.stringify(resUser));
          dispatch({
            type: 'authenticate/getCurrentUser',
            payload: { id: resUser.id },
          });
        }
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

    setModalData({ visible: modalData.visible, user: resUser });
    if (currentUser.id === resUser.id) {
      setCookie('user', JSON.stringify(resUser));
      dispatch({
        type: 'authenticate/getCurrentUser',
        payload: { id: resUser.id },
      });
    }
    if (resUser) {
      cb && cb();
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
        onCancel={() => {
          modalChange(false);
          getUserInfoAsync();
        }}
        destroyOnClose
        maskClosable={false}
      >
        <UserInfo
          user={modalData.user}
          ref={userRef}
          imageUploadCallback={imageUploadCallback}
        />
      </Modal>
    </div>
  );
};

export default connect(({ authenticate }) => ({
  currentUser: authenticate.user,
}))(Index);
