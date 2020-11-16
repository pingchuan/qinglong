import React, { FC, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { rulesLength } from '@/utils/validators';
import { FormName } from './constant';
import styles from './index.less';

const { Item: FormItem } = Form;
const { TextArea } = Input;

interface ModalData {
  visible: boolean;
  data: Article;
}

const initArticle = (): Article => ({
  name: '',
  description: '',
});

const Index: FC = () => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
  };
  const [form] = Form.useForm();
  const [modalData, setModalData] = useState<ModalData>({
    visible: false,
    data: initArticle(),
  });
  const [dataSource, setDataSource] = useState<Article[]>([]);
  const columns: ColumnsType<Article> = [
    {
      ellipsis: true,
      title: '标题',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '描述',
      dataIndex: 'description',
    },
    {
      width: 100,
      title: '操作',
      dataIndex: 'id',
      render: (_, record) => {
        return (
          <Space>
            <Button type="link" onClick={console.log}>
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.content}>
        <div className={styles.operate}>
          <Button
            type="primary"
            onClick={() => setModalData({ visible: true, data: initArticle() })}
          >
            新增文章
          </Button>
        </div>
        <Table<Article>
          rowKey="id"
          bordered={true}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
      <Modal
        visible={modalData.visible}
        title={`${modalData.data.id ? '编辑' : '新增'}文章`}
        destroyOnClose
        maskClosable={false}
        onCancel={() =>
          setModalData({
            visible: false,
            data: initArticle(),
          })
        }
      >
        <Form {...layout} form={form} preserve={false}>
          <FormItem
            name={FormName.name}
            rules={rulesLength({ max: 64, required: true })}
            label="标题"
            initialValue={modalData.data.name}
          >
            <Input placeholder="请输入标题" />
          </FormItem>
          <FormItem
            name={FormName.name}
            rules={rulesLength({ max: 200 })}
            label="描述"
            initialValue={modalData.data.name}
          >
            <TextArea rows={1} placeholder="不超过200字" />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
