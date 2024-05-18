import IPaginateTrip from "@/types/models/IPaginateBooking"
import React, { useEffect, useRef, useState } from "react"
import { route } from "ziggy-js"
import { Col, Divider, Space, Table, TablePaginationConfig, Popconfirm, Button, Tooltip, InputRef, Input } from "antd"
import { Inertia, Method } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"
import { SearchOutlined } from '@ant-design/icons'
import Template from "@/Components/Template"
import IPaginateTravel from "@/types/models/IPaginateTravel"
import IBus from "@/types/IBus"
import { ColumnType, FilterDropdownProps } from "antd/es/table/interface"
import Highlighter from "react-highlight-words"



interface TravelProps {
  travels: IPaginateTravel
}

interface BusProps {
  buses: IBus[];
}

type Props = TravelProps & BusProps



const CurrentTrips: React.FC<Props> = ({ travels, buses }) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: any,
  ) => {debugger
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
    { title: 'ID', dataIndex: 'travel_id', key: 'travel_id', sorter: (a: any, b: any) => a.travel_id - b.travel_id },
    {
      title: 'Номер рейса', dataIndex: 'tripNumber', key: 'tripNumber', sorter: (a: any, b: any) => a.tripNumber - b.tripNumber,
      ...getColumnSearchProps('tripNumber'),
      onFilter: (value: any, record: any) => record.tripNumber.indexOf(value as string) === 0,
    },
    {
      title: 'Откуда', dataIndex: 'origin', key: 'origin',
      ...getColumnSearchProps('origin'),
      onFilter: (value: any, record: any) => record.origin.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.origin.localeCompare(b.origin)
    },
    {
      title: 'Куда', dataIndex: 'destination', key: 'destination',
      ...getColumnSearchProps('destination'),
      onFilter: (value: any, record: any) => record.destination.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.destination.localeCompare(b.destination)
    },
    { title: 'Имя водителя', dataIndex: 'name', key: 'name' },
    { title: 'Фамилия водителя', dataIndex: 'surname', key: 'surname' },
    { title: 'Тел.номер водителя', dataIndex: 'phone', key: 'phone' },
    { title: 'Номер автобуса', dataIndex: 'plate_number', key: 'plate_number' },
    {
      title: 'Статус', dataIndex: 'status', key: 'status', filters: [
        {
          text: 'ожидает',
          value: 'ожидает',
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
  ]

  const handleTableDataChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: unknown
  ) => {
    if (pagination.current !== travels.current_page) {
      debugger
      const url = route('currenttrips.list') + `?page=${pagination.current}`
      Inertia.visit(url, { method: Method.GET })
    }
  }

  useEffect(() => {
    const yandexMapScript = document.createElement('script');
    yandexMapScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=c62ff8a1-50b9-4ea6-8bec-bf7f9950deaa&lang=en_US';
    yandexMapScript.type = 'text/javascript';
    yandexMapScript.onload = () => {
      window.ymaps.ready(initMap);
    };
    document.head.appendChild(yandexMapScript);

    return () => {
      document.head.removeChild(yandexMapScript);
    };
  }, [buses]);

  const initMap = () => {
    const map = new window.ymaps.Map('map', {
      center: [buses[0]?.latitude || 0, buses[0]?.longitude || 0],
      zoom: 8,
    });

    buses.forEach(bus => {
      const marker = new window.ymaps.Placemark(
        [bus.latitude, bus.longitude],
        { hintContent: `Bus ID: ${bus.bus_id}`, balloonContent: `<div>Bus ID: ${bus.bus_id}</div>` },
        { preset: 'islands#icon', iconColor: '#0095b6' }
      );

      map.geoObjects.add(marker);
    });
  };

  return (
    <Template>
      <div className="site-layout-background" style={{ padding: 14, minHeight: 360 }}>
        <div style={{ marginTop: -20 }}>
          <Divider orientation="left">
            Карта
          </Divider>
        </div>
        <div id="map" style={{ width: '100%', maxHeight: '500px', height: '500px' }}></div>
        <div>
          <Divider orientation="left">
            Активные поездки
          </Divider>
        </div>
        <Col>
          <Table
            rowKey={'trip_id'}
            dataSource={travels.data}
            columns={TripTableColumns}
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

export default CurrentTrips