import LoginForm from '@/Components/LoginForm';
import { Inertia } from '@inertiajs/inertia';
import { Breadcrumb, Col, Layout, Row, Form, Flex } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import {route} from 'ziggy-js';


const LoginPage = () => {
  const handleLogin = (values: { email: string; password: string }) => {
    Inertia.post(route('do.login'), {
      email: values.email,
      password: values.password,
    });
  };
  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0}} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '18px 0' }}></Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 750,
            width: '50%',
            margin: '0px auto',
          }}
        >
          <Row justify="center">
            <Col flex='auto' span="8">
                <Flex justify='center'>
                  <h1>Login</h1>
                </Flex>
              <LoginForm onFinish={handleLogin} />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white' }}>Copyright</Footer>
    </Layout>
  );
};

export default LoginPage;

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};