import React, { FC } from 'react';
import { Table, Tooltip, Space } from 'antd';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import styles from './index.less';

const Index: FC = () => {
  const columns: ColumnsType<UserInfo> = [
    {
      width: 65,
      title: '头像',
      dataIndex: 'headImage',
      render: value => {
        return <img className={styles.userImage} src={value} />;
      },
    },
    {
      ellipsis: true,
      title: '姓名',
      dataIndex: 'name',
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
      dataIndex: 'age',
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
      width: 180,
      title: '邮箱',
      dataIndex: 'mail',
    },
    {
      width: 140,
      title: '操作',
      dataIndex: 'id',
      render: (id, record) => {
        return (
          <Space>
            <a>编辑</a>
            <a>删除</a>
          </Space>
        );
      },
    },
  ];

  const data: UserInfo[] = new Array(20).fill(0).map((e, index) => ({
    id: index + '',
    name:
      'John BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn BrownJohn Brown',
    age: 32,
    sex: index % 2 === 0 ? 'woman' : 'man',
    cellPhone: '15847986438',
    phone: '023-78226911',
    mail: '10571022282@qq.com',
    headImage: '/icon.jpg',
    description:
      index % 2 === 0
        ? '按照 React 的规范，所有的数组组件必须绑定 key。在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值。对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。'
        : '',
  }));

  return (
    <div className={styles.userList}>
      <Table<UserInfo>
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
    </div>
  );
};

export default Index;
