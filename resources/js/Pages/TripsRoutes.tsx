import IPaginateTrip from "@/types/models/IPaginateBooking"
import React, { useRef, useState } from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Tooltip, InputRef, Input } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import Template from "@/Components/Template"
import IPaginateRoute from "@/types/models/IPaginateRoute"
import { ColumnType, FilterDropdownProps } from "antd/es/table/interface"
import Highlighter from "react-highlight-words"


interface TripProps {
  trips: IPaginateTrip
}

interface RouteProps {
  routes: IPaginateRoute
}

type Props = TripProps & RouteProps



const TripsRoutes: React.FC<Props> = ({ trips, routes }) => {


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


  const TripTableColumns = [
    {
      title: 'ID рейса', dataIndex: 'trip_id', key: 'trip_id',
      sorter: (a: any, b: any) => a.trip_id - b.trip_id
    },
    {
      title: 'Номер рейса', dataIndex: 'tripNumber', key: 'tripNumber',
      sorter: (a: any, b: any) => a.tripNumber - b.tripNumber,
      ...getColumnSearchProps('tripNumber'),
    },
    {
      title: 'ID маршрута', dataIndex: 'route_id', key: 'route_id',
      sorter: (a: any, b: any) => a.route_id - b.route_id
    },
    // { title: 'Список остановок', dataIndex: 'city_list_id', key: 'city_list_id' },
    {
      title: 'Откуда', dataIndex: 'origin', key: 'origin',
      onFilter: (value: any, record: any) => record.origin.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.origin.localeCompare(b.origin),
      ...getColumnSearchProps('origin'),
    },
    {
      title: 'Куда', dataIndex: 'destination', key: 'destination',
      onFilter: (value: any, record: any) => record.destination.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.destination.localeCompare(b.destination),
      ...getColumnSearchProps('destination'),
    },
    {
      title: 'Статус', dataIndex: 'status', key: 'status', filters: [
        {
          text: 'активен',
          value: 'active',
        },
        {
          text: 'неактивен',
          value: 'inactive',
        },
      ],
      onFilter: (value: any, record: any) => record.status.indexOf(value as string) === 0,
    },
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
    {
      title: 'ID', dataIndex: 'route_id', key: 'route_id',
      sorter: (a: any, b: any) => a.route_id - b.route_id
    },
    // { title: 'Список остановок', dataIndex: 'city_list_id', key: 'city_list_id' },
    {
      title: 'Откуда', dataIndex: 'origin', key: 'origin',
      onFilter: (value: any, record: any) => record.origin.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.origin.localeCompare(b.origin),
      ...getColumnSearchProps('origin'),
    },
    {
      title: 'Куда', dataIndex: 'destination', key: 'destination',
      onFilter: (value: any, record: any) => record.destination.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.destination.localeCompare(b.destination),
      ...getColumnSearchProps('destination'),
    },
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
    if (pagination.current !== trips.current_page && routes.current_page) {
      const url = route('trips.list') + `?page=${pagination.current}`
      Inertia.visit(url, { method: Method.GET })
    }
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