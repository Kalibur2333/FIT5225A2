import NiceTable from '@/components/management/NiceTable';
import { PageHeader } from 'antd';
import React from 'react';

// eslint-disable-next-line no-unused-vars
export default function Management(this: any) {
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Management"
        subTitle="Manage images and tags manually"
      />
      <NiceTable />
    </div>
  );
}
