import IPaginateBooking from "@/types/models/IPaginateBooking"
import React from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from '@ant-design/icons'
import Template from "@/Components/Template"



interface Props {
  bookings: IPaginateBooking
}

const Bookings: React.FC<Props> = ({bookings}) => {
  const tableColumns = [
    {title: 'ID', dataIndex: 'booking_id', key: 'booking_id'},
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Surname', dataIndex: 'surname', key: 'surname'},
    {title: 'Phone', dataIndex: 'phone', key: 'phone'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
    {title: 'Passport', dataIndex: 'passport', key: 'passport'},
    {title: 'Price', dataIndex: 'price', key: 'price'},
    {title: 'Destination', dataIndex: 'destination', key: 'destination'},
    {title: 'Origin', dataIndex: 'origin', key: 'origin'},
    {title: 'Trip ID', dataIndex: 'trip_id', key: 'trip_id'},
    {title: 'Depart at', dataIndex: 'departure_DateTime', key: 'departure_DateTime'},
    {title: 'Arrive at', dataIndex: 'arrival_DateTime', key: 'arrival_DateTime'},
    {
      title: 'Actions',
      key: 'booking_id',
      render: (key: any, record: any)=>(
        <Space size={'middle'}>
          <InertiaLink href={route('bookings.view', {booking: record.booking_id})}>
            <EditOutlined/>
          </InertiaLink>
          <Popconfirm 
            title='Are you sure you want to delete this?' 
            onConfirm={() => deleteBooking(record.booking_id)}
          >
            <DeleteOutlined/>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const deleteBooking = (booking_id: number) => {   
    Inertia.post(route('bookings.delete', {booking_id})) 
  }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    const url = route('bookings.list') + `?page=${pagination.current}`
    Inertia.visit(url, {method: Method.GET})
  }


  return(
    <Template>
      <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>  
        <div>
          <Divider orientation="left">
            Bookings
            <Button type="primary" style={{marginLeft:'20px'}}>
              <InertiaLink href={route('bookings.add')}>Add new</InertiaLink>
            </Button>
          </Divider>
        </div>
          <Col>
            <Table 
              rowKey={'booking_id'} 
              dataSource={bookings.data} 
              columns={tableColumns}
              onChange={handleTableDataChange}
              pagination={{
                current: bookings.current_page,
                defaultCurrent: 1,
                pageSize: bookings.per_page,
                total: bookings.total,
                position: ['bottomLeft'],
                showSizeChanger: false
              }}
            />
          </Col>
      </div>
    </Template>
  )
}

export default Bookings 