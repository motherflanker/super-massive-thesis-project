import IPaginateBus from "@/types/models/IPaginateBus"
import { route } from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Flex } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import Template from "@/Components/Template"
import ITechReport from "@/types/ITechReport"



interface BusProps {
  buses: IPaginateBus
}
interface ReportProps {
  techreports: ITechReport
}

type Props = BusProps & ReportProps

const Buses: React.FC<Props> = ({buses, techreports}) => {
  const tableColumns = [
    {title: 'ID', dataIndex: 'bus_id', key: 'bus_id'},
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Registration plate', dataIndex: 'plate_number', key: 'plate_number'},
    {title: 'Seats', dataIndex: 'max_seats', key: 'max_seats'},
    {
      title: 'Actions',
      key: 'bus_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('buses.view', {bus: record.bus_id})}>
            <EditOutlined/>
          </InertiaLink>
          <Popconfirm 
            title='Are you sure you want to delete this?' 
            onConfirm={() => deleteBus(record.bus_id)}
          >
            <DeleteOutlined/>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const deleteBus = (bus_id: number) => {   
    Inertia.post(route('buses.delete', {bus_id})) 
  }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    const url = route('buses.list') + `?page=${pagination.current}`
    Inertia.visit(url, {method: Method.GET})
  }

  return (
    <Template>
      <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>  
        <div>
          <Divider orientation="left" >
            Buses
            <Button type="primary" style={{marginLeft:'20px'}}>
              <InertiaLink href={route('buses.add')}>Add new</InertiaLink>
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