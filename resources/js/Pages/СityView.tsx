import Template from "@/Components/Template"
import IBus from "@/types/IBus"
import { Inertia } from "@inertiajs/inertia"
import { useEffect } from "react"
import { route } from "ziggy-js"
import { Button, Col, Divider, Form, Input, Row, Space, Popconfirm, Flex, Select, DatePicker } from "antd"
import { usePage } from "@inertiajs/react"
import { DeleteOutlined } from '@ant-design/icons'
import ITechReport from "@/types/ITechReport"
import TechReportCard from "@/Components/TechReport/TechReportCard/Index"
import { InertiaLink } from "@inertiajs/inertia-react"
import type { DatePickerProps } from 'antd';
import dayjs from "dayjs"
import ICity from "@/types/ICity"
import IStops from "@/types/IStops"


interface CityProps {
  city: ICity
}

interface StopsProps {
  stops: Array<IStops>
}

const CityView: React.FC<CityProps & StopsProps> = ({ city, stops }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      city_id: city.city_id,
      name: city.name
    })
  }, [])

  const tailLayout1 = {
    wrapperCol: { offset: 18, span: 4 }
  }

  const onFinish = (values: any) => {
    values.city_id = city.city_id
    Inertia.post(route('cities.update'), values)
    form.resetFields()
  }


  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 4, minHeight: 560 }}
      >
        <Divider orientation="left">Редактировать населенный пункт</Divider>
        <Flex wrap="wrap" justify="space-around">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            style={{ width: 400 }}
          >
            <Form.Item
              label="ID"
              name="city_id"
              rules={[{ required: true}]}
              initialValue={city.city_id}
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="Название"
              name="name"
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout1}>
              <Space >
                <Button style={{ width: 82 }} type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </Template>
  )
}


export default CityView