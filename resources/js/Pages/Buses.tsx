import IPaginateBus from "@/types/models/IPaginateBus"
import { route } from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Flex } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import Template from "@/Components/Template"
import ITechReport from "@/types/ITechReport"
import { useState } from "react"
import IBus from "@/types/IBus"



interface BusProps {
  buses: IPaginateBus
}
interface ReportProps {
  techreports: ITechReport
}


type Props = BusProps & ReportProps

const Buses: React.FC<Props> = ({ buses, techreports }) => {

  const tableColumns: any = [
    { title: 'ID', dataIndex: 'bus_id', key: 'bus_id', sorter: (a: any, b: any) => a.bus_id - b.bus_id },
    {
      title: 'Название', dataIndex: 'name', key: 'name',
      onFilter: (value: any, record: any) => record.name.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    { title: 'Номер', dataIndex: 'plate_number', key: 'plate_number' },
    { title: 'Кол-во мест', dataIndex: 'max_seats', key: 'max_seats', sorter: (a: any, b: any) => a.max_seats - b.max_seats },
    {
      title: 'Статус', dataIndex: 'status', key: 'status',
      filters: [
        {
          text: 'available',
          value: 'available',
        },
        {
          text: 'taken',
          value: 'taken',
        },
        {
          text: 'forMaintenance',
          value: 'forMaintenance',
        },
        {
          text: 'inService',
          value: 'inService',
        },
      ],
      onFilter: (value: any, record: any) => record.status.indexOf(value as string) === 0,
    },
    {
      title: '',
      key: 'bus_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('buses.view', { bus: record.bus_id })}>
            <EditOutlined />
          </InertiaLink>
          <Popconfirm
            title='Вы уверены, что хотите удалить запись?'
            onConfirm={() => deleteBus(record.bus_id)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const deleteBus = (bus_id: number) => {
    Inertia.post(route('buses.delete', { bus_id }))
  }

  const handleTableDataChange = (pagination: TablePaginationConfig, filters: unknown, sorter: unknown) => {
    if (pagination.current !== buses.current_page) {
      const url = route('buses.list') + `?page=${pagination.current}`
      Inertia.visit(url, { method: Method.GET })
    }
  }

  return (
    <Template>
      <div className="site-layout-background" style={{ padding: 14, minHeight: 360 }}>
        <div>
          <Divider orientation="left" >
            Автобусы
            <Button type="primary" style={{ marginLeft: '20px' }}>
              <InertiaLink href={route('buses.add')}>Добавить</InertiaLink>
            </Button>
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'bus_id'}
            dataSource={buses.data}
            columns={tableColumns}
            onChange={handleTableDataChange}
            pagination={{
              current: buses.current_page,
              defaultCurrent: 1,
              pageSize: buses.per_page,
              total: buses.total,
              position: ['bottomLeft'],
              showSizeChanger: false
            }}
          />
        </Col>
      </div>
    </Template>
  )
}

export default Buses