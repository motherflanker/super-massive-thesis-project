import IPaginateTrip from "@/types/models/IPaginateBooking"
import React from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import Template from "@/Components/Template"


interface Props {
  trips: IPaginateTrip
}


const Trips: React.FC<Props> = ({ trips }) => {
  const tableColumns = [
    { title: 'ID', dataIndex: 'trip_id', key: 'trip_id' },
    { title: 'RouteID', dataIndex: 'route_id', key: 'route_id' },
    { title: "Driver's name", dataIndex: 'name', key: 'name' },
    { title: "Driver's surname", dataIndex: 'surname', key: 'surname' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'StopsID', dataIndex: 'city_list_id', key: 'city_list_id' },
    { title: 'BusID', dataIndex: 'bus_id', key: 'bus_id' },
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: 'Origin', dataIndex: 'origin', key: 'origin' },
    { title: 'Seats', dataIndex: 'max_seats', key: 'max_seats' },
    { title: 'Depart at', dataIndex: 'departure_DateTime', key: 'departure_DateTime' },
    { title: 'Arrive at', dataIndex: 'arrival_DateTime', key: 'arrival_DateTime' },
    {
      title: 'Actions',
      key: 'trip_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('trips.view', { trip: record.trip_id })}>
            <EditOutlined />
          </InertiaLink>
          <Popconfirm
            title='Are you sure you want to delete this?'
            onConfirm={() => deleteTrip(record.trip_id)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      )
    }
  ]

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
            Trips
            <Button type="primary" style={{ marginLeft: '20px' }}>
              <InertiaLink href={route('trips.add')}>Add trip</InertiaLink>
            </Button>
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'trip_id'}
            dataSource={trips.data}
            columns={tableColumns}
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

export default Trips