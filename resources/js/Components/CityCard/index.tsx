import React, { useEffect, useState } from 'react';
import { Card, Flex, Row } from 'antd';
import { Button, Form, Input, Radio, Space, Checkbox } from "antd"
import { Inertia, Method } from '@inertiajs/inertia';
import { route } from "ziggy-js"
import ICity from '@/types/ICity';



interface Props {
  city: ICity
}

type LayoutType = Parameters<typeof Form>[0]['layout'];

const CityCard: React.FC<Props> = ({ city }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  useEffect(() => {
    form.setFieldsValue({
      city_id: city.city_id,
      name: city.name
    })
  }, [])

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 5 }, wrapperCol: { span: 18 } } : null;

  const onFinish = (values: any) => {debugger
    values.city_id = city.city_id
    Inertia.post(route('cities.update'), values)
    form.resetFields()
  }

  return (

    <Card hoverable
      key={city.city_id}
      bordered={true}
      style={{ width: 300, height: 180, background: '#f2f2f2' }}>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={onFinish}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 300 }}
      >
        <Form.Item label="ID" name='city_id'>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name='name'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Row style={{marginLeft: 160}}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CityCard
