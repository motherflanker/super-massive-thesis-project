import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import {route} from 'ziggy-js'
import { InertiaLink } from "@inertiajs/inertia-react"

import { Button, Col, Divider, Input, Row, Space, Form, Select } from "antd"




const BusesAdd: React.FC = () => {
  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: {offset: 4, span: 16}
  }

  const onFinish = (values: any) => {debugger
    Inertia.post(route('buses.save', values))
    form.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Новый автобус</Divider>
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
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Введите название' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Номер"
                name="plate_number"
                rules={[{ required: true, message: 'Введите номер' }]}
              >
                <Input />
              </Form.Item>

                <Form.Item
                  label="Кол-во мест"
                  name="max_seats"
                  rules={[{ required: true, message: 'Введите количество мест' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                label="Статус"
                name='status'
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value={'available'}>{'available'}</Select.Option>
                  <Select.Option value={'taken'}>{'taken'}</Select.Option>
                  <Select.Option value={'inService'}>{'inService'}</Select.Option>
                  <Select.Option value={'forMaintenance'}>{'forMaintenance'}</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Space size={18}>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                  <InertiaLink href={route('buses.list')}>Назад</InertiaLink>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Template>
  )
}


export default BusesAdd