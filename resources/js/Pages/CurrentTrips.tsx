import IPaginateTrip from "@/types/models/IPaginateBooking"
import React from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Tooltip } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import Template from "@/Components/Template"
import IPaginateTravel from "@/types/models/IPaginateTravel"



interface Props {
  travels: IPaginateTravel
}


const CurrentTrips: React.FC<Props> = ({travels}) => {
  const TripTableColumns = [
    {title: 'ID', dataIndex: 'travel_id', key: 'travel_id'},
    {title: 'Номер рейса', dataIndex: 'tripNumber', key: 'tripNumber'},
    {title: 'Откуда', dataIndex: 'origin', key: 'origin'},
    {title: 'Куда', dataIndex: 'destination', key: 'destination'},
    {title: 'Имя водителя', dataIndex: 'name', key: 'name'},
    {title: 'Фамилия водителя', dataIndex: 'surname', key: 'surname'},
    {title: 'Тел.номер водителя', dataIndex: 'phone', key: 'phone'},
    {title: 'Номер автобуса', dataIndex: 'plate_number', key: 'plate_number'},
    {title: 'Места', dataIndex: 'max_seats', key: 'max_seats'},
    {title: 'Статус', dataIndex: 'status', key: 'status'},
    {title: 'Тип поездки', dataIndex: 'type', key: 'type'},
    {title: 'Время отправления', dataIndex: 'departure_DateTime', key: 'departure_DateTime'},
    {title: 'Время прибытия', dataIndex: 'arrival_DateTime', key: 'arrival_DateTime'},
  ]

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
            Активные поездки
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'trip_id'}
            dataSource={travels.data}
            columns={TripTableColumns}
            onChange={handleTableDataChange}
            pagination={{
              current: travels.current_page,
              defaultCurrent: 1,
              pageSize: travels.per_page,
              total: travels.total,
              position: ['bottomLeft'],
              showSizeChanger: false
            }}
          />
        </Col>
      </div>
    </Template>
  )
}

export default CurrentTrips