import React, { FC, useState } from 'react';
import { Upload } from 'antd';
import { history } from 'umi';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';
import {
  EyeOutlined,
  FileImageOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import BraftEditor, {
  EditorState,
  ExtendControlType,
  ControlType,
} from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/color-picker.css';
import { postUploadImage } from '@/service';
import styles from './index.less';
import Preview from './preview';

BraftEditor.use(
  ColorPicker({
    includeEditors: ['editor-with-color-picker'],
    theme: 'light', // 支持dark和light两种主题，默认为dark
  }),
);

interface Props {
  defaultHtml?: string;
  saveData?: (value: string) => void;
}

const Index: FC<Props> = ({ defaultHtml, saveData }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    BraftEditor.createEditorState(defaultHtml),
  );
  const [previewVisible, setPreviewVisible] = useState(false);

  const onChange = (value: EditorState) => {
    setEditorState(value);
  };

  const uploadHandler = (param: RcCustomRequestOptions) => {
    if (!param.file) {
      return false;
    }
    const reader = new FileReader();

    reader.readAsDataURL(param.file);
    reader.addEventListener('load', async () => {
      const { path } = await postUploadImage({ file: reader.result });

      if (path) {
        setEditorState(
          ContentUtils.insertMedias(editorState, [
            {
              type: 'IMAGE',
              url: path,
            },
          ]),
        );
      }
    });
  };

  const extendControls: ExtendControlType[] = [
    {
      key: 'antd-uploader',
      type: 'button',
      title: '插入图片',
      text: (
        <Upload
          accept="image/*"
          showUploadList={false}
          style={{ display: 'inline' }}
          customRequest={uploadHandler}
        >
          <FileImageOutlined className={styles.imageIcon} />
        </Upload>
      ),
    },
    {
      key: 'custom-button',
      type: 'button',
      title: '预览',
      text: <EyeOutlined className={styles.imageIcon} />,
      onClick: () => setPreviewVisible(true),
    },
    {
      key: 'save',
      type: 'button',
      title: '保存',
      text: <SaveOutlined className={styles.saveIcon} />,
      onClick: () => saveData && saveData(editorState?.toHTML()),
    },
    {
      key: 'close',
      type: 'button',
      title: '关闭',
      text: <CloseCircleOutlined className={styles.close} />,
      onClick: history.goBack,
    },
  ];

  const controls: ControlType[] = [
    'fullscreen',
    'undo',
    'redo',
    'font-size',
    'line-height',
    'letter-spacing',
    'headings',
    'text-color',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'superscript',
    'subscript',
    'remove-styles',
    'blockquote',
    'hr',
    'link',
    // 'code',
    'emoji',
    'list-ol',
    'list-ul',
    'text-align',
    'text-indent',
    'separator',
    'clear',
  ];

  return (
    <>
      <div className="editor-container">
        <BraftEditor
          id="editor-with-color-picker"
          value={editorState}
          onChange={onChange}
          controls={controls}
          extendControls={extendControls}
          contentClassName={styles.textContent}
        />
      </div>
      <Preview
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        value={editorState?.toHTML()}
      />
    </>
  );
};

export default Index;
