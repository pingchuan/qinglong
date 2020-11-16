import React from 'react';
// import Test from '@/pages/frontpages/userInfo';
// import Test from '@/pages/backpages/userList';
import Test from '@/pages/frontpages/userArticle';
// import Test from '@/components/draftEditor';

export default () => {
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div style={{ width: 250 }}></div>
      <div style={{ flex: 1 }}>
        <Test />
      </div>
    </div>
  );
};
