import React, { FC } from 'react';
import { Menu } from 'antd';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { history, connect, Dispatch } from 'umi';
import {
  AppstoreOutlined,
  PieChartOutlined,
  ContainerOutlined,
  MailOutlined,
  CalendarOutlined,
  BulbOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { UserInfo } from '@/models/authenticate';

const { SubMenu, Item: MenuItem } = Menu;

interface Props {
  dispatch: Dispatch;
  user: UserInfo;
}

const Index: FC<Props> = ({ dispatch, user }) => {
  /**
   * 菜单点击
   * @param param0 MenuClickEventHandler
   */
  const menuOnClick: MenuClickEventHandler = ({ key }) => {
    history.push(key);
  };

  return (
    <Menu
      selectedKeys={[history.location.pathname]}
      defaultOpenKeys={['sub1']}
      mode="inline"
      onClick={menuOnClick}
    >
      <MenuItem key="/qinglong/userPlan" icon={<CalendarOutlined />}>
        我的计划
      </MenuItem>
      <MenuItem key="/qinglong/userArticle" icon={<ProfileOutlined />}>
        我的文章
      </MenuItem>
      {user.mail === '1057102972@qq.com' && (
        <MenuItem key="/qinglong/userList" icon={<UserOutlined />}>
          用户列表
        </MenuItem>
      )}
      <MenuItem key="/qinglong/other" icon={<BulbOutlined />}>
        其他功能
      </MenuItem>
      {/* <MenuItem key="3" icon={<ContainerOutlined />}>
        404页面
      </MenuItem>
      <SubMenu key="sub1" icon={<MailOutlined />} title="测试一">
        <MenuItem key="5">Option 5</MenuItem>
        <MenuItem key="6">Option 6</MenuItem>
        <MenuItem key="7">Option 7</MenuItem>
        <MenuItem key="8">Option 8</MenuItem>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="测试二">
        <MenuItem key="9">Option 9</MenuItem>
        <MenuItem key="10">Option 10</MenuItem>
        <SubMenu key="sub3" title="Submenu">
          <MenuItem key="11">Option 11</MenuItem>
          <MenuItem key="12">Option 12</MenuItem>
        </SubMenu>
      </SubMenu> */}
    </Menu>
  );
};

export default connect(({ authenticate }) => ({ user: authenticate.user }))(
  Index,
);
