import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import { route } from 'ziggy-js'
import { InertiaLink } from "@inertiajs/inertia-react"

import { Button, Col, Divider, Input, Row, Space, Form, Select } from "antd"
import ICityList from "@/types/ICityList"
import ICity from "@/types/ICity"



interface CityListProps {
  citylist: ICityList
}

interface CitiesProps {
  cities: Array<ICity>
}

type Props = CityListProps & CitiesProps

const CityListsAdd: React.FC<Props> = ({citylist, cities}) => {debugger
  const [form] = Form.useForm()

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  }

  const onFinish = (values: any) => {debugger
    Inertia.post(route('citylists.save', values))
    form.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Divider orientation="left">New List</Divider>
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

              <Form.Item
                label="Stop №1"
                name="city_id1"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №2"
                name="city_id2"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №3"
                name="city_id3"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №4"
                name="city_id4"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №5"
                name="city_id5"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №6"
                name="city_id6"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №7"
                name="city_id7"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Stop №8"
                name="city_id8"
                rules={[{ required: false }]}
                initialValue={null}
              >
                <Select defaultValue={null}>
                  {
                    cities.map((city) => {
                      return <Select.Option
                        key={city.city_id}
                        value={city.city_id}
                      >
                        {city.name}
                      </Select.Option>
                    })
                  }
                </Select>
              </Form.Item>

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

export default CityListsAdd