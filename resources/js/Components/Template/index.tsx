
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
  LoadingOutlined,
  PieChartOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Layout, Menu, theme } from 'antd';
import { route } from 'ziggy-js'
import { InertiaLink } from '@inertiajs/inertia-react';
import logo from '../../../source/logo.png'

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
              <InertiaLink href={route('home')}>Главная</InertiaLink>
            </Menu.Item>
            <Menu.SubMenu key={'sub1'} icon={<MenuOutlined/>} title={'Бронирование'}>
              <Menu.Item key="bookings/list" icon={<BarsOutlined />}>
                <InertiaLink href={route('bookings.list')}>Брони</InertiaLink>
              </Menu.Item>
              <Menu.Item key="travels/list" icon={<PlusCircleOutlined />}>
                <InertiaLink href={route('travels.list')}>Поездки</InertiaLink>
              </Menu.Item>
              <Menu.Item key="trips/list" icon={<BranchesOutlined />}>
                <InertiaLink href={route('trips.list')}>Маршруты</InertiaLink>
              </Menu.Item>
              <Menu.Item key="cities/list" icon={<EnvironmentOutlined />}>
                <InertiaLink href={route('cities.list')}>Остановки</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key={'sub2'} icon={<SettingOutlined />} title={'Мониторинг'}>
              <Menu.Item key="buses/list" icon={<CarOutlined />}>
                <InertiaLink href={route('buses.list')}>Автопарк</InertiaLink>
              </Menu.Item>
              <Menu.Item key="bus" icon={<PlusCircleOutlined />}>
                <InertiaLink href={route('buses.add')}>Добавить авто</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key={'sub3'} icon={<DesktopOutlined />} title={'Трекинг'}>
              {/* <Menu.Item key="map" icon={<EyeOutlined />}>
                <InertiaLink href={route('map')}>Карта</InertiaLink>
              </Menu.Item> */}
              <Menu.Item key="currenttrips/list" icon={<LoadingOutlined />}>
                <InertiaLink href={route('currenttrips.list')}>Активные</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu>
            {/* <Menu.SubMenu key={'sub4'} icon={<AreaChartOutlined />} title={'Отчеты'}>
              <Menu.Item key="buses/list">
                <InertiaLink href={route('buses.list')}>По автопарку</InertiaLink>
              </Menu.Item>
              <Menu.Item key="buses/list">
                <InertiaLink href={route('buses.list')}>пункт 1</InertiaLink>
              </Menu.Item>
              <Menu.Item key="buses/list">
                <InertiaLink href={route('buses.list')}>пункт 2</InertiaLink>
              </Menu.Item>
              <Menu.Item key="buses/list">
                <InertiaLink href={route('buses.list')}>пункт 3</InertiaLink>
              </Menu.Item>
              <Menu.Item key="buses/list">
                <InertiaLink href={route('buses.list')}>пункт 4</InertiaLink>
              </Menu.Item>
            </Menu.SubMenu> */}
          </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <Flex justify='space-between'>
          <div style={{ margin: '-24px 24px'}}><img src={logo} style={{width: 110, height: 110}}/></div>
          <Button type='primary' style={{ margin: '12px 24px'}}>Выйти</Button>
        </Flex>
        </Header>
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