import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import {route} from 'ziggy-js'
import { InertiaLink } from "@inertiajs/inertia-react"

import { Button, Col, Divider, Input, Row, Space, Form } from "antd"




const BusesAdd: React.FC = () => {
  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: {offset: 4, span: 16}
  }

  const onFinish = (values: any) => {
    Inertia.post(route('buses.save', values))
    debugger
    form.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">New bus</Divider>
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
                label="Plate"
                name="plate_number"
                rules={[{ required: true, message: 'Enter the plate number' }]}
              >
                <Input />
              </Form.Item>

                <Form.Item
                  label="Seats"
                  name="max_seats"
                  rules={[{ required: true, message: 'Enter the amount of seats' }]}
                >
                  <Input />
                </Form.Item>

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <InertiaLink href={route('buses.list')}>Back</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Template>
  )
}


export default BusesAdd