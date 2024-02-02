import { Result, Button } from 'antd';
import React from 'react';

export default function Login() {
  // Put AWS cognital login UI link here
  const cognitalURL = import.meta.env.VITE_COGNITO.toString();
  return (
    <Result
      status="warning"
      title="You MUST Login Before Using the System"
      extra={
        <Button type="primary" key="console" href={cognitalURL}>
          Go login
        </Button>
      }
    />
  );
}
