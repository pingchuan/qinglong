import React, { useState } from 'react';
import Cropper from 'react-cropper';
import classnames from 'classnames';
import { Modal, Upload, message } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import 'cropperjs/dist/cropper.css';
import imageSrc from '@/assets/images/qinglong.png';
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

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJpgOrPng) {
    message.error('仅支持JPG/PNG格式的文件');
  }
  if (!isLt2M) {
    message.error('仅支持2M以下图片');
  }
  return isJpgOrPng && isLt2M;
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
  const [image, setImage] = useState(defaultUrl || imageSrc);
  const [cropper, setCropper] = useState<any>();

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      return cropper.getCroppedCanvas().toDataURL();
    }
  };

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as Blob, imageUrl =>
        setImage(imageUrl as string),
      );
    }
  };

  const handleSubmit = async () => {
    const { path } = await postUpload({ file: getCropData() });
    if (onOk) {
      onOk(path);
    }
  };

  return (
    <Modal
      title="选择图片"
      visible={visible}
      destroyOnClose
      width={668}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <div className={styles.cropper}>
        <Cropper
          style={{ height: 400, width: 400 }}
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
              name="avatar"
              listType="picture-card"
              className={styles.upload}
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
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
