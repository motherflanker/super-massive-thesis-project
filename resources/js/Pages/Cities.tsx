import { route } from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Flex } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import Template from "@/Components/Template"
import IPaginateCityList from "@/types/models/IPaginateCityList"
import ICity from "@/types/ICity"



interface CityListProps {
  citylists: IPaginateCityList
}

interface CityProps {
  cities: Array<ICity>
}

type Props = CityListProps & CityProps

const Cities: React.FC<Props> = ({citylists, cities}) => {
  const tableColumns = [
    {title: 'ID', dataIndex: 'city_list_id', key: 'city_list_id'},
    {title: 'Stop №1', dataIndex: 'city_id1', key: 'city_id1'},
    {title: 'Stop №2', dataIndex: 'city_id2', key: 'city_id2'},
    {title: 'Stop №3', dataIndex: 'city_id3', key: 'city_id3'},
    {title: 'Stop №4', dataIndex: 'city_id4', key: 'city_id4'},
    {title: 'Stop №5', dataIndex: 'city_id5', key: 'city_id5'},
    {title: 'Stop №6', dataIndex: 'city_id6', key: 'city_id6'},
    {title: 'Stop №7', dataIndex: 'city_id7', key: 'city_id7'},
    {title: 'Stop №8', dataIndex: 'city_id8', key: 'city_id8'},
    {
      title: 'Actions',
      key: 'city_list_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('citylists.view', {citylist: record.city_list_id})}>
            <EditOutlined/>
          </InertiaLink>
          <Popconfirm 
            title='Are you sure you want to delete this?' 
            onConfirm={() => deleteCityList(record.city_list_id)}
          >
            <DeleteOutlined/>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const deleteCityList = (city_list_id: number) => {    
    Inertia.post(route('citylists.delete', {city_list_id})) 
  }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    const url = route('citylists.list') + `?page=${pagination.current}`
    Inertia.visit(url, {method: Method.GET})
  }

  return (
    <Template>
      <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>  
        <div>
          <Divider orientation="left" >
            City Lists
            <Button type="primary" style={{marginLeft:'20px'}}>
              <InertiaLink href={route('citylists.add')}>Add new</InertiaLink>
            </Button>
          </Divider>
        </div>
          <Col>
            <Table 
              rowKey={'city_list_id'} 
              dataSource={citylists.data} 
              columns={tableColumns}
              onChange={handleTableDataChange}
              pagination={{
                current: citylists.current_page,
                defaultCurrent: 1,
                pageSize: citylists.per_page,
                total: citylists.total,
                position: ['bottomLeft'],
                showSizeChanger: false
              }}
            />
          </Col>
      </div>
    </Template>
  )
}

export default Cities