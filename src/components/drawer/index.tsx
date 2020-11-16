import React, { FC } from 'react';
import { Drawer, Button } from 'antd';
import styles from './index.less';

declare const ButtonTypes: [
  'default',
  'primary',
  'ghost',
  'dashed',
  'link',
  'text',
];

type ButtonType = typeof ButtonTypes[number];

interface Props {
  visible: boolean;
  title?: string | JSX.Element;
  width?: number;
  placement?: 'right' | 'left';
  footer?: JSX.Element;
  footerExtend?: JSX.Element;
  okOption?: {
    type?: ButtonType;
    text?: string;
    danger?: boolean;
  };
  onOk?: () => void;
  cancelOption?: {
    type?: ButtonType;
    text?: string;
    danger?: boolean;
  };
  onCancel?: () => void;
}

const Index: FC<Props> = props => {
  const {
    children,
    visible,
    title,
    width,
    placement,
    footer,
    footerExtend,
    okOption,
    cancelOption,
    onOk,
    onCancel,
  } = props;
  const Footer = () => {
    return (
      <div className={styles.footer}>
        <div className={styles.footerExtend}>{footerExtend}</div>
        <div>
          <Button
            danger={cancelOption?.danger}
            type={cancelOption?.type}
            className={styles.cancelBt}
            onClick={onCancel}
          >
            {cancelOption?.text || '取消'}
          </Button>
          <Button
            danger={okOption?.danger}
            type={okOption?.type || 'primary'}
            onClick={onOk}
          >
            {okOption?.text || '确定'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Drawer
      visible={visible}
      title={title}
      placement={placement || 'right'}
      width={width || 600}
      closable={true}
      destroyOnClose={true}
      maskClosable={false}
      onClose={onCancel}
      footer={footer || <Footer />}
    >
      {children}
    </Drawer>
  );
};

export default Index;
