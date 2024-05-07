
import React, { useEffect, useState } from 'react';
import {
  SettingOutlined,
  EnvironmentOutlined,
  BarsOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  BranchesOutlined,
  CarOutlined,
  EyeOutlined,
  DesktopOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
                <InertiaLink href={route('bookings.add')}>Add booking</InertiaLink>
              </Menu.Item>
              <Menu.Item key="trips/list" icon={<BranchesOutlined />}>
                <InertiaLink href={route('trips.list')}>Routes / Trips</InertiaLink>
              </Menu.Item>
              <Menu.Item key="citylists/list" icon={<EnvironmentOutlined />}>
                <InertiaLink href={route('citylists.list')}>Cities</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key={'sub2'} icon={<SettingOutlined />} title={'Monitoring'}>
              <Menu.Item key="buses/list" icon={<CarOutlined />}>
                <InertiaLink href={route('buses.list')}>Buses</InertiaLink>
              </Menu.Item>
              <Menu.Item key="bus" icon={<PlusCircleOutlined />}>
                <InertiaLink href={route('buses.add')}>Add car</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key={'sub3'} icon={<DesktopOutlined />} title={'Tracking'}>
              <Menu.Item key="buses/list" icon={<EyeOutlined />}>
                <InertiaLink href={route('buses.list')}>Map</InertiaLink>
              </Menu.Item>
              <Menu.Item key="currenttrips/list" icon={<LoadingOutlined />}>
                <InertiaLink href={route('currenttrips.list')}>Current Trips</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>some logo n all </Header>
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
/*

*/