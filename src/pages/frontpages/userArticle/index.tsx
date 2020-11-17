import React, { FC, useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tooltip,
  Divider,
} from 'antd';
import { history } from 'umi';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { rulesLength } from '@/utils/validators';
import DeleteModal from '@/components/deleteModel';
import { FormName } from './constant';
import {
  getArticleList,
  postArticle,
  putArticle,
  deleteArticle,
} from './service';
import styles from './index.less';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

interface ModalData {
  visible: boolean;
  data: Article;
}

const initArticle = (): Article => ({
  name: '',
  description: '',
  purview: 'private',
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
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Article[]>([]);
  const historyJump = (path: 'info' | 'edit', id: string) => {
    history.push({
      pathname: `/qinglong/userArticle/${path}`,
      state: { id },
    });
  };
  const columns: ColumnsType<Article> = [
    {
      ellipsis: true,
      title: '标题',
      dataIndex: 'name',
      render: (value, record) => (
        <Button
          type="link"
          onClick={() => setModalData({ visible: true, data: record })}
        >
          {value}
        </Button>
      ),
    },
    {
      width: 300,
      title: '描述',
      dataIndex: 'description',
    },
    {
      width: 180,
      title: '操作',
      dataIndex: 'id',
      render: currentId => {
        return (
          <>
            <Tooltip title="查看文章">
              <Button
                icon={<EyeOutlined />}
                type="link"
                onClick={() => historyJump('info', currentId)}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="修改文章">
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={() => historyJump('edit', currentId)}
              />
            </Tooltip>
            <Divider type="vertical" />
            <DeleteModal onOk={onDelete} id={currentId}>
              <Tooltip title="删除">
                <Button
                  icon={<DeleteOutlined className={styles.delete} />}
                  type="link"
                />
              </Tooltip>
            </DeleteModal>
          </>
        );
      },
    },
  ];

  const getArticleListAsync = async () => {
    setLoading(true);
    const res = await getArticleList();

    setLoading(false);
    setDataSource(res);
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    const params = { ...modalData.data, ...values };
    const apiFun = params.id ? putArticle : postArticle;
    const { id } = await apiFun(params);

    if (id) {
      setModalData({ visible: false, data: initArticle() });
      getArticleListAsync();
      if (!params.id) {
        historyJump('edit', id);
      }
    }
  };

  const onDelete = async (deleteId: string) => {
    const { successCount } = await deleteArticle({ id: deleteId });

    if (successCount) {
      getArticleListAsync();
    }
  };

  useEffect(() => {
    getArticleListAsync();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      [FormName.name]: modalData.data.name,
      [FormName.description]: modalData.data.description,
      [FormName.purview]: modalData.data.purview,
    });
  }, [modalData, form]);

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
          loading={loading}
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
        onOk={onSubmit}
        onCancel={() =>
          setModalData({
            visible: false,
            data: initArticle(),
          })
        }
      >
        <Form {...layout} form={form} name="article" preserve={false}>
          <FormItem
            name={FormName.name}
            rules={rulesLength({ max: 64, required: true })}
            label="标题"
          >
            <Input placeholder="请输入标题" />
          </FormItem>
          <FormItem
            name={FormName.purview}
            rules={rulesLength({ required: true })}
            label="发布范围"
            initialValue="private"
          >
            <Select placeholder="请选择">
              <Option value="private">仅自己可见</Option>
              <Option value="public">所有人可见</Option>
            </Select>
          </FormItem>
          <FormItem
            name={FormName.description}
            rules={rulesLength({ max: 200 })}
            label="描述"
          >
            <TextArea rows={4} placeholder="不超过200字" />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
