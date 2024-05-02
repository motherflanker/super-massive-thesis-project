import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import { route } from 'ziggy-js'
import { InertiaLink, usePage } from "@inertiajs/inertia-react"

import { Button, Col, Divider, Input, Row, Space, Form } from "antd"
import IBus from "@/types/IBus"



interface BusProps {
  bus: IBus
}

const TechReportsAdd: React.FC<BusProps> = ({bus}) => { debugger
  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const onFinish = (values: any) => {
    Inertia.post(route('techreports.save', values))
    form.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">New note</Divider>
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
                label="BusID"
                name="bus_id"
                rules={[{ required: true}]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Text"
                name="text"
                rules={[{ required: true, message: 'Enter text' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Enter the price' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="isDone"
                name="isDone"
                rules={[{ required: true }]}
              >
                <Input/>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Update
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


export default TechReportsAdd