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

type Props = RouteProps

const updateRoute = route('routes.update');
const backButtonRoute = route('trips.list');
const backroute = route('trips.list')
const createTripRoute = route('trips.save')

const RoutesView: React.FC<Props> = ({ route }) => {
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

  const text = <span>ГГГГ-ММ-ДД ЧЧ:ММ</span>;

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Редактировать маршрут</Divider>
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
                label="Откуда"
                name="origin"
                rules={[{ required: true, message: 'Введите пункт отправления' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Куда"
                name="destination"
                rules={[{ required: true, message: 'Введите пункт прибытия' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Список остановок"
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
                  <InertiaLink href={backButtonRoute}>Назад</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
          <Divider orientation="left">Добавить рейс</Divider>
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
                label="ID маршрута"
                name="route_id"
                rules={[{ required: true }]}
                initialValue={route.route_id}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Номер рейса"
                name="tripNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Список остановок"
                name='city_list_id'
                rules={[{ required: true }]}
                initialValue={route.city_list_id}
              >
                <Select disabled>
                  <Select.Option value={route.city_list_id}>{route.city_list_id}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Куда"
                name="destination"
                rules={[{ required: true, message: 'Введите пункт прибытия' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Откуда"
                name="origin"
                rules={[{ required: true, message: 'Введите пункт отправления' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Статус"
                name='status'
                rules={[{ required: true }]}
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