import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"


import ITrip from "@/types/ITrip"
import ICityList from "@/types/ICityList"


interface TripProps {
  trip: ITrip
}

interface BusesProps {
  citylists: Array<ICityList>
}

type Props = BusesProps & TripProps

const TripsView: React.FC<Props> = ({ trip, citylists }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      route_id: trip.route_id,
      city_list_id: trip.city_list_id,
      destination: trip.destination,
      origin: trip.origin,
      tripNumber: trip.tripNumber,
      status: trip.status
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

  const text = <span>ГГГГ-ММ-ДД ЧЧ:ММ</span>;

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Редактировать рейс</Divider>
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
                label="Номер рейса"
                name="tripNumber"
                rules={[{ required: true, message: 'Введите номер рейса' }]}
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
                  {citylists.map((citylist) => (
                    <Select.Option key={citylist.city_list_id} value={citylist.city_list_id}>
                      {citylist.city_list_id}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Откуда"
                name="origin"
                rules={[{ required: true, message: 'Введите пункт отправления' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Куда"
                name="destination"
                rules={[{ required: true, message: 'Введите пункт назначения' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Статус"
                name="status"
                rules={[{ required: true, message: 'Введите статус рейса' }]}
              >
                <Select>
                  <Select.Option value={'active'}>{'active'}</Select.Option>
                  <Select.Option value={'inactive'}>{'inactive'}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                  <InertiaLink href={route('trips.list')}>Назад</InertiaLink>
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
