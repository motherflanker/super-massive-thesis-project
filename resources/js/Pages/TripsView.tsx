import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"


import ITrip from "@/types/ITrip"
import IBus from "@/types/IBus"


interface TripProps {
  trip: ITrip
}

interface BusesProps {
  buses: Array<IBus>
}

type Props = BusesProps & TripProps

const TripsView: React.FC<Props> = ({ trip, buses }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      route_id: trip.route_id,
      name: trip.name,
      surname: trip.surname,
      phone: trip.phone,
      city_list_id: trip.city_list_id,
      bus_id: trip.bus_id,
      destination: trip.destination,
      origin: trip.origin,
      max_seats: trip.max_seats,
      isActive: trip.isActive,
      departure_DateTime: trip.departure_DateTime,
      arrival_DateTime: trip.arrival_DateTime
    })
  }, [])


  const onFinish = (values: any) => {
    values.trip_id = trip.trip_id
    Inertia.post(route('trips.update'), values)
    form.resetFields()
  }

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const text = <span>YYYY-MM-DD HH:MM</span>;

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Edit Trip</Divider>
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
                label="Route ID"
                name="route_id"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Driver's name"
                name="name"
                rules={[{ required: true, message: 'Enter the surname' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Driver's surname"
                name="surname"
                rules={[{ required: true, message: 'Enter the phone number' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Enter the email or dont i guess' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="StopsID"
                name='city_list_id'
                rules={[{ required: true }]}
                initialValue={trip.city_list_id}
              >
                <Select>
                  <Select.Option value={trip.city_list_id}>{trip.city_list_id}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="BusID"
                name="bus_id"
                rules={[{ required: true }]}
                initialValue={trip.bus_id}
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
                rules={[{ required: true, message: 'Enter the trip ID' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="isActive"
                name="isActive"
                rules={[{ required: false }]}
                initialValue={trip.isActive}
              >
                <Select>
                  <Select.Option value={1}>{'Yes'}</Select.Option>
                  <Select.Option value={0}>{'No'}</Select.Option>
                </Select>
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

export default TripsView
