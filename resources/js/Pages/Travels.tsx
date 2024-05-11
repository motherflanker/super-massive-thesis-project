import React, { useRef, useState } from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Tooltip, InputRef, Input } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import Template from "@/Components/Template"
import IPaginateTravel from "@/types/models/IPaginateTravel"
import IBus from "@/types/IBus"
import { title } from "process"
import Highlighter from "react-highlight-words"
import { ColumnType, FilterDropdownProps } from "antd/es/table/interface"



interface TravelProps {
  travels: IPaginateTravel
}

type Props = TravelProps

const addBookingTooltip = <span>Добавить бронь к этой поездке</span>

const Travels: React.FC<Props> = ({ travels }) => {

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
      title: 'ID', dataIndex: 'travel_id', key: 'travel_id',
      sorter: (a: any, b: any) => a.travel_id - b.travel_id
    },
    {
      title: 'Номер рейса', dataIndex: 'tripNumber', key: 'tripNumber',
      sorter: (a: any, b: any) => a.travel_id - b.travel_id
    },
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
      title: 'Имя водителя', dataIndex: 'name', key: 'name',
      onFilter: (value: any, record: any) => record.name.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Фамилия водителя', dataIndex: 'surname', key: 'surname',
      onFilter: (value: any, record: any) => record.surname.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.surname.localeCompare(b.surname),
    },
    { title: 'Тел.номер водителя', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Номер автобуса', dataIndex: 'plate_number', key: 'plate_number',
      ...getColumnSearchProps('plate_number'),
    },
    { title: 'Места', dataIndex: 'max_seats', key: 'max_seats' },
    {
      title: 'Статус', dataIndex: 'status', key: 'status', filters: [
        {
          text: 'ожидает',
          value: 'ожидает',
        },
        {
          text: 'отменен',
          value: 'отменен',
        },
        {
          text: 'в пути',
          value: 'в пути',
        },
        {
          text: 'в пути обратно',
          value: 'в пути обратно',
        },
      ],
      onFilter: (value: any, record: any) => record.status.indexOf(value as string) === 0,
    },
    {
      title: 'Тип поездки', dataIndex: 'type', key: 'type', filters: [
        {
          text: 'круговой рейс',
          value: 'круговой рейс',
        },
        {
          text: 'в один конец',
          value: 'в один конец',
        },
      ],
      onFilter: (value: any, record: any) => record.type.indexOf(value as string) === 0,
    },
    {
      title: 'Время отправления', dataIndex: 'departure_DateTime', key: 'departure_DateTime',
      onFilter: (value: any, record: any) => record.departure_DateTime.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.departure_DateTime.localeCompare(b.departure_DateTime)
    },
    {
      title: 'Время прибытия', dataIndex: 'arrival_DateTime', key: 'arrival_DateTime',
      onFilter: (value: any, record: any) => record.arrival_DateTime.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.arrival_DateTime.localeCompare(b.arrival_DateTime)
    },
    {
      title: '',
      key: 'travel_id',
      render: (key: any, record: any) => (
        <Space size={'small'}>
          <InertiaLink href={route('travels.view', { travel: record.travel_id })}>
            <EditOutlined />
          </InertiaLink>
          <Popconfirm
            title='Вы уверены, что хотите удалить поездку?'
            onConfirm={() => deleteTravel(record.travel_id)}
          >
            <DeleteOutlined />
          </Popconfirm>
          <Tooltip placement="top" title={addBookingTooltip}>
            <InertiaLink href={route('travels.view', { travel: record.travel_id })}>
              <PlusCircleOutlined />
            </InertiaLink>
          </Tooltip>
        </Space>
      )
    }
  ]


  const deleteTravel = (travel_id: number) => {
    Inertia.post(route('travels.delete', { travel_id }))
  }

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    if (pagination.current !== travels.current_page) {
      const url = route('travels.list') + `?page=${pagination.current}`
      Inertia.visit(url, { method: Method.GET })
    }
  }


  return (
    <Template>
      <div className="site-layout-background" style={{ padding: 14, minHeight: 360 }}>
        <div>
          <Divider orientation="left">
            Поездки
            <Button type="primary" style={{ marginLeft: '20px' }}>
              <InertiaLink href={route('travels.add')}>Добавить</InertiaLink>
            </Button>
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'travel_id'}
            dataSource={travels.data}
            columns={tableColumns}
            size="middle"
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