
import React, { useEffect, useState } from 'react';
import {
  SettingOutlined,
  EnvironmentOutlined,
  BarsOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import TextInput from "../../../../vendor/laravel/breeze/stubs/inertia-react-ts/resources/js/Components/TextInput";
import { route } from 'ziggy-js'
import { InertiaLink } from '@inertiajs/inertia-react';

const { Header, Content, Footer, Sider } = Layout;

interface Props { }


const Template: React.FC<Props> = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    console.log(route().current())
  }, [])

  const [currentRoute, setCurrentRoute] = useState([`${route().current()}`]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={currentRoute} mode="inline" selectedKeys={currentRoute}>
            <Menu.Item key="home">
              <InertiaLink href={route('home')}>Home</InertiaLink>
            </Menu.Item>
            <Menu.SubMenu key={'sub1'} icon={<MenuOutlined/>} title={'Bookings'}>
              <Menu.Item key="bookings/list" icon={<BarsOutlined />}>
                <InertiaLink href={route('bookings.list')}>View</InertiaLink>
              </Menu.Item>
              <Menu.Item key="booking" icon={<PlusCircleOutlined />}>
                <InertiaLink href={route('bookings.add')}>New booking</InertiaLink>
              </Menu.Item>
              <Menu.Item key="home" icon={<BranchesOutlined />}>
                <InertiaLink href={route('home')}>Routes / Trips</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            { children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright?</Footer>
      </Layout>
    </Layout>
  );
}; 

export default Template;