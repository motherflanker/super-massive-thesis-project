import React from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from '@ant-design/icons'
import Template from "@/Components/Template"
import IPaginateTravel from "@/types/models/IPaginateTravel"
import IBus from "@/types/IBus"
import { title } from "process"



interface TravelProps {
  travels: IPaginateTravel
}

interface BusProps {
  buses: Array<IBus>
}

type Props = BusProps & TravelProps

const Travels: React.FC<Props> = ({travels, buses}) => {
  const tableColumns = [
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
    {
      title: '',
      key: 'travel_id',
      render: (key: any, record: any)=>(
        <Space size={'middle'}>
          <InertiaLink href={route('travels.view', {travel: record.travel_id})}>
            <EditOutlined/>
          </InertiaLink>
          <Popconfirm 
            title='Вы уверены, что хотите удалить поездку?' 
            onConfirm={() => deleteTravel(record.travel_id)}
          >
            <DeleteOutlined/>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const deleteTravel = (travel_id: number) => {   
    Inertia.post(route('travels.delete', {travel_id})) 
  }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    const url = route('travels.list') + `?page=${pagination.current}`
    Inertia.visit(url, {method: Method.GET})
  }


  return(
    <Template>
      <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>  
        <div>
          <Divider orientation="left">
            Поездки
            <Button type="primary" style={{marginLeft:'20px'}}>
              <InertiaLink href={route('travels.add')}>Добавить</InertiaLink>
            </Button>
          </Divider>
        </div>
          <Col>
            <Table 
              rowKey={'travel_id'} 
              dataSource={travels.data} 
              columns={tableColumns}
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

export default Travels 