import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"
import IRoute from "@/types/IRoute"
import IBus from "@/types/IBus"



interface RouteProps {
  route: IRoute
}

interface BusesProps {
  buses: Array<IBus>
}

type Props = RouteProps & BusesProps

const updateRoute = route('routes.update');
const backButtonRoute = route('trips.list');
const backroute = route('trips.list')
const createTripRoute = route('trips.save')

const RoutesView: React.FC<Props> = ({ route, buses }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      city_list_id: route.city_list_id,
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

  const onCreateTrip = (values: any) => {
    Inertia.post(createTripRoute, values)
    form.resetFields()
  }

  const text = <span>YYYY-MM-DD HH:MM</span>;

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
          <Divider orientation="left">Add trip</Divider>
          <Col span={24}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onCreateTrip}
            >
              <Form.Item
                label="Route ID"
                name="route_id"
                rules={[{ required: true }]}
                initialValue={route.route_id}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Driver's name"
                name="name"
                rules={[{ required: true, message: 'Enter drivers name' }]}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Driver's surname"
                name="surname"
                rules={[{ required: true, message: 'Enter drivers surname' }]}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Enter the phone number' }]}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="StopsID"
                name='city_list_id'
                rules={[{ required: true }]}
                initialValue={route.city_list_id}
              >
                <Select disabled>
                  <Select.Option value={route.city_list_id}>{route.city_list_id}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="BusID"
                name="bus_id"
                rules={[{ required: true }]}
              >
                <Select>
                  {
                    buses.map((bus) => {
                      return <Select.Option key={bus.bus_id} value={bus.bus_id}>{bus.bus_id}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Destination"
                name="destination"
                rules={[{ required: true, message: 'Enter the destination' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Origin"
                name="origin"
                rules={[{ required: true, message: 'Enter the origin' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Seats"
                name="max_seats"
                rules={[{ required: true, message: 'Enter the amount of seats' }]}
              >
                <Input  />
              </Form.Item>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Date and Time of departure"
                  name="departure_DateTime"
                  rules={[{ required: true, message: 'Enter the datetime of departure' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Date and Time of arrival"
                  name="arrival_DateTime"
                  rules={[{ required: true, message: 'Enter the datetime of arrival' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>


              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <InertiaLink href={backroute}>Back</InertiaLink>
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