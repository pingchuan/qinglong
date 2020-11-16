import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { Spin } from 'antd';
import DraftEditor from '@/components/draftEditor';
import { getArticle, putArticleValue } from '../service';
import styles from './index.less';

const Index: FC = () => {
  const { state } = useLocation<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article>({
    name: '',
  });

  const getArticleAsync = async (id: string) => {
    setLoading(true);
    const data = await getArticle({ id });

    setLoading(false);
    if (data) {
      setCurrentArticle(data);
    }
  };

  const saveData = async (value: string, autoSave?: boolean) => {
    await putArticleValue({ ...currentArticle, value }, autoSave);
  };

  useEffect(() => {
    getArticleAsync(state?.id);
  }, [state]);
  return (
    <Spin spinning={loading} wrapperClassName={styles.spin}>
      <DraftEditor
        defaultHtml={currentArticle?.value || ''}
        saveData={saveData}
      />
    </Spin>
  );
};

export default Index;
