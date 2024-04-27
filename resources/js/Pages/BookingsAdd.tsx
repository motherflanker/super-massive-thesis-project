import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React from "react"
import {route} from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Space, Tooltip } from "antd"

import Template from "@/Components/Template"




const BookingsAdd: React.FC = () => {
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: {offset: 4, span: 16}
  }
  const onFinish = (values: any) => {
    Inertia.post(route('bookings.save'), values)
    debugger
    form.resetFields()
  }

  const text = <span>YYYY-MM-DD HH:MM</span>;

  return(
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">New booking</Divider>
        <Row>
          <Col span={24}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Enter the name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Surname"
                name="surname"
                rules={[{ required: true, message: 'Enter the surname' }]}
              >
                <Input />
              </Form.Item>

              <Tooltip placement="top" title={'Format: 89873407755'}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Enter the phone number' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: false, message: 'Enter the email or dont i guess' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Passport"
                name="passport"
                rules={[{ required: true, message: 'Enter the passport' }]}
              >
                <Input />
              </Form.Item>

              <Tooltip placement="top" title={'Must be an integer number'}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: 'Enter the price' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Form.Item
                label="Destination"
                name="destination"
                rules={[{ required: true, message: 'Enter the destination' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Origin"
                name="origin"
                rules={[{ required: true, message: 'Enter the origin' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Trip ID"
                name="trip_id"
                rules={[{ required: true, message: 'Enter the trip ID' }]}
              >
                <Input />
              </Form.Item>
              
              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Date and Time of departure"
                  name="departure_DateTime"
                  rules={[{ required: true, message: 'Enter the date and time' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Date and Time of arrival"
                  name="arrival_DateTime"
                  rules={[{ required: true, message: 'Enter the date and time' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

             

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <InertiaLink href={route('home')}>Back</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      
    </Template>
  )
}

export default BookingsAdd