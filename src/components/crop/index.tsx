import React, { useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import classnames from 'classnames';
import { Modal, Upload, message } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import 'cropperjs/dist/cropper.css';
import { postUpload } from '@/service';
import styles from './index.less';

function getBase64(
  img: Blob,
  callback: (file: string | ArrayBuffer | null) => void,
) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

interface Props {
  onOk?: (file: string) => void;
  onCancel: () => void;
  visible: boolean;
  defaultUrl?: string;
}

export const Demo: React.FC<Props> = ({
  visible,
  defaultUrl,
  onOk,
  onCancel,
}) => {
  const [image, setImage] = useState(defaultUrl);
  const [cropper, setCropper] = useState<any>();

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      return cropper.getCroppedCanvas().toDataURL();
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('仅支持JPG/PNG格式的文件');
    }
    if (!isLt2M) {
      message.error('仅支持2M以下图片');
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, imageUrl => setImage(imageUrl as string));
    }
    return false;
  };

  const handleSubmit = async () => {
    const { path } = await postUpload({ file: getCropData() });
    if (path && onOk) {
      setImage('');
      onOk(path);
    }
  };

  const handCancel = () => {
    setImage('');
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      setImage(defaultUrl);
    }
  }, [visible, defaultUrl]);

  return (
    <Modal
      title="选择图片"
      visible={visible}
      destroyOnClose
      maskClosable={false}
      width={668}
      onOk={handleSubmit}
      onCancel={handCancel}
    >
      <div className={styles.cropperWrapper}>
        <Cropper
          className={styles.cropper}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance);
          }}
        />
        <div className={styles.box}>
          <div className={styles.uploadWrapper}>
            <Upload
              name="image"
              accept="image/*"
              listType="picture-card"
              className={styles.upload}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <PlusOutlined />
            </Upload>
          </div>
          <div className={classnames('img-preview', styles.imgPreview)} />
        </div>
      </div>
    </Modal>
  );
};

export default Demo;
