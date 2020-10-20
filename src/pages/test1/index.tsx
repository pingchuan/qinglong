import React, { useState } from "react";
import Drawer from "@/components/drawer";
import styles from "./index.less";
import { test } from "./service";


export default () => {
  const [visible, setVisible] = useState(false);
  const send = async () => {
    setVisible(true);
    const res = await test({ key1: "value1" });
    console.log(res, "#send");
  };

  return (
    <div>
      <div className={styles.title} onClick={send}>test1</div>
      <Drawer
        title="添加问题"
        visible={visible}
        onCancel={setVisible.bind(null, false)}
      >
        1
        <div style={{ height: "1000px", width: "400px" }}></div>
        2
      </Drawer>
    </div>
  );
};
