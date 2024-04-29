import Template from "@/Components/Template"
import IBus from "@/types/IBus"
import { Inertia } from "@inertiajs/inertia"
import { useEffect } from "react"
import { route } from "ziggy-js"
import { Button, Col, Divider, Form, Input, Row, Space, Popconfirm } from "antd"
import { InertiaLink } from "@inertiajs/inertia-react"
import { DeleteOutlined } from '@ant-design/icons'




interface Props {
  bus: IBus
}

const BusesView: React.FC<Props> = ({bus}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: bus.name,
      plate_number: bus.plate_number,
      max_seats: bus.max_seats
    })
  }, [])

  const tailLayout = {
    wrapperCol: {offset: 4, span: 16}
  }

  const onFinish = (values: any) => {
    values.bus_id = bus.bus_id
    Inertia.post(route('buses.update'), values)
    form.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 560 }}
      >
        <Divider orientation="left">Edit bus</Divider>
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


export default BusesView