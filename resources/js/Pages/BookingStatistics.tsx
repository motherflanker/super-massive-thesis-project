import React, { useEffect, useState } from 'react';
import { DatePicker, Row, Col, Statistic, Card } from 'antd';
import { Line } from '@ant-design/charts';
import { Inertia } from '@inertiajs/inertia';
import { route } from 'ziggy-js';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue, EventValue } from 'rc-picker/lib/interface';
import Template from '@/Components/Template';

const { RangePicker } = DatePicker;

type BookingData = {
  date: string;
  count: number;
  revenue: number;
};

type StatisticsProps = {
  totalBookings: number;
  totalRevenue: number;
  bookingsData: BookingData[];
  startDate: string;
  endDate: string;
  lastMonthRevenue: number;
};

type ItemType = { date: string | number | dayjs.Dayjs | Date | null | undefined; }


const BookingStatistics: React.FC<StatisticsProps> = ({lastMonthRevenue, totalBookings, totalRevenue, bookingsData, startDate, endDate }) => {
  debugger
  const initialDateRange: [Dayjs, Dayjs] = [
    dayjs(startDate),
    dayjs(endDate),
  ];
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(initialDateRange);
  const [data, setData] = useState<BookingData[]>(bookingsData);

  const fetchStatistics = (startDate: string, endDate: string) => {
    console.log(`Fetching statistics from ${startDate} to ${endDate}`);
    Inertia.get(route('bookings.statistics'), { startDate, endDate }, {
      onSuccess: (page) => {
        console.log("Statistics fetched successfully: ", page);
        const { lastMonthRevenue, totalBookings, totalRevenue, bookingsData } = page.props;
        setData(bookingsData as BookingData[]);
      },
      onError: (errors) => {
        console.error("Inertia request errors:", errors);
      },
      preserveState: true, 
      replace: true 
    });
  };

  // useEffect(() => {
  //   if (dateRange) {
  //     const startDate = dateRange[0].format('YYYY-MM-DD');
  //     const endDate = dateRange[1].format('YYYY-MM-DD');
  //     fetchStatistics(startDate, endDate);
  //   }
  // }, []);

  const handleDateChange = (dates: [EventValue<Dayjs>, EventValue<Dayjs>] | null) => {
    if (dates && dates[0] && dates[1]) {
      const startDate = (dates[0] as Dayjs).format('YYYY-MM-DD');
      const endDate = (dates[1] as Dayjs).format('YYYY-MM-DD');
      setDateRange([dates[0] as Dayjs, dates[1] as Dayjs]);
      fetchStatistics(startDate, endDate);
    }
  };

  // const config = {
  //   data: data.flatMap((item) => [
  //     { date: item.date, type: 'count', value: item.count },
  //     //{ date: item.date, type: 'revenue', value: item.revenue },
  //   ]),
  //   height: 500,
  //   xField: 'date',
  //   yField: 'value',
  //   seriesField: 'type',
  //   point: { size: 5, shape: 'diamond' },
  //   // tooltip: {
  //   //   customItems: (items: any) => {
  //   //     return items.map((item: { data: { type: string; count: number; revenue: number; }; }) => ({
  //   //       ...item,
  //   //       name: item.data.type === 'count' ? 'Броней за период' : 'Выручка',
  //   //       value: item.data.type === 'count' ? item.data.count : item.data.revenue,
  //   //     }));
  //   //   },
  //   // },
  //   meta: {
  //     date: { alias: 'Дата' },
  //     count: { alias: 'Броней за период' },
  //     revenue: { alias: 'Выручка' },
  //   },
  // };

  const config = {
    data: data.flatMap((item) => [
      { date: item.date, type: 'count', value: item.count },
    ]),
    height: 500,
    xField: 'date',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    point: { size: 5, shape: 'diamond' },
    // tooltip: {
    //   formatter: (datum:any) => {
    //     return {
    //       name: datum.type === 'count' ? 'Броней за период' : 'Выручка',
    //       value: datum.type === 'count' ? datum.value : `₽${datum.value}`,
    //     };
    //   },
    // },
    meta: {
      date: { alias: 'Дата' },
      count: { alias: 'Броней за период' },
      revenue: { alias: 'Выручка' },
    },
  };

  return (
    <Template>
      <Card>
        <RangePicker onChange={handleDateChange} />
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Броней за период" value={totalBookings} />
          </Col>
          <Col span={8}>
            <Statistic title="Выручка за период" value={totalRevenue} prefix="₽" />
          </Col>
          <Col span={8}>
            <Statistic title="Выручка за последний месяц" value={lastMonthRevenue} />
          </Col>
        </Row>
        <Line {...config} />
      </Card>
    </Template>
  );
};

export default BookingStatistics;


