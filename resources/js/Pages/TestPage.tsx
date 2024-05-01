import IPaginateBus from "@/types/models/IPaginateBus"
import { route } from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Flex } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import Template from "@/Components/Template"
import ITechReport from "@/types/ITechReport"
import IPaginateTechReport from "@/types/models/IPaginateTechReport"
import IBus from "@/types/IBus"




interface ReportProps {
  techreports: IPaginateTechReport
}

interface BusProps {
  buses: IPaginateBus
}

type Props = ReportProps & BusProps


const TestPage: React.FC<Props> = ({techreports, buses}) => {
  debugger
  const tableColumns = [
    {title: 'ID', dataIndex: 'report_id', key: 'report_id'},
    {title: 'BusID', dataIndex: 'bus_id', key: 'bus_id'},
    {title: 'Text', dataIndex: 'text', key: 'text'},
    {title: 'Price', dataIndex: 'price', key: 'price'},
    {title: 'isDone', dataIndex: 'isDone', key: 'isDone'},
    // {
    //   title: 'Actions',
    //   key: 'report_id',
    //   render: (key: any, record: any) => (
    //     <Space size={'middle'}>
    //       <InertiaLink href={route('buses.view', {bus: record.bus_id})}>
    //         <EditOutlined/>
    //       </InertiaLink>
    //       <Popconfirm 
    //         title='Are you sure you want to delete this?' 
    //         onConfirm={() => deleteBus(record.bus_id)}
    //       >
    //         <DeleteOutlined/>
    //       </Popconfirm>
    //     </Space>
    //   )
    // }
  ]

  // const deleteBus = (bus_id: number) => {   
  //   Inertia.post(route('buses.delete', {bus_id})) 
  // }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    const url = route('techreports.list') + `?page=${pagination.current}`
    Inertia.visit(url, {method: Method.GET})
  }

  return (
    <Template>
      <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>  
        <div>
          <Divider orientation="left" >
            reports
            {/* <Button type="primary" style={{marginLeft:'20px'}}>
              <InertiaLink href={route('buses.add')}>Add new</InertiaLink>
            </Button> */}
          </Divider>
        </div>
          <Col>
            <Table 
              rowKey={'report_id'} 
              dataSource={techreports.data} 
              columns={tableColumns}
              onChange={handleTableDataChange}
              pagination={{
                current: techreports.current_page,
                defaultCurrent: 1,
                pageSize: techreports.per_page,
                total: techreports.total,
                position: ['bottomLeft'],
                showSizeChanger: false
              }}
            />
          </Col>
      </div>
    </Template>
  )
}

export default TestPage