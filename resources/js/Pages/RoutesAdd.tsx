import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import { route } from 'ziggy-js'
import { InertiaLink } from "@inertiajs/inertia-react"

import { Button, Col, Divider, Input, Row, Space, Form, Select } from "antd"
import ICityList from "@/types/ICityList"


interface Props {
  citylists: Array<ICityList>
}

const RoutesAdd: React.FC<Props> = ({ citylists }) => {debugger
  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const onFinish = (values: any) => {
    Inertia.post(route('routes.save', values))
    form.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">New route</Divider>
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
                label="Origin"
                name="origin"
                rules={[{ required: true, message: 'Enter the origin' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Destination"
                name="destination"
                rules={[{ required: true, message: 'Enter the plate destination' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Stops List"
                name="city_list_id"
                rules={[{ required: true }]}
              >
                <Select>
                  {
                    citylists.map((citylist) => {
                      return <Select.Option
                        key={citylist.city_list_id}
                        value={citylist.city_list_id}
                      >
                        {citylist.city_list_id}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Round Trip"
                name='twoway'
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value={1}>{'Yes'}</Select.Option>
                  <Select.Option value={0}>{'No'}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <InertiaLink href={route('trips.list')}>Back</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Template>
  )
}

export default RoutesAdd