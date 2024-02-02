import { Form, Input, message, Popconfirm, Table, Tag } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import './niceTable.css';
import axios from 'axios';
import { unique } from '@/components/common';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  id: string;
  url: string;
  tag: string[];
  image: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  // eslint-disable-next-line no-unused-vars
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      let values = await form.validateFields();
      // Only use the code below when we only need to modify the tag
      // If we need to modify ID and URL, make sure add more validations
      if (typeof values.tag === 'string') {
        values.tag = values.tag.split(',');
      }
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: string;
  url: string;
  tag: string[];
  image: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function NiceTable() {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      image:
        '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',
      id: 'Fetching data',
      url: 'Please wait',
      tag: ['Thank you'],
    },
  ]);
  const [dataIsUpToDate, setDataIsUpToDate] = useState(0);

  const updateData = () => {
    setDataIsUpToDate(1);
    let scanImageURL: string = import.meta.env.VITE_IMAGE_SCAN.toString();
    axios
      .get(scanImageURL, {
        headers: {
          'content-type': 'text/json',
          Authorization: localStorage.getItem('id-token'),
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].tag = unique(res.data[i].tag);
        }
        console.log(res);
        setDataSource(res.data);
      })
      .catch(() => {
        setDataIsUpToDate(0);
      });
  };

  if (dataIsUpToDate === 0) {
    updateData();
  }
  // const [count, setCount] = useState(2);

  const handleDelete = (url: string) => {
    console.log('delete request posted' + { url });
    let deleteImageURL: string = import.meta.env.VITE_IMAGE_DELETE.toString();
    axios
      .post(
        deleteImageURL,
        {
          s3url: unique([url]),
        },
        {
          headers: {
            Authorization: localStorage.getItem('access-token'),
          },
        },
      )
      .catch((error) => {
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          const newData = dataSource.filter((item) => item.url !== url);
          message.success('delete error.');
          setDataSource(newData);
        }
      })
      .then((res) => {
        console.log(res);
      });
  };

  // @ts-ignore
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '20%',
      render: (image, id) => (
        <>
          <img
            width={100}
            src={'data:image/jpeg;base64,' + image}
            alt={id.toString()}
          />
        </>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      editable: true,
      render: (tag) => (
        <>
          {unique(tag).map((t: string) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={t}>
                {t.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.url)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // const handleAdd = () => {
  //   // @ts-ignore
  //   const newData: DataType = {
  //     id: `Edward King`,
  //     url: '32',
  //     tag: ['0', '1'],
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  // TODO: upload the modified tag to database
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    let postUrl = import.meta.env.VITE_UPDATE_TAG.toString();
    axios.post(postUrl, row, {
      headers: {
        Authorization: localStorage.getItem('access-token'),
      },
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
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
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
}
