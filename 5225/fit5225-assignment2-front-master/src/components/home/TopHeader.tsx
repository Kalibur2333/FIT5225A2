import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

export default function TopHeader() {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    />
  );
}
