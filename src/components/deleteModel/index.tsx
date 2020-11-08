import React, { FC } from 'react';
import { Modal } from 'antd';

const confirm = Modal.confirm;

interface Props {
  onOk: (id: any) => any;
  id: number | string;
  content?: string | JSX.Element;
  title?: string;
}

const Index: FC<Props> = props => {
  const {
    id,
    onOk,
    title = '系统提示：',
    content = '此操作不可逆转，请确认无误后再提交请求',
    children,
  } = props;
  const showConfirm = () => {
    confirm({
      title,
      content,
      onOk() {
        onOk(id);
      },
      okType: 'danger',
    });
  };
  return <span onClick={showConfirm}>{children}</span>;
};

export default Index;
