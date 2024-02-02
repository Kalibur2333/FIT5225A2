import React from 'react';
import { List } from 'antd';

// const data = ['Cat', 'human', 'Car'];

export default function ResultList(props: any) {
  return (
    <List
      itemLayout="horizontal"
      header={<div>Result</div>}
      // footer={<div>Footer</div>}
      bordered
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item} />
        </List.Item>
      )}
    />
  );
}
