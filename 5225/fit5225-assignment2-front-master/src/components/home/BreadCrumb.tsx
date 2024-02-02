import { Breadcrumb } from 'antd';
import React from 'react';

export default function BreadCrumb() {
  return (
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
  );
}
