import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import { route } from 'ziggy-js'
import { InertiaLink } from "@inertiajs/inertia-react"

import { Button, Col, Divider, Input, Row, Space, Form, Select, Tooltip } from "antd"
import ITrip from "@/types/ITrip"
import IBus from "@/types/IBus"


interface TripProps {
  trips: Array<ITrip>
}

interface BusProps {
  buses: Array<IBus>
}

type Props = BusProps & TripProps

const TravelsAdd: React.FC<Props> = ({ trips, buses }) => {
  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const onFinish = (values: any) => {debugger
    Inertia.post(route('travels.save', values))
    form.resetFields()
  }

  const text = <span>ГГГГ-ММ-ДД ЧЧ:ММ</span>;

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">Новая поездка</Divider>
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
                <Select>
                  {trips.map((trip) => (
                    <Select.Option key={trip.trip_id} value={trip.tripNumber}>
                      {`${trip.trip_id} - ${trip.tripNumber}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="ID рейса"
                name='trip_id'
                rules={[{ required: true }]}
              >
                <Select>
                  {trips.map((trip) => (
                    <Select.Option key={trip.trip_id} value={trip.trip_id}>
                      {trip.trip_id}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Откуда"
                name='origin'
                rules={[{ required: true,  message: 'Введите пункт отправления' }]}
              >
                {/* <Select>
                  {
                    trips.map((trip) => {
                      return <Select.Option
                        key={trip.trip_id}
                        value={trip.origin}
                      >
                        {`${trip.trip_id} - ${trip.origin}`}
                      </Select.Option>
                    })
                  } 
                </Select> */}
                <Input />
              </Form.Item>

              <Form.Item
                label="Куда"
                name='destination'
                rules={[{ required: true,  message: 'Введите пункт назначения' }]}
              >
                {/* <Select>
                  {trips.map((trip) => (
                    <Select.Option key={trip.trip_id} value={trip.destination}>
                      {`${trip.trip_id} - ${trip.destination}`}
                    </Select.Option>
                  ))}
                </Select> */}
                <Input />
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
                rules={[{ required: true, message: 'Введите фамилию водителя'}]}
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
                label="Автобус"
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
                label="Места"
                name='max_seats'
                rules={[{ required: true }]}
              >
                {/* <Select>
                  {buses.map((bus) => (
                    <Select.Option key={bus.bus_id} value={bus.max_seats}>
                      {`${bus.bus_id} - ${bus.max_seats}`}
                    </Select.Option>
                  ))}
                </Select> */}
                <Input />
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


export default TravelsAdd