import Template from "@/Components/Template"
import IBus from "@/types/IBus"
import { Inertia } from "@inertiajs/inertia"
import { useEffect } from "react"
import { route } from "ziggy-js"
import { Button, Col, Divider, Form, Input, Row, Space, Popconfirm, Flex } from "antd"
import { usePage } from "@inertiajs/react"
import { DeleteOutlined } from '@ant-design/icons'
import ITechReport from "@/types/ITechReport"
import TechReportCard from "@/Components/TechReport/TechReportCard/Index"
import { InertiaLink } from "@inertiajs/inertia-react"


interface BusProps {
  bus: IBus
}

interface ReportProps {
  techreports: Array<ITechReport>
}

const BusesView: React.FC<BusProps & ReportProps> = ({ bus, techreports }) => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  useEffect(() => {
    form1.setFieldsValue({
      name: bus.name,
      plate_number: bus.plate_number,
      max_seats: bus.max_seats
    })
  }, [])

  const tailLayout1 = {
    wrapperCol: { offset: 18, span: 4 }
  }

  const tailLayout2 = {
    wrapperCol: { offset: 20, span: 6 }
  }

  const onFinish = (values: any) => {
    values.bus_id = bus.bus_id
    Inertia.post(route('buses.update'), values)
    form1.resetFields()
  }

  const onFinishReport = (values: any) => {
    debugger
    Inertia.post(route('techreports.save', values))
    form2.resetFields()
  }

  return (
    <Template>
      <div
        className="site-layout-background"
        style={{ padding: 4, minHeight: 560 }}
      >
        <Divider orientation="left">Edit bus</Divider>
        <Flex wrap="wrap" justify="space-around">
          <Form
            form={form1}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            style={{ width: 400 }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Enter the name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Plate"
              name="plate_number"
              rules={[{ required: true, message: 'Enter the plate number' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Seats"
              name="max_seats"
              rules={[{ required: true, message: 'Enter the amount of seats' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout1}>
              <Space size={10}>
                <InertiaLink href={route('buses.list')}>Back</InertiaLink>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Form
            form={form2}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinishReport}
            style={{ width: 500 }}
          >
            <Form.Item
              label="BusID"
              name="bus_id"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Text"
              name="text"
              rules={[{ required: true, message: 'Enter text' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Enter the price' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="isDone"
              name="isDone"
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout2}>
              <Space style={{ marginLeft: '25px' }}>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Flex>
        <Row>
          <Divider orientation="left">Feed</Divider>
          {
            <Flex wrap="wrap" gap={'large'}>
              {
                techreports.map((techreport) => {
                  if (bus.bus_id === techreport.bus_id) {
                    return <TechReportCard key={techreport.report_id} techreport={techreport} bus={bus} />
                  }
                  else {
                    <div>nothing</div>
                  }
                })
              }
            </Flex>
          }

        </Row>
      </div>
    </Template>
  )
}


export default BusesView