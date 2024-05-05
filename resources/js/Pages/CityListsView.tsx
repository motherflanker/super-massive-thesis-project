import { Inertia } from "@inertiajs/inertia"
import { InertiaLink } from "@inertiajs/inertia-react"

import React, { useEffect } from "react"
import {route} from 'ziggy-js'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tooltip } from "antd"

import Template from "@/Components/Template"


import ICityList from "@/types/ICityList"
import ICity from "@/types/ICity"


interface CityListProps {
  citylist: ICityList
}

interface CitiesProps {
  cities: Array<ICity>
}

type Props = CityListProps & CitiesProps

const CityListsView: React.FC<Props> = ({citylist, cities}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      city_id1: citylist.city_id1,
      city_id2: citylist.city_id2,
      city_id3: citylist.city_id3,
      city_id4: citylist.city_id4,
      city_id5: citylist.city_id5,
      city_id6: citylist.city_id6,
      city_id7: citylist.city_id7,
      city_id8: citylist.city_id8,
    })
  }, [])

  const tailLayout = {
    wrapperCol: {offset: 4, span: 16}
  }

  const onFinish = (values: any) => {
    values.city_list_id = citylist.city_list_id
    Inertia.post(route('citylists.update'), values)
    form.resetFields()
  }


  const renderSelect = (stopNumber: number) => {
    return (
      <Form.Item
        label={`Stop №${stopNumber}`}
        name={`city_id${stopNumber}`}
        rules={[{ required: false }]}
        initialValue={null}
      >
        <Select>
          <Select.Option>
            {null}
          </Select.Option>
          {cities.map((city) => (
            <Select.Option key={city.city_id} value={city.city_id}>
              {city.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  return(
    <Template>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Divider orientation="left">Edit List</Divider>
      <Row>
        <Col span={24}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
          >
            {Array.from({ length: 8 }).map((_, index) => renderSelect(index + 1))}

            <Form.Item {...tailLayout}>
              <Space size={18}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <InertiaLink href={route('citylists.list')}>Back</InertiaLink>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
    </Template>
  )
}

export default CityListsView