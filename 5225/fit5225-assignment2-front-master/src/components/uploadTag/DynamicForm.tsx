import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './dynamicForm.css';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default function DynamicForm(props: any) {
  const onFinish = (values: any) => {
    // console.log('Received values of form:', values);
    let searchByTagURL: string = import.meta.env.VITE_SEARCH_IMAGE.toString();
    axios
      .post(
        searchByTagURL,
        {
          tag: values.tags,
        },
        {
          headers: {
            'content-type': 'text/plain',
            Authorization: localStorage.getItem('access-token'),
          },
        },
      )
      .then((res) => {
        console.log(res.data.data[0]);
        props.callback(res.data.data[0]);
      });
  };

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
    >
      <Form.List
        name="tags"
        rules={[
          {
            validator: async (_, tags) => {
              if (!tags || tags.length < 1) {
                return Promise.reject(new Error('At least 1 tag'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <div>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Tags' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input tag or delete this field.',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="tag" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add New Tag
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
