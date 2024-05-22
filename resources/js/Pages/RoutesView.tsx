import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect, useState } from "react"
import { route } from 'ziggy-js'
import { Button, Col, Divider, Flex, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"
import IRoute from "@/types/IRoute"
import IBus from "@/types/IBus"
import Table, { ColumnType } from "antd/es/table"
import IStopsRoutes from "@/types/IStopsRoutes"
import { EditableCell } from "@/Components/EditableCell"
import IStops from "@/types/IStops"



interface RouteProps {
  route1: IRoute
}

interface DataType extends IStopsRoutes {
  key: React.Key;
}
interface StopsRoutesProps {
  routesStops: Array<DataType>
}
interface StopsProps {
  stops: Array<IStops>
}

interface EditableColumnType extends ColumnType<DataType> {
  editable?: boolean;
}

type Props = RouteProps & StopsRoutesProps & StopsProps

const updateRoute = route('routes.update');
const backButtonRoute = route('trips.list');
const backroute = route('trips.list')
const createTripRoute = route('trips.save')

const RoutesView: React.FC<Props> = ({ route1, routesStops, stops }) => {
  debugger
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()

  const [dataSource, setDataSource] = useState<DataType[]>(routesStops.map(routeStop => ({ ...routeStop, key: routeStop.rs_id })))

  const [editingKey, setEditingKey] = useState<string | null>('');

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form2.setFieldsValue({ ...record });
    setEditingKey(record.key as string);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form2.validateFields()) as DataType;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedRow = { ...item, ...row };
        newData.splice(index, 1, updatedRow);
        setDataSource(newData);
        setEditingKey('');
        update({
          rs_id: updatedRow.rs_id,
          stops_id: updatedRow.stops_id,
          time: updatedRow.time,
          route_id: updatedRow.route_id,
        });
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const update = async (payload: { stops_id: number, time: number, rs_id: number, route_id: number }) => {
    Inertia.post(route('stopsroutes.update', { rs_id: payload.rs_id }), payload, {
      onSuccess: () => {
        console.log('Update successful');
      },
      onError: (errors) => {
        console.error('Error updating data:', errors);
      },
    });
  }

  const columns: EditableColumnType[] = [
    {
      title: 'ID',
      dataIndex: 'rs_id',
      width: '15%',
      editable: false,
    },
    {
      title: 'ID остановки',
      dataIndex: 'stops_id',
      width: '15%',
      editable: true,
    },
    {
      title: 'Время в пути до остановки(в мин.)',
      dataIndex: 'time',
      width: '35%',
      editable: true,
    },
    {
      title: 'ID маршрута',
      dataIndex: 'route_id',
      width: '15%',
      editable: false,
    },
    {
      title: '',
      render: (_, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              type="link"
            >
              Сохранить
            </Button>
            <Button
              onClick={cancel}
              type="link"
              style={{ marginRight: 8 }}
            >
              Отмена
            </Button>
          </span>
        ) : (
          <Flex>
            <Button
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              type="link"
            >
              Изменить
            </Button>
            <Button type="link"
              disabled={editingKey !== ''}>
              <InertiaLink href={route('stopsroutes.add')}>Добавить</InertiaLink>
            </Button>
          </Flex>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  useEffect(() => {
    form.setFieldsValue({
      destination: route1.destination,
      origin: route1.origin
    })
  }, [])

  const onFinish = (values: any) => {
    values.route_id = route1.route_id
    Inertia.post(updateRoute, values)
    form.resetFields()
  }
  const onAddRouteStop = (values: any) => {debugger
    Inertia.post(route('stopsroutes.save', values))
    form.resetFields()
  }

  const tailLayout = {
    wrapperCol: { offset: 3, span: 12 }
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
          <Col span={24} style={{marginTop: 10}}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 6 }}
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

          <Divider orientation="left">Остановки маршрута</Divider>
          <Flex >
            <Form form={form2} component={false} >
              <Table
                style={{ marginTop: 10, marginLeft: 70 }}
                size="large"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={dataSource}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
            <Col span={24} style={{ marginLeft: 80 }}>
              <Form
                form={form3}
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 7 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onAddRouteStop}
              >
                <Form.Item
                  label="ID маршрута"
                  name="route_id"
                  rules={[{ required: true, message: 'Введите название' }]}
                  initialValue={route1.route_id}
                >
                  <Input disabled/>
                </Form.Item>

                <Form.Item
                  label="ID Остановки"
                  name="stops_id"
                  rules={[{ required: true, message: 'Введите остановку' }]}
                >
                  <Select>
                  {stops.map((stop) => (
                    <Select.Option key={stop.stop_id} value={stop.stop_id}>
                      {`${stop.stop_id} - ${stop.name}`}
                    </Select.Option>
                  ))}
                </Select>
                </Form.Item>
                <Form.Item
                  label="Название"
                  name="name"
                  rules={[{ required: true, message: 'Введите остановку' }]}
                >
                  <Select>
                  {stops.map((stop) => (
                    <Select.Option key={stop.stop_id} value={stop.name}>
                      {`${stop.stop_id} - ${stop.name}`}
                    </Select.Option>
                  ))}
                </Select>
                </Form.Item>

                <Form.Item
                  label="Время"
                  name="time"
                  rules={[{ required: true, message: 'Введите время в пути до остановки' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Space size={18}>
                    <Button type="primary" htmlType="submit">
                      Сохранить
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Col>
          </Flex>
          <Divider orientation="left">Добавить рейс</Divider>
          <Col span={24}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 6 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onCreateTrip}
            >
              <Form.Item
                label="ID маршрута"
                name="route_id"
                rules={[{ required: true }]}
                initialValue={route1.route_id}
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