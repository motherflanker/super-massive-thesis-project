import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"
import IRoute from "@/types/IRoute"



interface Props {
  route: IRoute
}

const updateRoute = route('routes.update');
const backButtonRoute = route('trips.list');

const RoutesView: React.FC<Props> = ({ route }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      city_list_id: route.city_list_id,
      twoway: route.twoway,
      destination: route.destination,
      origin: route.origin
    })
  }, [])

  const onFinish = (values: any) => { 
    values.route_id = route.route_id
    Inertia.post(updateRoute, values)
    form.resetFields()
  }

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }


  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Edit Route</Divider>
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
                rules={[{ required: true, message: 'Enter the destination' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="StopsID"
                name='city_list_id'
                rules={[{ required: true }]}
                initialValue={route.city_list_id}
              >
                <Select>
                  <Select.Option value={route.city_list_id}>{route.city_list_id}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Round Trip"
                name='twoway'
                rules={[{ required: true }]}
                initialValue={route.twoway}
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
                  <InertiaLink href={backButtonRoute}>Back</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Template>
  )
}

export default RoutesView