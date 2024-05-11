import IPaginateBooking from "@/types/models/IPaginateBooking"
import React, { useRef, useState } from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Tooltip, InputRef, Input } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons'
import Template from "@/Components/Template"
import { ColumnType, FilterDropdownProps } from "antd/es/table/interface"
import Highlighter from 'react-highlight-words';



interface Props {
  bookings: IPaginateBooking
}

const Bookings: React.FC<Props> = ({bookings}) => {

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

  const tableColumns: any = [
    {title: 'ID', dataIndex: 'booking_id', key: 'booking_id', sorter: (a: any, b: any) => a.booking_id - b.booking_id},
    {title: 'Номер рейса', dataIndex: 'tripNumber', key: 'tripNumber', 
      sorter: (a: any, b: any) => a.tripNumber - b.tripNumber, 
      ...getColumnSearchProps('tripNumber'),
    },
    {title: 'Имя', dataIndex: 'name', key: 'name',
      ...getColumnSearchProps('name'),
      onFilter: (value: any, record: any) => record.name.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {title: 'Фамилия', dataIndex: 'surname', key: 'surname',
      ...getColumnSearchProps('surname'),
      onFilter: (value: any, record: any) => record.surname.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.surname.localeCompare(b.surname)
    },
    {title: 'Телефон', dataIndex: 'phone', key: 'phone'},
    {title: 'Почта', dataIndex: 'email', key: 'email'},
    {title: 'Паспорт', dataIndex: 'passport', key: 'passport'},
    {title: 'Цена', dataIndex: 'price', key: 'price', sorter: (a: any, b: any) => a.price - b.price},
    {title: 'Откуда', dataIndex: 'origin', key: 'origin',
      onFilter: (value: any, record: any) => record.origin.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.origin.localeCompare(b.origin)
    },
    {title: 'Куда', dataIndex: 'destination', key: 'destination',
      onFilter: (value: any, record: any) => record.destination.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.destination.localeCompare(b.destination)
    },
    {title: 'Номер автобуса', dataIndex: 'plate_number', key: 'plate_number'},
    {title: 'Время отправления', dataIndex: 'departure_DateTime', key: 'departure_DateTime',
      onFilter: (value: any, record: any) => record.departure_DateTime.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.departure_DateTime.localeCompare(b.departure_DateTime)
    },
    {title: 'Время прибытия', dataIndex: 'arrival_DateTime', key: 'arrival_DateTime', 
      onFilter: (value: any, record: any) => record.arrival_DateTime.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.arrival_DateTime.localeCompare(b.arrival_DateTime)
     },
    {title: 'Тип поездки', dataIndex: 'type', key: 'type', filters: [
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
      title: '',
      key: 'booking_id',
      render: (key: any, record: any)=>(
        <Space size={'small'}>
          <InertiaLink href={route('bookings.view', {booking: record.booking_id})}>
            <EditOutlined/>
          </InertiaLink>
          <Popconfirm 
            title='Вы уверены, что хотите удалить бронь?' 
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
    if(pagination.current !== bookings.current_page){
      const url = route('bookings.list') + `?page=${pagination.current}`
      Inertia.visit(url, {method: Method.GET})
    }
  }


  return(
    <Template>
      <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>  
        <div>
          <Divider orientation="left">
            Брони
            <Button type="primary" style={{marginLeft:'20px'}}>
              <InertiaLink href={route('travels.list')}>
                <Tooltip title={'Со страницы поездок'}>
                  <span>Добавить</span>
                </Tooltip>
              </InertiaLink>
            </Button>
          </Divider>
        </div>
          <Col>
            <Table 
              rowKey={'booking_id'} 
              size="middle"
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