import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import { useEffect } from "react"
import { route } from "ziggy-js"
import { Button, Divider, Form, Input, Space, Flex  } from "antd"
import ICity from "@/types/ICity"
import IStops from "@/types/IStops"


interface CityProps {
  city: ICity
}

interface StopsProps {
  stops: Array<IStops>
}

const CityView: React.FC<CityProps & StopsProps> = ({ city, stops }) => { debugger
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      city_id: city.city_id,
      name: city.name
    })
  }, [])

  const tailLayout1 = {
    wrapperCol: { offset: 14, span: 2 }
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
        <Flex wrap="wrap">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            style={{ width: 400, marginTop: 20 }}
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
                <Button style={{width: 99}} type="primary" htmlType="submit">
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