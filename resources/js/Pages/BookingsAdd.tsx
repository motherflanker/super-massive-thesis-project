import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React from "react"
import {route} from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"
import ITravel from "@/types/ITravel"


interface Props {
  travels: Array<ITravel>
}


const BookingsAdd: React.FC<Props> = ({travels}) => {
  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: {offset: 4, span: 16}
  }
  const onFinish = (values: any) => {
    Inertia.post(route('bookings.save'), values)
    form.resetFields()
  }

  const text = <span>ГГГГ-ММ-ДД ЧЧ:ММ</span>;

  return(
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Новая бронь</Divider>
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
                label="Куда"
                name="destination"
                rules={[{ required: true, message: 'Введите место прибытия' }]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="Откуда"
                name="origin"
                rules={[{ required: true, message: 'Введите место отправления' }]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                label="ID поездки"
                name="travel_id"
                rules={[{ required: true }]}
              >
                <Select disabled>
                  {
                    travels.map((travel) => {
                      return <Select.Option key={travel.travel_id} value={travel.travel_id}>{travel.travel_id}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>
              
              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Время прибытия"
                  name="departure_DateTime"
                  rules={[{ required: true, message: 'Enter the date and time' }]}
                >
                  <Input disabled/>
                </Form.Item>
              </Tooltip>

              <Tooltip placement="top" title={text}>
                <Form.Item
                  label="Время отправления"
                  name="arrival_DateTime"
                  rules={[{ required: true, message: 'Enter the date and time' }]}
                >
                  <Input disabled/>
                </Form.Item>
              </Tooltip>

             

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

export default BookingsAdd