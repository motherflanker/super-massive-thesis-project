import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect, useState } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"


import IBooking from "@/types/IBooking"
import ITravel from "@/types/ITravel"


interface BookingsProps {
  booking: IBooking
}

interface TravelsProps {
  travels: Array<ITravel>
}

type Props = TravelsProps & BookingsProps

const BookingsView: React.FC<Props> = ({ booking, travels }) => {
  debugger
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: booking.name,
      surname: booking.surname,
      phone: booking.phone,
      email: booking.email,
      passport: booking.passport,
      price: booking.price,
      destination: booking.destination,
      origin: booking.origin,
      tripNumber: booking.tripNumber,
      plate_number: booking.plate_number,
      travel_id: booking.travel_id,
      departure_DateTime: booking.departure_DateTime,
      arrival_DateTime: booking.arrival_DateTime,
      type: booking.type
    })
  }, [])


  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const onFinish = (values: any) => {
    values.booking_id = booking.booking_id
    Inertia.post(route('bookings.update'), values)
    form.resetFields()
  }

  const text = <span>ГГГГ-ММ-ДД ЧЧ:ММ</span>;

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Редактировать бронь</Divider>
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
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Введите имя пассажира' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Фамилия"
                name="surname"
                rules={[{ required: true, message: 'Введите фамилию пассажира' }]}
              >
                <Input />
              </Form.Item>


              <Tooltip placement="top" title={'Формат: 89873407755'}>
                <Form.Item
                  label="Телефон"
                  name="phone"
                  rules={[{ required: true, message: 'Введите номер телефона пассажира' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Form.Item
                label="Почта"
                name="email"
                rules={[{ required: false, message: 'Введите почту пассажира' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Паспорт"
                name="passport"
                rules={[{ required: true, message: 'Введите паспортные данные пассажира' }]}
              >
                <Input />
              </Form.Item>

              <Tooltip placement="top" title={'Целое число*'}>
                <Form.Item
                  label="Цена"
                  name="price"
                  rules={[{ required: true, message: 'Введите цену' }]}
                >
                  <Input />
                </Form.Item>
              </Tooltip>

              <Form.Item
                  label="Номер рейса"
                  name="tripNumber"
                  rules={[{ required: true}]}
                >
                  <Input disabled/>
                </Form.Item>

                <Form.Item
                  label="Номер автобуса"
                  name="plate_number"
                  rules={[{ required: true }]}
                >
                  <Input disabled/>
                </Form.Item>

              <Form.Item
                label="Куда"
                name="destination"
                rules={[{ required: true, message: 'Введите место прибытия' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Откуда"
                name="origin"
                rules={[{ required: true, message: 'Введите место отправления' }]}
              >
                <Input disabled />
              </Form.Item>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Время прибытия"
                  name="departure_DateTime"
                  rules={[{ required: true, message: 'Enter the date and time' }]}
                >
                  <Input disabled />
                </Form.Item>
              </Tooltip>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Время отправления"
                  name="arrival_DateTime"
                  rules={[{ required: true, message: 'Enter the date and time' }]}
                >
                  <Input disabled />
                </Form.Item>
              </Tooltip>

              <Form.Item
                  label="Тип рейса"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <Input disabled/>
                </Form.Item>

                <Form.Item
                  label="ID поездки"
                  name="travel_id"
                  rules={[{ required: true }]}
                >
                  <Input disabled/>
                </Form.Item>



              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                  <InertiaLink href={route('bookings.list')}>Назад</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

    </Template>
  )
}

export default BookingsView