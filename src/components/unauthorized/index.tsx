import React from "react";
import { Empty } from "antd";
import styles from "./index.less";


const Index = () => {
  return (
    <div className={styles.unauthorized}>
      <Empty />
    </div>
  );
};

export default Index;