import { route } from "ziggy-js"
import { InertiaLink } from "@inertiajs/inertia-react"
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Flex, Form, Input, Row, InputRef } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import Template from "@/Components/Template"
import IPaginateCityList from "@/types/models/IPaginateCityList"
import ICity from "@/types/ICity"
import IPaginateCity from "@/types/models/IPaginateCity"
import CityCard from "@/Components/CityCard"
import IStops from "@/types/IStops"
import IPaginateStop from "@/types/models/IPaginateStop"
import { useRef, useState } from "react"
import { ColumnType, FilterDropdownProps } from "antd/es/table/interface"
import Highlighter from "react-highlight-words"



interface CityProps {
  cities: IPaginateCity
}

interface StopsProps {
  stops: IPaginateStop
}

type Props = CityProps & StopsProps

const Cities: React.FC<Props> = ({ cities, stops }) => {
  const [form] = Form.useForm()

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: any,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Назад
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const tableColumns = [
    {
      title: 'ID', dataIndex: 'city_id', key: 'city_id',
      sorter: (a: any, b: any) => a.city_id - b.city_id
    },
    {
      title: 'Название', dataIndex: 'name', key: 'name',
      onFilter: (value: any, record: any) => record.name.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
    {
      title: '',
      key: 'city_id',
      render: (key: any, record: any) => (
        <Space size={'middle'}>
          <InertiaLink href={route('cities.view', { city: record.city_id })}>
            <EditOutlined />
          </InertiaLink>
          <Popconfirm
            title='Вы уверены, что хотите удалить запить?'
            onConfirm={() => deleteCity(record.city_id)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const stopsTableColumns = [
    {
      title: 'ID', dataIndex: 'stop_id', key: 'stop_id',
      sorter: (a: any, b: any) => a.stops_id - b.stops_id
    },
    {
      title: 'ID города', dataIndex: 'city_id', key: 'city_id',
      sorter: (a: any, b: any) => a.city_id - b.city_id
    },
    {
      title: 'Название', dataIndex: 'name', key: 'name',
      onFilter: (value: any, record: any) => record.name.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
  ]

  const deleteCity = (city_id: number) => {
    Inertia.post(route('cities.delete', { city_id }))
  }


  const handleCitiesTableDataChange = (
    paginatation: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    const query = {
      cities_page: paginatation.current,
      stops_page: stops.current_page,
      ...filters,
      sortField: sorter.field,
      sortOrder: sorter.order
    }
    if (paginatation.current !== cities.current_page) {
      Inertia.visit(route('cities.list'), {
        method: Method.GET,
        data: query,
        preserveState: true
      })
    }
  }

  const handleStopsTableDataChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    const query = {
      cities_page: cities.current_page,
      stops_page: pagination.current,
      ...filters,
      sortField: sorter.field,
      sortOrder: sorter.order,
    };
    if (pagination.current !== stops.current_page) {
      Inertia.visit(route('cities.index'), {
        method: Method.GET,
        data: query,
        preserveState: true,
      })
    }
  }

  const onCityAdd = (values: any) => {
    Inertia.post(route('cities.save', values))
    form.resetFields()
  }



  return (
    <Template>
      <div className="site-layout-background" style={{ padding: 14, minHeight: 360 }}>
        <div>
          <Divider orientation="left" >
            Населенные пункты
          </Divider>
          <Flex justify='flex-end' wrap="wrap" style={{ marginRight: 19 }}>
            <Form form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onCityAdd}
            >
              <Row>
                <Form.Item
                  label="Город"
                  name="name"
                  rules={[{ required: true, message: 'Введите название' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Flex>
                    <Button type="primary" htmlType="submit">
                      Добавить
                    </Button>
                  </Flex>
                </Form.Item>
              </Row>
            </Form>
          </Flex>
        </div>
        <Col>
          <Table
            rowKey={'city_id'}
            dataSource={cities.data}
            columns={tableColumns}
            onChange={handleCitiesTableDataChange}
            pagination={{
              current: cities.current_page,
              defaultCurrent: 1,
              pageSize: cities.per_page,
              total: cities.total,
              position: ['bottomLeft'],
              showSizeChanger: false
            }}
          />
        </Col>
        <div>
          <Divider orientation="left">
            Остановки
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'stops_id'}
            dataSource={stops.data}
            columns={stopsTableColumns}
            size="large"
            onChange={handleStopsTableDataChange}
            pagination={{
              current: stops.current_page,
              defaultCurrent: 1,
              pageSize: stops.per_page,
              total: stops.total,
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