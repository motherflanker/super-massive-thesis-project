import React, { useEffect, useState } from 'react';
import { Card, DatePicker, DatePickerProps, Flex, Row } from 'antd';
import { Button, Form, Input, Radio, Space, Checkbox } from "antd"
import { Inertia, Method } from '@inertiajs/inertia';
import { route } from "ziggy-js"
import ITechReport from '@/types/ITechReport';
import IBus from '@/types/IBus';
import Template from '@/Components/Template';
import dayjs from 'dayjs';



interface TechReportProps {
  techreport: ITechReport
}
interface BusProps {
  bus: IBus
}

type Props = TechReportProps & BusProps

type LayoutType = Parameters<typeof Form>[0]['layout'];

const TechReportCard: React.FC<Props> = ({ techreport, bus }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  useEffect(() => {
    form.setFieldsValue({
      bus_id: bus.bus_id,
      text: techreport.text,
      price: techreport.price,
      isDone: techreport.isDone,
      startsAt: techreport.startsAt,
      endsAt: techreport.endsAt
    })
  }, [])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 5 }, wrapperCol: { span: 19 } } : null;

  const onFinish = (values: any) => {debugger
    values.report_id = techreport.report_id
    Inertia.post(route('techreports.update'), values)
    form.resetFields()
  }

  const tailLayout = {
    wrapperCol: { offset: 5, span:  19}
  }

  return (

    <Card hoverable key={techreport.report_id} bordered={true} style={{ width: 385, height: 350, background: '#f2f2f2' }}>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={onFinish}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 385 }}
      >
        <Form.Item label="ID авто" name='bus_id'>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Отчет" name='text'>
          <Input placeholder="Enter note" />
        </Form.Item>
        <Form.Item label="Цена" name='price'>
          <Input placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          label="Начало"
          name="startsAt"
          initialValue={techreport.startsAt}
          getValueFromEvent={(e: any) => e?.format("YYYY-MM-DD")}
          getValueProps={(e: string) => ({
            value: e ? dayjs(e) : "",
          })}
        >
          <DatePicker style={{ width: 264 }}
            format={'YYYY-MM-DD'} onChange={onChange} />
        </Form.Item>

        <Form.Item
          name="endsAt"
          label="Конец"
          initialValue={techreport.endsAt}
          getValueFromEvent={(e: any) => e?.format("YYYY-MM-DD")}
          getValueProps={(e: string) => ({
            value: e ? dayjs(e) : "",
          })}
        >
          <DatePicker style={{ width: 264 }}
            format={'YYYY-MM-DD'} onChange={onChange} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space size={152}>
            <Form.Item valuePropName="checked" name='isDone'>
              <Checkbox />
            </Form.Item >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Обновить
              </Button>
            </Form.Item >
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default TechReportCard

