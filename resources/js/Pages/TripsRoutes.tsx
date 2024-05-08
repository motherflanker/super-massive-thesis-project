import IPaginateTrip from "@/types/models/IPaginateBooking"
import React from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Tooltip } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import Template from "@/Components/Template"
import IPaginateRoute from "@/types/models/IPaginateRoute"


interface TripProps {
  trips: IPaginateTrip
}

interface RouteProps {
  routes: IPaginateRoute
}

type Props = TripProps & RouteProps



const TripsRoutes: React.FC<Props> = ({ trips, routes }) => {
  const TripTableColumns = [
    { title: 'ID рейса', dataIndex: 'trip_id', key: 'trip_id' },
    { title: 'Номер рейса', dataIndex: 'tripNumber', key: 'tripNumber' },
    { title: 'ID маршрута', dataIndex: 'route_id', key: 'route_id' },
    { title: 'Список остановок', dataIndex: 'city_list_id', key: 'city_list_id' },
    { title: 'Откуда', dataIndex: 'origin', key: 'origin' },
    { title: 'Куда', dataIndex: 'destination', key: 'destination' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    {
      title: '',
      key: 'trip_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('trips.view', { trip: record.trip_id })}>
            <EditOutlined />
          </InertiaLink>
          <Popconfirm
            title='Вы уверены, что хотите удалить рейс?'
            onConfirm={() => deleteTrip(record.trip_id)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const addTripTooltip = <span>Добавить рейс</span>

  const RouteTableColumns = [
    { title: 'ID', dataIndex: 'route_id', key: 'route_id' },
    { title: 'Список остановок', dataIndex: 'city_list_id', key: 'city_list_id' },
    { title: 'Откуда', dataIndex: 'origin', key: 'origin' },
    { title: 'Куда', dataIndex: 'destination', key: 'destination' },
    {
      title: '',
      key: 'route_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('routes.view', { route: record.route_id })}>
            <EditOutlined />
          </InertiaLink>
          <Popconfirm
            title='Вы уверены, что хотите удалить маршрут?'
            onConfirm={() => deleteRoute(record.route_id)}
          >
            <DeleteOutlined />
          </Popconfirm>
          <Tooltip placement="top" title={addTripTooltip}>
            <InertiaLink href={route('routes.view', { route: record.route_id })}>
              <PlusCircleOutlined />
            </InertiaLink>
          </Tooltip>
        </Space>
      )
    }
  ]

  const deleteRoute = (route_id: number) => {
    Inertia.post(route('routes.delete', { route_id }))
  }

  const deleteTrip = (trip_id: number) => {
    Inertia.post(route('trips.delete', { trip_id }))
  }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    const url = route('trips.list') + `?page=${pagination.current}`
    Inertia.visit(url, { method: Method.GET })
  }

  

  return (
    <Template>
      <div className="site-layout-background" style={{ padding: 14, minHeight: 360 }}>
        <div>
          <Divider orientation="left">
            Маршруты
            <Button type="primary" style={{ marginLeft: '20px' }}>
              <InertiaLink href={route('routes.add')}>Добавить маршрут</InertiaLink>
            </Button>
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'route_id'}
            dataSource={routes.data}
            columns={RouteTableColumns}
            onChange={handleTableDataChange}
            pagination={{
              current: routes.current_page,
              defaultCurrent: 1,
              pageSize: routes.per_page,
              total: routes.total,
              position: ['bottomLeft'],
              showSizeChanger: false
            }}
          />
        </Col>
        <br />
        <div>
          <Divider orientation="left">
            Рейсы
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'trip_id'}
            dataSource={trips.data}
            columns={TripTableColumns}
            onChange={handleTableDataChange}
            pagination={{
              current: trips.current_page,
              defaultCurrent: 1,
              pageSize: trips.per_page,
              total: trips.total,
              position: ['bottomLeft'],
              showSizeChanger: false
            }}
          />
        </Col>

      </div>
    </Template>
  )
}

export default TripsRoutes