import React from 'react';
import style from '@/app.module.scss';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  HomeOutlined,
  LogoutOutlined,
  PictureOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label: string, key: string, icon?: any, children?: any) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Manapulate the items in the list
const items = [
  getItem('Welcome', '/welcome', <HomeOutlined />),
  getItem('Upload Picture', '/upload-pic', <UploadOutlined />),
  getItem('Search Picture', '/search', <PictureOutlined />, [
    getItem('By tag', '/search/by-tag'),
    getItem('By picture', '/search/by-pic'),
  ]),
  getItem('System Management', '/management', <SettingOutlined />),
  getItem('Logout', '/logout', <LogoutOutlined />),
];

// If you want to change logo, do this in style sheet
const logo = style.logo;

export default function NavBar(props: any) {
  let navigate = useHistory();
  console.log(props);

  const onClick = (e: any) => {
    let path = e.key;
    if (path === '/logout') {
      navigate.push('/login');
      localStorage.clear();
    } else {
      navigate.push(path);
    }
  };

  return (
    <Sider>
      <div className={logo} />
      <Menu
        onClick={onClick}
        theme="dark"
        defaultSelectedKeys={['/welcome']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
