import React, { FC } from "react";
import { Menu } from "antd";
import { MenuClickEventHandler } from "antd/node_modules/rc-menu/lib/interface";
import { history } from "umi";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu, Item: MenuItem } = Menu;

const Index: FC = () => {
  /**
   * 菜单点击
   * @param param0 MenuClickEventHandler
   */
  const menuOnClick: MenuClickEventHandler = ({ key }) => {
    history.push(key);
  };

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      onClick={menuOnClick}
    >
      <MenuItem key="/test1" icon={<PieChartOutlined />}>
        Option 1
      </MenuItem>
      <MenuItem key="/test2" icon={<DesktopOutlined />}>
        Option 2
      </MenuItem>
      <MenuItem key="3" icon={<ContainerOutlined />}>
        Option 3
      </MenuItem>
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <MenuItem key="5">Option 5</MenuItem>
        <MenuItem key="6">Option 6</MenuItem>
        <MenuItem key="7">Option 7</MenuItem>
        <MenuItem key="8">Option 8</MenuItem>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <MenuItem key="9">Option 9</MenuItem>
        <MenuItem key="10">Option 10</MenuItem>
        <SubMenu key="sub3" title="Submenu">
          <MenuItem key="11">Option 11</MenuItem>
          <MenuItem key="12">Option 12</MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
};

export default Index;
