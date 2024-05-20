import Template from "@/Components/Template"
import { Inertia } from "@inertiajs/inertia"
import { useEffect, useState } from "react"
import { route } from "ziggy-js"
import { Button, Divider, Form, Input, Space, Flex, Table } from "antd"
import ICity from "@/types/ICity"
import IStops from "@/types/IStops"
import { EditableCell } from "@/Components/EditableCell"
import { ColumnsType,ColumnType } from "antd/es/table"


interface CityProps {
  city: ICity
}
interface DataType extends IStops {
  key: React.Key;
}
interface StopsProps {
  stops: Array<DataType>
}

interface EditableColumnType extends ColumnType<DataType> {
  editable?: boolean;
}


const CityView: React.FC<CityProps & StopsProps> = ({ city, stops }) => {
  const [dataSource, setDataSource] = useState<DataType[]>(stops.map(stop => ({ ...stop, key: stop.stop_id })))
  const [editingKey, setEditingKey] = useState<string | null>('');

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form2.setFieldsValue({ ...record });
    setEditingKey(record.key as string);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {debugger
    try {
      const row = (await form2.validateFields()) as DataType;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
  
      if (index > -1) {
        const item = newData[index];
        const updatedRow = { ...item, ...row };
        newData.splice(index, 1, updatedRow);
        setDataSource(newData);
        setEditingKey('');
        update({
          stop_id: updatedRow.stop_id,
          name: updatedRow.name,
          city_id: updatedRow.city_id,
        });
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  //created additional id field which created the type mismatch problem, look into that and itll be fixed
  const update = async (payload: { stop_id: number, name: string, city_id: number }) => {debugger
    Inertia.post(route('stops.update', { stop_id: payload.stop_id }), payload, {
      onSuccess: () => {
        console.log('Update successful');
      },
      onError: (errors) => {
        console.error('Error updating data:', errors);
      },
    });
  }


  const columns: EditableColumnType[] = [
    {
      title: 'ID',
      dataIndex: 'stop_id',
      width: '15%',
      editable: false,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      width: '50%',
      editable: true,
    },
    {
      title: 'ID города',
      dataIndex: 'city_id',
      width: '15%',
      editable: false,
    },
    {
      title: '',
      render: (_, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              type="link"
            >
              Сохранить
            </Button>
            <Button
              onClick={cancel}
              type="link"
              style={{ marginRight: 8 }}
            >
              Отмена
            </Button>
          </span>
        ) : (
          <Button
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            type="link"
          >
            Изменить
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

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
              rules={[{ required: true }]}
              initialValue={city.city_id}
            >
              <Input disabled />
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
                <Button style={{ width: 99 }} type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Flex>
        <Divider orientation="left">Остановки</Divider>
        <Form form={form2} component={false}>
          <Table
            size="middle"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </Template>
  )
}


export default CityView