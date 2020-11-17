import React, { FC, useState, useEffect } from 'react';
import { Button, Empty, Spin } from 'antd';
import { useLocation, history, useSelector } from 'umi';
import FixedBack from '@/components/fixedBack';
import { getArticle } from '../service';
import styles from './index.less';

const Index: FC = () => {
  const currentUser = useSelector(({ authenticate }) => authenticate.user);
  const { state } = useLocation<{ id: string }>();
  const [currentArticle, setCurrentArticle] = useState<Article>({
    name: '',
    purview: 'private',
  });
  const [loading, setLoading] = useState(false);

  const getArticleAsync = async (id: string) => {
    setLoading(true);
    const data = await getArticle({ id });

    setLoading(false);
    if (data) {
      setCurrentArticle(data);
    }
  };

  useEffect(() => {
    getArticleAsync(state?.id);
  }, [state]);
  return (
    <Spin spinning={loading} wrapperClassName={styles.spin}>
      {!currentArticle?.value || currentArticle.value === '<p></p>' ? (
        <div className={styles.empty}>
          <Empty description="暂无内容">
            {currentUser.id === currentArticle.userId && (
              <Button
                type="primary"
                onClick={() =>
                  history.push({
                    pathname: '/qinglong/userArticle/edit',
                    state: {
                      id: state?.id,
                    },
                  })
                }
              >
                编辑文章
              </Button>
            )}
          </Empty>
        </div>
      ) : (
        <div className={styles.contentBg}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: currentArticle?.value || '' }}
          />
        </div>
      )}
      <FixedBack visible={true} onOk={history.goBack} />
    </Spin>
  );
};

export default Index;
