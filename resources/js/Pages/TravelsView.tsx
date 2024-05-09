import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"


import ITravel from "@/types/ITravel"
import IBus from "@/types/IBus"


interface TravelProps {
  travel: ITravel
}

interface BusProps {
  buses: Array<IBus>
}

type Props = TravelProps & BusProps

const TravelsView: React.FC<Props> = ({ travel, buses }) => {debugger
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      trip_id: travel.trip_id,
      tripNumber: travel.tripNumber,
      destination: travel.destination,
      origin: travel.origin,
      name: travel.name,
      surname: travel.surname,
      phone: travel.phone,
      bus_id: travel.bus_id,
      plate_number: travel.plate_number,
      max_seats: travel.max_seats,
      departure_DateTime: travel.departure_DateTime,
      arrival_DateTime: travel.arrival_DateTime,
      status: travel.status,
      type: travel.type
    })
  }, [])


  const onFinish = (values: any) => {debugger
    values.travel_id = travel.travel_id
    Inertia.post(route('travels.update'), values)
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
        <Divider orientation="left">Редактировать поездку</Divider>
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
                label="Номер рейса"
                name='tripNumber'
                rules={[{ required: true }]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="ID рейса"
                name='trip_id'
                rules={[{ required: true }]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="Откуда"
                name='origin'
                rules={[{ required: true, message: 'Введите пункт отправления' }]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="Куда"
                name='destination'
                rules={[{ required: true, message: 'Введите пункт назначения' }]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="Имя водителя"
                name="name"
                rules={[{ required: true, message: 'Введите имя водителя' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Фамилия водителя"
                name="surname"
                rules={[{ required: true, message: 'Введите фамилию водителя' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Номер телефона"
                name="phone"
                rules={[{ required: true, message: 'Введите номер телефона водителя' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="ID автобуса"
                name='bus_id'
                rules={[{ required: true }]}
              >
                <Select>
                  {buses.map((bus) => (
                    <Select.Option key={bus.bus_id} value={bus.bus_id}>
                      {`${bus.name} - ${bus.bus_id}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Номер автобуса"
                name='plate_number'
                rules={[{ required: true }]}
              >
                <Select>
                  {buses.map((bus) => (
                    <Select.Option key={bus.bus_id} value={bus.plate_number}>
                      {`${bus.plate_number} - ${bus.bus_id}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Места"
                name='max_seats'
                rules={[{ required: true }]}
              >
                <Select>
                  {buses.map((bus) => (
                    <Select.Option key={bus.bus_id} value={bus.max_seats}>
                      {`${bus.bus_id} - ${bus.max_seats}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Время отправления"
                  name="departure_DateTime"
                  rules={[{ required: true, message: 'Введите время отправления' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Время прибытия"
                  name="arrival_DateTime"
                  rules={[{ required: true, message: 'Введите время прибытия' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Form.Item
                label="Статус"
                name="status"
                rules={[{ required: true, message: 'Введите статус поездки' }]}
              >
                <Select>
                  <Select.Option value={'ожидает'}>{'ожидает'}</Select.Option>
                  <Select.Option value={'отменен'}>{'отменен'}</Select.Option>
                  <Select.Option value={'в пути'}>{'в пути'}</Select.Option>
                  <Select.Option value={'в пути обратно'}>{'в пути обратно'}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Тип поездки"
                name="type"
                rules={[{ required: true, message: 'Введите тип поездки' }]}
              >
                <Select>
                  <Select.Option value={'в один конец'}>{'в один конец'}</Select.Option>
                  <Select.Option value={'круговой рейс'}>{'круговой рейс'}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                  <InertiaLink href={route('travels.list')}>Назад</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Template>
  )
}

export default TravelsView
